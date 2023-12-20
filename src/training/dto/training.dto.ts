import { IsInt, IsPositive } from 'class-validator';

export class CreateTrainingDto {
  @IsInt({ message: 'Time must be an integer.' })
  @IsPositive({ message: 'Time must be a positive number.' })
  readonly time: number;

  @IsInt({ message: 'Result must be an integer.' })
  @IsPositive({ message: 'Result must be a positive number.' })
  readonly result: number;
}
