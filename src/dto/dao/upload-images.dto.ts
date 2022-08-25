import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class UploadImagesDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    ava: Express.Multer.File

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    lowImg: Express.Multer.File

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    mediumImg: Express.Multer.File

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
    highImg: Express.Multer.File
}
