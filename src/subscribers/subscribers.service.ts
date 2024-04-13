import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/users.interface';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    // validate: phải chưa tồn tại email
    const isExist = await this.subscriberModel.findOne({
      name: createSubscriberDto.name,
    });
    if (isExist) {
      throw new BadRequestException(
        `Subscriber với name=${createSubscriberDto.name} đã tồn tại`,
      );
    }

    const newSubscriber = await this.subscriberModel.create({
      ...createSubscriberDto,
      createdBy: { _id: user._id, email: user.email },
    });

    return {
      _id: newSubscriber?._id,
      createdAt: newSubscriber?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.subscriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.subscriberModel
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
    // validate: id is object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Subscriber with id=${_id} not found`); // status: 200 => 400
    }
    // do
    return await this.subscriberModel.findById(_id);
  }

  async update(
    _id: string,
    updateSubscriberDto: UpdateSubscriberDto,
    user: IUser,
  ) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Subscriber with id=${_id} not found`); // status: 200 => 400
    }

    return await this.subscriberModel.updateOne(
      { _id },
      {
        ...updateSubscriberDto,
        updatedBy: { _id: user._id, email: user.email },
      },
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
}
