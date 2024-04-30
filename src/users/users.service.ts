import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { User as UserReq } from 'src/decorator/customize';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schemas/role.schemas';
import { USER_ROLE } from 'src/databases/sample';
import { ConfigService } from '@nestjs/config';
import { ChangePassUserDto } from './dto/password-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) // connect shema of mongo
    private userModel: SoftDeleteModel<UserDocument>, // private userModel: Model<User>, // data type

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

    private configService: ConfigService,
  ) { }

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

    // add logic check existing mail
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} đã tồn tại. Vui lòng sử dụng email khác`,
      );
    }

    // fetch USER_ROLE role
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });

    // hash password
    const hashPassword = this.getHashPassword(password);

    // do
    let userRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
    });

    return userRegister;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    // regular expression:
    // - filter của thư viện sẽ biến thành qs của mongoDB
    // - VD: /pattern/i :: LIKE operator on mongoose

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    // count all documents theo điều kiện filter
    // chia và làm tròn ra tổng số trang
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều knpmiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }

    return await this.userModel
      .findOne({
        _id: id,
      })
      .select('-password')
      .populate({ path: 'role', select: { name: 1, _id: 1 } });
    // -password :: exclude >< include
    // return this.userModel.findOne({ _id: id });
  }

  findOneByUsername(username: string) {
    return this.userModel
      .findOne({ email: username })
      .populate({ path: 'role', select: { name: 1 } });
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

  async remove(id: string, @UserReq() userReq: IUser) {
    // validate:
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user';
    }

    // logic: prevent removing admin email:
    // nen config dong trong .env
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const foundUser = await this.userModel.findById(id);
    if (foundUser.email === adminEmail) {
      throw new BadRequestException(`Không thể xóa email admin=${adminEmail}`);
    }

    // updateOne( detetedBy ) + softDelete
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: userReq._id,
          email: userReq.email,
        },
      },
    );
    return this.userModel.softDelete({ _id: id });
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    await this.userModel.updateOne({ _id }, { refreshToken });
  };

  findUserByToken = async (refreshToken: string) => {
    return await this.userModel
      .findOne({ refreshToken })
      .populate({ path: 'role', select: { name: 1 } });
  };

  async changePassword(userDto: ChangePassUserDto, user: IUser) {
    // validate:
    if (!mongoose.Types.ObjectId.isValid(userDto._id)) {
      throw new BadRequestException(`Not found user with id=${userDto._id}`);
    }
    // find old password
    const oldUser = await this.userModel.findById(userDto._id);
    if(!oldUser) {
      throw new BadRequestException(`Not found user with id=${userDto._id}`);
    }
    // validate password
    // const isValid = this.isValidPassword(userDto.currentPass, oldUser.password);
    //   if (isValid === false) {
    //     throw new UnauthorizedException('Password không hợp lệ');
    //   }
    return await this.updatePassword(userDto._id, userDto.newPass, user);
    // // hash
    // const hashPassword = this.getHashPassword(userDto.newPass);

    // const updateUser = await this.userModel.updateOne(
    //   { _id: userDto._id },
    //   {
    //     password: hashPassword,
    //     updatedBy: {
    //       _id: user._id,
    //       email: user.email,
    //     },
    //   },
    // );

    // return updateUser;
  }

  async updatePassword(_id: any, newPass: string, user: any) {
    // hash
    const hashPassword = this.getHashPassword(newPass);
    // update
    const updateUser = await this.userModel.updateOne(
      { _id },
      {
        password: hashPassword,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return updateUser;
  }
}
