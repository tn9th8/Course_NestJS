import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload file
  // request => interceptor => pipe (validate) => response
  // bug: upload file at interceptor, then validate
  // fix: xử lí ở interceptor, hoặc viết pipe xóa file
  @Public()
  @Post('upload')
  @ResponseMessage('Upload Single File')
  @UseInterceptors(FileInterceptor('hoidanit')) // key // chạy interceptor trước
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder() // sau đó mới chạy pipe
        .addFileTypeValidator({
          fileType:
            /^(jpg|jpeg|png|image\/png|gif|txt|pdf|application\/pdf|docx|text\/plain)$/i, // regular expression // minetype
        })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 }) // KB = 1 MB
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }), // error 422
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
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
