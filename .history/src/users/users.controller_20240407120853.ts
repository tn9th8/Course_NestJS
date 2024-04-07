import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customize';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // ""
  @ResponseMessage('Create a new User')
  async create(@Body() userDto: CreateUserDto, @User() userReq: IUser) {
    let newUser = await this.usersService.create(userDto, userReq);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
    // userDto: lấy các trường trong dto và có sức mạnh @Body (dựa vào req.body để lấy giá trị trả về)
    // @Body('email') email: string // const email: sting = req.body.email // overload với @Body khác
  }

  @Get()
  @ResponseMessage('Fetch user with pagnigate')
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch a user by id')
  findOne(@Param('id') id: string) {
    const foundUser = this.usersService.findOne(id);
    return foundUser;
    // TS: @Param('id')
    // JS: const id: sting = req.param.id
  }

  @Patch()
  @ResponseMessage('Update a user')
  update(@Body() userDto: UpdateUserDto, @User() userReq: IUser) {
    const updatedUser = this.usersService.update(userDto, userReq);
    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage('Delete a user')
  remove(@Param('id') id: string, @User() userReq: IUser) {
    return this.usersService.remove(id, userReq);
  }

  // Note: với @Get(':id') và @Get('/getAll'), Nest.js sẽ chạy từ trên xuống dưới, thằng nào map sẽ enter vào
  // So: cái nào cần (2 @Get có route) sẽ chuyển sang @Post và đưa data vào body
}
