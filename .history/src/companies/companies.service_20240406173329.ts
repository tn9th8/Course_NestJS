import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) // connect shema of mongo
    private companyModel: SoftDeleteModel<CompanyDocument>, //private userModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    // let company = await this.companyModel.create({
    //   email: createCompanyDto.name,
    //   address: createCompanyDto.address,
    //   description: createCompanyDto.description,
    // });
    // return company;

    // ... mean is that copying all data of createCompanyDto to create at database
    return this.companyModel.create({ ...createCompanyDto });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
