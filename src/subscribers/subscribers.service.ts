import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/users.interface';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    // validate: phải chưa tồn tại email
    const isExist = await this.subscriberModel.findOne({
      user: user._id,
    });
    if (isExist) {
      throw new BadRequestException(
        `Subscriber với user = ${user.name} đã tồn tại`,
      );
    }

    const newSubscriber = await this.subscriberModel.create({
      user: user._id,
      skills: createSubscriberDto.skills,
      createdBy: { _id: user._id, email: user.email },
    });

    return {
      _id: newSubscriber?._id,
      createdAt: newSubscriber?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    let { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    if (!sort) {
      sort = { updatedAt: -1 };
    }
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const result = await this.subscriberModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            pipeline: [{ $project: { _id: 1, name: 1, email: 1 } }],
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'skills',
            localField: 'skills',
            foreignField: '_id',
            pipeline: [{ $project: { _id: 1, name: 1 } }],
            as: 'skills',
          },
        },
        { $match: filter }, // $match: { 'user.name': { $regex: /n$/i } }
        { $match: { isDeleted: false } },
        {
          $project: {
            _id: 1,
            user: { $arrayElemAt: ['$user', 0] },
            skills: 1,
            createdAt: 1,
            createdBy: 1,
            updatedAt: 1,
            updatedBy: 1,
            isDeleted: 1,
            deletedAt: 1,
            deletedBy: 1,
          },
        },
      ])
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .exec();

    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

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
    // validate: id is object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Subscriber with id=${_id} not found`); // status: 200 => 400
    }
    return await this.subscriberModel
      .findById(_id)
      .populate({ path: 'user', select: { name: 1, email: 1 } })
      .populate({ path: 'skills', select: { name: 1, description: 1 } });
  }

  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    return await this.subscriberModel.updateOne(
      { user: user._id },
      {
        ...updateSubscriberDto,
        updatedBy: { _id: user._id, email: user.email },
      },
      { upsert: true }, // vừa update nếu tồn tại, insert nếu chưa
    );
  }

  async remove(_id: string, user: IUser) {
    // validate: id is a object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Subscriber with id=${_id} not found`); // status: 200 => 400
    }

    await this.subscriberModel.updateOne(
      { _id },
      {
        deletedBy: { _id: user._id, email: user.email },
      },
    );
    return this.subscriberModel.softDelete({ _id });
  }

  async getSkills(user: IUser) {
    const { email } = user;
    return await this.subscriberModel.findOne({ email }, { skills: 1 });
  }

  async findOneByUser(user: IUser) {
    const mongoose = require('mongoose'); // signature
    const filter = { 'user._id': new mongoose.Types.ObjectId(user._id) }; // convert string to object id

    return await this.subscriberModel
      .findOne({ user: user._id })
      .populate({ path: 'skills', select: { _id: 1, name: 1 } })
      .select({ _id: 1, skills: 1 });
  }
}
