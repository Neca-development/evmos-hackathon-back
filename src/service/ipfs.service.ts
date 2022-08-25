import { NFTStorage, Blob, File } from 'nft.storage'
import { Injectable } from '@nestjs/common'

import { ApiConfigService } from '../infrastructure/config/api-config.service';

@Injectable()
export class IpfsService {
  private readonly nftStorage = new NFTStorage({ token: this.apiConfigService.ipfsToken });

  constructor(private readonly apiConfigService: ApiConfigService) {}

  async loadImg(data: string | Buffer, type: string): Promise<string> {
    if (data instanceof Buffer) {
      const file = new File([data], `nft${type}`, { type: `image/${type}` });
      const cid = await this.nftStorage.storeDirectory([file]);

      return `${this.getFullUrl(cid)}/nft${type}`
    }

    const blob = new Blob([data])
    const cid = await this.nftStorage.storeBlob(blob);

    return `${this.getFullUrl(cid)}/nft${type}`
  }

  async loadJson(data: string | Buffer): Promise<string> {
    if (data instanceof Buffer) {
      const file = new File([data], 'dao.json', { type: 'application/json' });
      const cid = await this.nftStorage.storeDirectory([file]);

      return `${this.getFullUrl(cid)}/dao.json`
    }

    const blob = new Blob([data])
    const cid = await this.nftStorage.storeBlob(blob);

    return `${this.getFullUrl(cid)}/dao.json`
  }

  private getFullUrl(cid: string): string {
    return `https://${cid}.ipfs.nftstorage.link`;
  }
}
