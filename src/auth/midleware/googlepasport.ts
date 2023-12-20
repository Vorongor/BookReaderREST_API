import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { googleConstsnts } from '../../constans';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    super({
      clientID: googleConstsnts.clientID,
      clientSecret: googleConstsnts.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const email = profile.emails[0].value;
    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        email,
        name: profile.displayName,
      });
      await user.save();
    }

    const payload = { sub: user._id, email: user.email };
    const accessUToken = await this.jwtService.signAsync(payload);
    const refreshUToken = await this.jwtService.signAsync(payload);

    done(null, {
      ...user.toObject(),
      accessToken: accessUToken,
      refreshToken: refreshUToken,
    });
  }
}
