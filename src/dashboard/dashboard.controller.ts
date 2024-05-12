import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('job/hiring')
  @ResponseMessage('count Jobs Hiring')
  countJobsHiring() {
    return this.dashboardService.countJobsHiring();
  }

  @Get('job/today')
  @ResponseMessage('count Jobs Today')
  countJobsToday() {
    return this.dashboardService.countJobsToday();
  }

  @Get('resume/month')
  @ResponseMessage('count Resumes Month')
  countResumesMonth() {
    return this.dashboardService.countResumesMonth();
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
