import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { MintRequestDto } from './mint-request.dto';

export class GetMintRequestsDto {
  @ApiProperty()
  @IsNotEmpty()
    mintRequests: MintRequestDto[]
}
