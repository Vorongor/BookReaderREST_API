import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: "Ім'я користувача має містити лише англійські літери",
  })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 20)
  readonly password: string;
}
