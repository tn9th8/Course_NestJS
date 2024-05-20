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
  ) { }

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

  async findTop5Skills() {
    const skills = await this.skillsService.findTop5Skills();
    return skills;
  }

  async countLevelJob() {
    return [
      await this.jobsService.countJobsLevel("INTERN"),
      await this.jobsService.countJobsLevel("FRESHER"),
      await this.jobsService.countJobsLevel("JUNIOR"),
      await this.jobsService.countJobsLevel("MIDDLE"),
      await this.jobsService.countJobsLevel("SENIOR"),
    ]
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
