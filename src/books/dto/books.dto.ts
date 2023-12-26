import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class ReviewDto {
  @IsInt({ message: 'The rating must be an integer.' })
  @Min(1, { message: 'The rating must be at least 1.' })
  @Max(5, { message: 'The rating must be at most 5.' })
  readonly rate: number;

  @IsString({ message: 'The comment must be a string.' })
  @IsOptional()
  readonly comment?: string;
}

export class CreateBookDto {
  @IsString()
  @IsString({ message: 'The title of the book must be a string.' })
  readonly title: string;

  @IsString({ message: 'The author of the book must be a string.' })
  readonly author: string;

  @IsInt({ message: 'The number of pages must be an integer.' })
  @Min(1, { message: 'The number of pages must be at least 1.' })
  readonly pages: number;

  @IsInt({ message: 'The year of publication must be an integer.' })
  @Min(0, { message: 'The year of publication cannot be less than 0.' })
  readonly year: number;

  @IsEnum(['new', 'reading', 'finished', 'canceled'], {
    message: 'Invalid book status.',
  })
  @IsOptional()
  readonly state?: 'new' | 'reading' | 'finished' | 'canceled';

  @IsInt({ message: 'The number of pages read must be an integer.' })
  @Min(0, {
    message: 'The number of pages read cannot be less than 0.',
  })
  @IsOptional()
  readonly pagesRead?: number;

  @IsObject({ message: 'The review must be an object.' })
  @ValidateNested()
  @Type(() => ReviewDto)
  @IsOptional()
  readonly review?: ReviewDto;
}
