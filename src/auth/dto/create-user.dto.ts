import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'Name must includes only english letter',
  })
  @ApiProperty({
    example: 'user_name',
    description: 'The name of the user',
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsString()
  @Length(6, 20)
  @ApiProperty({
    example: 'password',
    description: 'The password of the user, must be a least 6 symbols',
  })
  readonly password: string;
}
