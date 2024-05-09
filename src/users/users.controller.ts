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
import { ApiTags } from '@nestjs/swagger';
import { ChangePassUserDto } from './dto/password-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';

@ApiTags('users')
@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  @ResponseMessage('Fetch user with paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
    @User() user,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs, user);
  }

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
  // /profile vs /id:profile
  @Post('profile') // ""
  @ResponseMessage('Get profile of User')
  async handleGetProfile(@User() user: IUser) {
    return this.usersService.getProfile(user._id);
  }

  @Patch('profile') // ""
  @ResponseMessage('Update profile of User')
  async handleUpdateProfile(
    @Body() userDto: ProfileUserDto,
    @User() user: IUser,
  ) {
    return this.usersService.updateProfile(userDto, user);
  }

  @Patch('change-password') // ""
  @ResponseMessage('Change Password of User')
  async handleChangePassword(
    @Body() userDto: ChangePassUserDto,
    @User() user: IUser,
  ) {
    const changePassUser = await this.usersService.changePassword(
      userDto,
      user,
    );
    return changePassUser;
  }

  // Note: với @Get(':id') và @Get('/getAll'), Nest.js sẽ chạy từ trên xuống dưới, thằng nào map sẽ enter vào
  // So: cái nào cần (2 @Get có route) sẽ chuyển sang @Post và đưa data vào body
}
