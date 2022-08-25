import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum'

export class MintRequestDto {
  @ApiProperty()
  @IsNotEmpty()
    id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    userAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    tokenType: TokenTypeEnum

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    daoAddress: string
}
