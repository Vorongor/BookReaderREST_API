import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateTrainingDto {
  @ApiProperty({ example: '657daddde9f7ee386f16485a' })
  @IsString({ message: 'The comment must be a string.' })
  readonly planID: string;

  @ApiProperty({
    example: 1640995200,
    description: 'Start time in Unix format',
  })
  @IsInt({ message: 'Time must be an integer.' })
  @IsPositive({ message: 'Time must be a positive number.' })
  readonly time: number;

  @ApiProperty({
    example: 16,
    description: 'Result must be a positive number',
  })
  @IsInt({ message: 'Result must be an integer.' })
  @IsPositive({ message: 'Result must be a positive number.' })
  readonly result: number;
}
