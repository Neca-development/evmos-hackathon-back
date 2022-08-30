import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GenerateVotingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    question: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    descr: string
}
