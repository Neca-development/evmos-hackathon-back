import { Injectable } from '@nestjs/common'
import { VotingEntity } from 'src/data/entity/voting.entity'
import { GenerateVotingDto } from 'src/dto/voting/generate-voting.dto'
import { IpfsService } from './ipfs.service'

import { CreateVotingDto } from '../dto/voting/create-voting.dto'

import { VotingRepository } from '../repository/voting.repository'
import { DaoService } from './dao.service'

@Injectable()
export class VotingService {
  constructor(private readonly votingRepository: VotingRepository, private readonly daoService: DaoService, private readonly ipfsService: IpfsService) {}

  async getByDaoAddress(address: string): Promise<VotingEntity[]> {
    const dao = await this.daoService.getByAddress(address)

    return dao.votings
  }

  async generateIpfs(dto: GenerateVotingDto): Promise<string> {
    const string = JSON.stringify(dto)
    const res = await this.ipfsService.loadJson(string)
    return res
  }

  async create(dto: CreateVotingDto): Promise<VotingEntity> {
    const dao = await this.daoService.getByAddress(dto.daoAddress)
    const votings = await dao.votings
    const existVoting = votings.some((voting) => voting.smartContractId === dto.smartContractId)
    if (existVoting) {
      throw new Error('Voting already exists')
    }
    const res = await this.votingRepository.create(dto.ipfsUrl, dto.smartContractId, dao)
    return res
  }
}
