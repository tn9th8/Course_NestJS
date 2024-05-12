import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { JobsService } from 'src/jobs/jobs.service';
import { SkillsService } from 'src/skills/skills.service';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'src/jobs/schemas/job.schemas';
import { Model } from 'mongoose';
import { ResumesService } from 'src/resumes/resumes.service';

@Injectable()
export class DashboardService {
  constructor(
    private jobsService: JobsService,
    private skillsService: SkillsService,
    private resumesService: ResumesService,
  ) {}

  async countJobs() {
    const jobsHiring = await this.jobsService.countJobsHiring();
    const jobsToday = await this.jobsService.countJobsToday();
    const resumesMonth = await this.resumesService.countResumesMonth();
    return {
      jobsHiring,
      jobsToday,
      resumesMonth,
    };
  }

  async countJobsHiring() {
    return await this.jobsService.countJobsHiring();
  }

  async countJobsToday() {
    return await this.jobsService.countJobsToday();
  }

  async countResumesMonth() {
    return await this.resumesService.countResumesMonth();
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
