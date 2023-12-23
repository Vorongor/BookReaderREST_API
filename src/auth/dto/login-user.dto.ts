import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsString()
  @Length(6, 20)
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  readonly password: string;
}
