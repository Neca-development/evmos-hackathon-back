import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class GenerateDaoLinksResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    daoMeta: string
}
