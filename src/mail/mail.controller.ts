import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    const jobs = [
      {
        name: 'Web Developer (Java, Javascript)',
        company: 'AXON inc',
        salary: '1,000 - 2,500 USD',
        skills: ['Java', 'Javacript', 'English'],
      },
      {
        name: 'Web Developer 2 (Java, Javascript)',
        company: 'AXON inc',
        salary: '1,000 - 2,500 USD',
        skills: ['Java', 'Javacript', 'English'],
      },
    ];
    await this.mailerService.sendMail({
      to: 'uyenbao4a5@gmail.com',
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'new-job', // HTML body content
      context: {
        receiver: 'Nguyên Bảo',
        jobs: jobs,
      },
    });
  }
}
