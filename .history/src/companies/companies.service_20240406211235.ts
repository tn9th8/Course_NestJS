import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose, { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) // connect shema of mongo
    private companyModel: SoftDeleteModel<CompanyDocument>, //private userModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    // ... mean is that copying all data of createCompanyDto to insert 1 document at database
    return await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      { _id: id },
      {
        ...UpdateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, @User() user: IUser) {
    // // Cách 1 validate:
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return 'Not found user';
    // }

    // // Cách 2 validate:
    // // hàm này đã nằm trong softDelete
    // // hàm find thuộc soft-delete-plugin
    // const templates = await this.find({ _id: id });
    // if (!templates) {
    //   return Error('Element not found');
    // }

    // // Cách 1:
    // // hàm softDelete có hạn chế không hỗ trợ lưu trường detetedBy
    // // nên dùng hàm updateOne ở trên để hổ trợ
    // await this.companyModel.updateOne(
    //   { _id: id },
    //   {
    //     detetedBy: {
    //       _id: user._id,
    //       email: user.email,
    //     },
    //   },
    // );
    // return this.companyModel.softDelete({ _id: id });

    // Cách 2:
    // +: dùng 1 câu query
    // -: frontend khó xử lý
    await this.companyModel.updateOne(
      { _id: id },
      {
        detetedBy: {
          _id: user._id,
          email: user.email,
        },
        isDeleted: true,
        deletedAt: new Date(),
      },
    );
  }
}
