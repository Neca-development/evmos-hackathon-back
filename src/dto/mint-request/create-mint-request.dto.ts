import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum';

export class CreateMintRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    userAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    daoAddress: string

  @ApiProperty({ enum: TokenTypeEnum })
  @IsNotEmpty()
    tokenType: TokenTypeEnum
}
