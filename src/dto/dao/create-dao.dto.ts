import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class CreateDaoDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
    name: string

  @ApiProperty()
  @IsString()
  @IsDefined()
    descr: string

  @ApiProperty()
  @IsString()
  @IsDefined()
    ava: string

  @ApiProperty()
  @IsString()
  @IsDefined()
    lowImg: string

  @ApiProperty()
  @IsString()
  @IsDefined()
    mediumImg: string

  @ApiProperty()
  @IsString()
  @IsDefined()
    highImg: string
}

// {
//   "info": {
//     "name": "1",
//     "descr": "2"
//   },
//   "ava": "https://ava.ipfs.nftstorage.link",
//   "img1": "https://1.ipfs.nftstorage.link",
//   "img2": "https://2.ipfs.nftstorage.link",
//   "img3": "https://3.ipfs.nftstorage.link"
// }
