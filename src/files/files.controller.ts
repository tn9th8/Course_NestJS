import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,

  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';

import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';

@ApiTags('file')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  // Upload file
  // request => interceptor => pipe (validate) => response
  // bug: upload file at interceptor, then validate
  // fix: xử lí ở interceptor | viết pipe xóa file
  @Public()
  @Post('upload')
  @ResponseMessage('Upload Single File')
  @UseInterceptors(FileInterceptor('fileUpload')) // key // chạy interceptor trước
  @UseFilters(new HttpExceptionFilter())
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // console.log(file);
    return { filename: file.filename };
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
