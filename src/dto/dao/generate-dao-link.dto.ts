import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateDaoLinkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    descr: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    symbol: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    ava: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    lowImg: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    mediumImg: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    highImg: string
}
