import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { apiPath, method } = createPermissionDto;

    // check if is exist 1 permission with apiPath + method ?
    const isExist = await this.permissionModel.findOne({ apiPath, method });
    if (isExist) {
      throw new BadRequestException(
        `Permission với apiPath=${apiPath} và method=${method} đã tồn tại`,
      );
    }

    const newPermission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: { _id: user._id, email: user.email },
    });

    return {
      _id: newPermission?._id,
      createdAt: newPermission?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.permissionModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    // check if is valid following a mongo object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`not found permission with id=${id}`); // status: 200 => 400
    }

    // check if is not exist the mongo object id ?
    // todo

    return await this.permissionModel.findById(id);
  }

  async update(
    _id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    // check if is valid following a mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found permission with id=${_id}`); // status: 200 => 400
    }

    // check if is not exist the mongo object id ?
    // todo

    return await this.permissionModel.updateOne(
      { _id },
      {
        ...updatePermissionDto,
        updatedBy: { _id: user._id, email: user.email },
      },
    );
  }

  async remove(_id: string, user: IUser) {
    // check if is valid following a mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found permission with id=${_id}`); // status: 200 => 400
    }

    // check if is not exist the mongo object id ?
    // todo

    await this.permissionModel.updateOne(
      { _id },
      {
        deletedBy: { _id: user._id, email: user.email },
      },
    );
    return this.permissionModel.softDelete({ _id });
  }
}
