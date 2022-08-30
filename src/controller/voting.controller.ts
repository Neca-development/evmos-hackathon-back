import {
  Param,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'

import { VotingService } from 'src/service/voting.service'
import { VotingEntity } from '../data/entity/voting.entity'

@UniDecorators.Controller('voting')
export class UserController {
  constructor(private readonly votingService: VotingService) {}

  @UniDecorators.Get(
    '/:daoAddress',
    'Get all voting for dao',
    true,
    VotingEntity
  )
  async getVotings(@Param('daoAddress') address: string): Promise<VotingEntity[]> {
    const res = await this.votingService.getByAddress(address)
    return res
  }
}
