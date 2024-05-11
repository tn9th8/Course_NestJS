import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { JobsService } from 'src/jobs/jobs.service';
import { SkillsService } from 'src/skills/skills.service';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'src/jobs/schemas/job.schemas';
import { Model } from 'mongoose';

@Injectable()
export class DashboardService {
  constructor(
    private jobService: JobsService,
    private skillService: SkillsService,
  ) {}

  countJobsHiring() {}

  async countJobsTody() {
    return await this.jobService.countJobsTody();
  }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
