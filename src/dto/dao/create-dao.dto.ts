import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { RegExps } from 'src/infrastructure/const/reg-exps.constant'

export class CreateDaoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(RegExps.ETH_ADDRESS)
    contractAddress: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(RegExps.IPFS_URL)
    ipfsUrl: string
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
