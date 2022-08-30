import {
  Body,
  Param,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'

import { VotingService } from 'src/service/voting.service'
import { GenerateVotingDto } from '../dto/voting/generate-voting.dto'
import { CreateVotingDto } from '../dto/voting/create-voting.dto'
import { VotingEntity } from '../data/entity/voting.entity'

@UniDecorators.Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @UniDecorators.Get(
    '/:daoAddress',
    'Get all voting for dao',
    true,
    VotingEntity
  )
  async getVotings(@Param('daoAddress') address: string): Promise<VotingEntity[]> {
    const res = await this.votingService.getByDaoAddress(address)
    return res
  }

  @UniDecorators.Post(
    '/create',
    'Create voting',
    false,
    VotingEntity
  )
  async createVoting(@Body() createDto: CreateVotingDto): Promise<VotingEntity> {
    const res = await this.votingService.create(createDto)
    return res
  }

  @UniDecorators.Post(
    '/generate-ipfs',
    'Generate voting ipfs',
    false,
    String
  )
  async generateIpfs(@Body() dto: GenerateVotingDto): Promise<string> {
    const res = await this.votingService.generateIpfs(dto)
    return res
  }
}
