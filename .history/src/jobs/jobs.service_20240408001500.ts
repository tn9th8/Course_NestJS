import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Job } from './schemas/job.schemas';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) // connect shema of mongo
    private companyModel: SoftDeleteModel<CompanyDocument>, //private userModel: Model<Company>,
  ) {}

  create(createJobDto: CreateJobDto, @User() userReq: IUser) {
    return await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
