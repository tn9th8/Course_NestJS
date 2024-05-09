import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { GetSkillByNameDto } from './dto/get-skill-by-name.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name)
    private skillModel: SoftDeleteModel<SkillDocument>,
  ) {}

  async create(createSkillDto: CreateSkillDto, user: IUser) {
    const { name, description } = createSkillDto;

    // is exist 1 skill with this name
    const isExist = await this.skillModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Skill với name = ${name} đã tồn tại`);
    }

    const newSkill = await this.skillModel.create({
      ...createSkillDto,
      createdBy: { _id: user._id, email: user.email },
    });

    return {
      _id: newSkill?._id,
      createdAt: newSkill?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.skillModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.skillModel
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

  async findOne(_id: string) {
    // is mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found any skill with id = ${_id}`); // status: 200 => 400
    }

    return await this.skillModel.findById(_id);
  }

  async update(_id: string, updateSkillDto: UpdateSkillDto, user: IUser) {
    // is mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found any skill with id = ${_id}`); // status: 200 => 400
    }

    return await this.skillModel.updateOne(
      { _id },
      {
        ...updateSkillDto,
        updatedBy: { _id: user._id, email: user.email },
      },
    );
  }

  async remove(_id: string, user: IUser) {
    // is mongo object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`not found any skill with id = ${_id}`); // status: 200 => 400
    }

    await this.skillModel.updateOne(
      { _id },
      {
        deletedBy: { _id: user._id, email: user.email },
      },
    );
    return this.skillModel.softDelete({ _id });
  }

  async findOneByName(dto: GetSkillByNameDto) {
    // // check if is exist 1 permission with apiPath + method ?
    // const isExist = await this.skillModel.findOne({ name });
    // if (isExist) {
    //   throw new BadRequestException(`Skill với name = ${name} đã tồn tại`);
    // }
    const { name } = dto;
    return await this.skillModel.findOne({ name });
  }
}
