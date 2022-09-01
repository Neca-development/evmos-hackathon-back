import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class GenerateDaoLinksResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    dao: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    lowToken: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    mediumToken: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    highToken: string
}
