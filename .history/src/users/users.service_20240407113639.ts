import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { User as UserReq } from 'src/decorator/customize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) // connect shema of mongo
    private userModel: SoftDeleteModel<UserDocument>, // private userModel: Model<User>, // data type
  ) {}

  getHashPassword = (plainPassword: string) => {
    const salt = genSaltSync(10); // config
    const hash = hashSync(plainPassword, salt); // hash
    return hash;
  };

  async create(userDto: CreateUserDto, @UserReq() userReq: IUser) {
    const { name, email, password, age, gender, address, role, company } =
      userDto;

    // logic check mail
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} đã tồn tại. Vui lòng sử dụng email khác`,
      );
    }

    // hash
    const hashPassword = this.getHashPassword(userDto.password);

    // create
    let newUser = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: userReq._id,
        email: userReq.email,
      },
    });

    return newUser;
  }

  async register(userDto: RegisterUserDto) {
    const { name, email, password, age, gender, address } = userDto;
    const hashPassword = this.getHashPassword(userDto.password);
    const isExist = await this.userModel.findOne({ email });

    // add logic check existing mail
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} đã tồn tại. Vui lòng sử dụng email khác`,
      );
    }

    let userRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: 'USER',
    });

    return userRegister;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }

    return this.userModel.findOne({ _id: id });
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(userDto: UpdateUserDto, @UserReq() userReq: IUser) {
    let newUser = await this.userModel.updateOne(
      { _id: userDto._id },
      {
        ...userDto,
        updatedBy: {
          _id: userReq._id,
          email: userReq.email,
        },
      },
    );

    return newUser;
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }

    // return this.userModel.deleteOne({ _id: id });
    return this.userModel.softDelete({ _id: id });
  }

  // async register(user: RegisterUserDto) {
  //   const { name, email, password, age, gender, address } = user;
  //   const hashPassword = this.getHashPassword(password);
  //   let newRegister = await this.userModel.create({
  //     name,
  //     email,
  //     password: hashPassword,
  //     age,
  //     gender,
  //     address,
  //     role: 'USER',
  //   });
  //   return newRegister;
  // }
}
