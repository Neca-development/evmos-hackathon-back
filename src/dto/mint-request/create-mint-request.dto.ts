import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum';
import { RegExps } from 'src/infrastructure/const/reg-exps.constant';

export class CreateMintRequestDto {
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

  @ApiProperty({ enum: TokenTypeEnum })
  @IsNotEmpty()
    tokenType: TokenTypeEnum
}
