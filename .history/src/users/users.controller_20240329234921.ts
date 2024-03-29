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

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // ""
  create(@Body() createUserDto: CreateUserDto) {
    // biến createUserDto: lấy các trường trong dto và có sức mạnh @Body (dựa vào req.body để lấy giá trị trả về)
    // @Body('email') email: string // const email: sting = req.body.email // overload với @Body khác
    console.log('>>> check createUserDto', createUserDto);
    return this.usersService.create(createUserDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
