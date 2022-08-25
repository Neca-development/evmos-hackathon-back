import { AutoMap } from '@automapper/classes'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum'
import { RegExps } from 'src/infrastructure/const/reg-exps.constant'

export class MintRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
    id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @Matches(RegExps.ETH_ADDRESS)
    userAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
    tokenType: TokenTypeEnum

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @Matches(RegExps.ETH_ADDRESS)
    daoAddress: string
}
