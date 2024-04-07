import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // ""
  @ResponseMessage('Create a new User')
  create(@Body() userDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto);
    // biến createUserDto: lấy các trường trong dto và có sức mạnh @Body (dựa vào req.body để lấy giá trị trả về)
    // @Body('email') email: string // const email: sting = req.body.email // overload với @Body khác
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // const id: sting = req.param.email //
    return this.usersService.findOne(id); // +id: convert string ==> number
  }
  // Note: với @Get(':id') và @Get('/getAll'), Nest.js sẽ chạy từ trên xuống dưới, thằng nào map sẽ enter vào
  // So: cái nào cần (2 @Get có route) sẽ chuyển sang @Post và đưa data vào body

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
