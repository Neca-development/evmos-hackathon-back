import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator'
import { RegExps } from 'src/infrastructure/const/reg-exps.constant'

export class CreateVotingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    smartContractId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    ipfsUrl: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(RegExps.ETH_ADDRESS)
    daoAddress: string
}
