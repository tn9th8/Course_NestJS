import { Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

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

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);

    let user = await this.userModel.create({ ...createUserDto });

    return user;
  }

  async handleRegisterUser(registerUserDto: RegisterUserDto) {
    const hashPassword = this.getHashPassword(registerUserDto.password);
    const role = 'USER';

    let user = await this.userModel.create({
      ...registerUserDto,
      role: 'USER',
    });

    return user;
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

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
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
