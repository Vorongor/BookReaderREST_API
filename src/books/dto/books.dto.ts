import { IsString, IsInt, Min, Max, IsEnum } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsString({ message: 'Назва книги повинна бути рядком.' })
  readonly title: string;

  @IsString({ message: 'Автор книги повинен бути рядком.' })
  readonly author: string;

  @IsInt({ message: 'Кількість сторінок має бути цілим числом.' })
  @Min(1, { message: 'Кількість сторінок має бути не менше 1.' })
  readonly pages: number;

  @IsInt({ message: 'Рік видання має бути цілим числом.' })
  @Min(0, { message: 'Рік видання не може бути меншим за 0.' })
  readonly year: number;

  @IsEnum(['new', 'reading', 'finished', 'canceled'], {
    message: 'Стан книги недійсний.',
  })
  readonly state: 'new' | 'reading' | 'finished' | 'canceled';

  @IsInt({ message: 'Кількість прочитаних сторінок має бути цілим числом.' })
  @Min(0, {
    message: 'Кількість прочитаних сторінок не може бути меншою за 0.',
  })
  readonly pagesRead: number;
}
