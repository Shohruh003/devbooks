import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_title: string;
}
