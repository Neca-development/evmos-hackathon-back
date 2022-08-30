import { Injectable, } from '@nestjs/common'
import { VotingEntity } from 'src/data/entity/voting.entity'

import { VotingRepository } from '../repository/voting.repository'

@Injectable()
export class VotingService {
  constructor(private readonly votingRepository: VotingRepository) {}

  async getByAddress(address: string): Promise<VotingEntity[]> {
    const res = await this.votingRepository.getByAddress(address)
    return res
  }
}
