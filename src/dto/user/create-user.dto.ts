import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { RegExps } from 'src/infrastructure/const/reg-exps.constant'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(RegExps.ETH_ADDRESS)
    userAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(RegExps.ETH_ADDRESS)
    daoAddress: string
}
