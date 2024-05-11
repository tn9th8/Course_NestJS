import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from './schemas/subscriber.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SubscribersController],
  providers: [SubscribersService],
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
    UsersModule,
  ],
})
export class SubscribersModule {}
