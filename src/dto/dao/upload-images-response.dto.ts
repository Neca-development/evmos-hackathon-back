import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class UploadImagesResponseDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    ava: string

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    lowImg: string

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    mediumImg: string

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    highImg: string
}
