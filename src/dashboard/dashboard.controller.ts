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
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('jobs')
  @ResponseMessage('Count Jobs')
  countJobs() {
    return this.dashboardService.countJobs();
  }

  @Get('skills')
  @ResponseMessage('Top 5 kỹ năng tuyển dụng nhiều nhất')
  findTop5Skills() {
    return this.dashboardService.findTop5Skills();
  }
  @Get('levels')
  @ResponseMessage('Số lượng các vị trí tuyển dụng')
  findLevels() {
    return this.dashboardService.countLevelJob();
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
