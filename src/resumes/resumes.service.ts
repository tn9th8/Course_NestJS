import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) // connect shema of mongo
    private resumeModel: SoftDeleteModel<ResumeDocument>, //private userModel: Model<Company>,

    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) { }

  async create(createUserCvDto: CreateUserCvDto, user: IUser) {
    const { url, companyId, jobId } = createUserCvDto;
    const { email, _id } = user;

    const newCv = await this.resumeModel.create({
      email,
      url,
      companyId,
      jobId,
      userId: _id,
      status: 'PENDING',
      createdBy: { _id, email },
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: { _id, email },
        },
      ],
    });

    return {
      _id: newCv?._id,
      createdAt: newCv?.createdAt,
    };
  }

  async findByUsers(user: IUser) {
    return await this.resumeModel
      .find({ userId: user._id })
      .sort('-createdAt') // lay CV duoc tao gan nhat
      .populate([
        { path: 'companyId', select: { name: 1 } },
        { path: 'jobId', select: { name: 1 } },
      ]);
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.resumeModel
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

    return await this.resumeModel.findById(id);
  }

  async update(id: string, status: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`not found company with id=${id}`); // status: 200 => 400
    }

    const updatedResume = await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        $push: {
          history: {
            status: status,
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );

    return updatedResume;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`not found Resume with id=${id}`); // status: 200 => 400
    }

    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.resumeModel.softDelete({ _id: id });
  }

  async countResumesMonth() {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0); // set h-m-s-ms = 0 và bị trừ 1 ngày
    today = new Date(today.getTime() + 24 * 60 * 60 * 1000); // cộng thêm 1 ngày

    let startMonth: Date = new Date(today);
    startMonth.setDate(1); // set date = 1 và bị trừ 1 ngày
    startMonth = new Date(startMonth.getTime() + 24 * 60 * 60 * 1000); // cộng thêm 1 ngày

    let startNextMonth: Date = new Date(startMonth);
    startNextMonth.setMonth(startNextMonth.getMonth() + 1); // set month + 1 thành ngày đầu tháng sau

    // query: createdAt >= startMonth & startDate < startNextMonth
    const result = await this.resumeModel
      .find({ createdAt: { $gte: startMonth, $lt: startNextMonth } })
      .select({ createdAt: 1 })
      .exec();

    return {
      message: 'Ứng viên tháng này',
      number: (await result).length,
      today: today,
    };

  }

  async findAllByManager(currentPage: number, limit: number, qs: string, user: IUser) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    let totalItems = (await this.resumeModel.find(filter)).length;
    let totalPages = Math.ceil(totalItems / defaultLimit);

    const { name } = user.role;
    let _id = null;
    let result = null;
    if (name.includes('HR')) {
      // for HR
      const hrUser = await this.userModel.findById(user._id);

      result = await this.resumeModel
        .find(filter)
        .find({ companyId: (await hrUser).company._id })
        // .skip(offset)
        // .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
        .exec();
      result = await this.resumeModel
        .find(filter)
        .find({ companyId: (await hrUser).company._id })
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
        .exec();
      totalItems = result.length;
      totalPages = Math.ceil(totalItems / defaultLimit);
    } else {
      result = await this.resumeModel
        .find(filter)
        // .skip(offset)
        // .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
        .exec();
      totalItems = result.length;
      totalPages = Math.ceil(totalItems / defaultLimit);
      result = await this.resumeModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
        .exec();

    }

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
}
