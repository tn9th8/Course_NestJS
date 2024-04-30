import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber } from 'rxjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schemas';
import { SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  async sendMail() {
    // find all subcribers
    const subscribers = await this.subscriberModel.find({});
    // send mail for each subcribers
    for (const subs of subscribers) {
      // find job có skills in subcribers's skills
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });
      if (jobWithMatchingSkills?.length) {
        // định dạng dữ liệu job trước khi gửi
        const jobs = jobWithMatchingSkills.map((item: any) => {
          return {
            name: item.name,
            company: item.company.name,
            salary:
              `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
            skills: item.skills,
          };
        });
        // gửi mail
        await this.mailerService.sendMail({
          to: 'uyenbao4a5@gmail.com',
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'new-job', // HTML body content
          context: {
            receiver: subs.name,
            jobs: jobs,
          },
        });
      }
    }
  }

  async sendMailforNewPassword(user: any, newPass: string) {
    // gửi mail
    await this.mailerService.sendMail({
      to: `${user.email}`,
      from: '"IT job" <support@itjob.com>', // override default from
      subject: 'You have been issued a new password',
      template: 'new-password', // HTML body content
      context: { 
        receiver: user.name, 
        newPass: newPass },
    });
  }
}
