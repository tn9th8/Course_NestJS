import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }
}
