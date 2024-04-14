import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import fs from 'fs';
import { diskStorage } from 'multer';
import path, { join } from 'path';
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  // trả đường link of folder root
  getRootPath = () => {
    return process.cwd();
  };

  // check nếu folder ko tồn tại => tạo
  ensureExists(targetDirectory: string) {
    fs.mkdir(targetDirectory, { recursive: true }, (error) => {
      if (!error) {
        console.log('Directory successfully created, or it already exists.');
        return;
      }
      switch (error.code) {
        case 'EEXIST':
          // Error:
          // Requested location already exists, but it's not a directory.
          break;
        case 'ENOTDIR':
          // Error:
          // The parent hierarchy contains a file with the same name as the dir
          // you're trying to create.
          break;
        default:
          // Some other error like permission denied.
          console.error(error);
          break;
      }
    });
  }

  // createMulterOptions: cấu hình multer: nơi lưu file,...
  // diskStorage là ổ đĩa của chúng ta, lưu trong server, host BE ở đâu thì nó sẽ lưu ở đấy
  // destination: override: lấy động folder lưu trữ file
  // filename: overide: đặt tên file
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req?.headers?.folder_type ?? "default";
          this.ensureExists(`public/images/${folder}`);
          cb(null, join(this.getRootPath(), `public/images/${folder}`))
        },
        filename: (req, file, cb) => {
          //get image extension
          let extName = path.extname(file.originalname);
          //get image's name (without extension)
          let baseName = path.basename(file.originalname, extName);
          let finalName = `${baseName}-${Date.now()}${extName}`
          cb(null, finalName)
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        const isValidFileType = allowedFileTypes.includes(fileExtension);
        if (!isValidFileType) {
          cb(new HttpException('Invalid file type', HttpStatus.UNPROCESSABLE_ENTITY), null);
        } else
          cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 1 // 1MB
      }
    };
  }
}
