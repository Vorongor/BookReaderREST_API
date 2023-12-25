import { IsInt, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    example: 1640995200,
    description: 'Start time in Unix format',
  })
  @IsInt({ message: 'Time must be an integer.' })
  @IsPositive({ message: 'Time must be a positive number.' })
  readonly startTime: number;

  @ApiProperty({
    example: 1643673600,
    description: 'Finish time in Unix format',
  })
  @IsInt({ message: 'Time must be an integer.' })
  @IsPositive({ message: 'Time must be a positive number.' })
  readonly finishTime: number;
}
