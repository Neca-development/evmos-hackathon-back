import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { UserEntity } from 'src/data/entity/user.entiry';

export class GetDaoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    ipfsUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    contractAddress: string;

  @ApiProperty()
    users: UserEntity[]
}
