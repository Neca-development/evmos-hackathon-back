import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class GetDaoDto {
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
