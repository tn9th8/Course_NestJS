import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { JobsService } from 'src/jobs/jobs.service';
import { JobsModule } from 'src/jobs/jobs.module';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [JobsModule, SkillsModule],
})
export class DashboardModule {}
