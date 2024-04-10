import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) // connect shema of mongo
    private resumeModel: SoftDeleteModel<ResumeDocument>, //private userModel: Model<Company>,
  ) {}

  async create(createResumeDto: CreateResumeDto, userReq: IUser) {
    let newJob = await this.resumeModel.create({
      ...createJobDto,
      createdBy: {
        _id: userReq._id,
        email: userReq.email,
      },
    });
    return newJob;
  }

  findAll() {
    return `This action returns all resumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resume`;
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return `This action updates a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}
