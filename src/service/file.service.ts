import { Injectable } from '@nestjs/common'
import { join, resolve } from 'path';
import { IpfsService } from './ipfs.service'

@Injectable()
export class FileService {
  constructor(private readonly ipfsService: IpfsService) {}

  getPath(filename: string): string {
    console.log(filename);
    return join(resolve(''), 'uploads', filename)
  }
}
