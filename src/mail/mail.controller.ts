import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { Subscriber } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @Public()
  @ResponseMessage('Send a new-job email')
  @Cron('0 0 7 * * 0') // Every Sun, 7h:0m:0s // @Cron('10 * * * * *')
  async handleSendMail() {
    this.mailService.sendMail();
  }
}
