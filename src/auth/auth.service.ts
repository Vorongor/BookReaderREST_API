import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type UserWithoutPassword = Omit<User, 'password'> & { accessToken: string } & {
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: UserDocument): Promise<string> {
    const payload = { sub: user._id, username: user.name };
    return this.jwtService.signAsync(payload, { expiresIn: '2h' });
  }

  async generateRefreshToken(user: UserDocument): Promise<string> {
    const payload = { sub: user._id, username: user.name };
    return this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const { email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email alredy in use');
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await createdUser.save();
    const { password: _, ...userResponse } = createdUser.toObject();

    const accessToken = await this.generateAccessToken(createdUser);
    const refreshToken = await this.generateRefreshToken(createdUser);

    return { ...userResponse, accessToken, refreshToken };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userResponse } = user.toObject();

      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      return { ...userResponse, accessToken, refreshToken };
    }
    return null;
  }

  async refreshToken(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      return { accessToken, refreshToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
