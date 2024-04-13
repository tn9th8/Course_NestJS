import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { Role, RoleDocument } from './schemas/role.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { ADMIN_ROLE } from 'src/databases/sample';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name } = createRoleDto;

    // check if is exist name ?
    const isExist = await this.roleModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Role với name=${name} đã tồn tại`);
    }

    const newRole = await this.roleModel.create({
      ...createRoleDto,
      createdBy: { _id: user._id, email: user.email },
    });

    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.roleModel
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`not found company with id=${id}`); // status: 200 => 400
    }
    return await this.roleModel.findById(id).populate({
      path: 'permissions', // giống với prop trong role schema
      select: { _id: 1, name: 1, apiPath: 1, method: 1, module: 1 }, // -1: ko lay, 1: lay
    });
  }

  async update(_id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found company with id=${_id}`); // status: 200 => 400
    }

    // check name khác với nhưng thằng còn lại?
    // to do

    return await this.roleModel.updateOne(
      { _id },
      {
        ...updateRoleDto,
        updatedBy: { _id: user._id, email: user.email },
      },
    );
  }

  async remove(_id: string, user: IUser) {
    // check if is valid following a mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found company with id=${_id}`); // status: 200 => 400
    }

    // logic: prevent removing role admin:
    const foundRole = await this.roleModel.findById(_id);
    if (foundRole.name === ADMIN_ROLE) {
      throw new BadRequestException(`Không thể xóa role admin=${ADMIN_ROLE}`);
    }

    // check if is not exist the mongo object id ?
    // todo

    await this.roleModel.updateOne(
      { _id },
      {
        deletedBy: { _id: user._id, email: user.email },
      },
    );
    return this.roleModel.softDelete({ _id });
  }
}
