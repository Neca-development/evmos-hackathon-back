import { DaoEntity } from 'src/data/entity/dao.entity'
import {
  Body,
  Param,
  ParseIntPipe,

  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { UniDecorators } from '@unistory/route-decorators'
import { diskStorage } from 'multer'

import { CreateMintRequestDto } from 'src/dto/mint-request/create-mint-request.dto'
import { MintRequestDto } from 'src/dto/mint-request/mint-request.dto'

import { MintRequestService } from 'src/service/mint-request.service'

@UniDecorators.Controller('mint-request')
export class MintRequestController {
  constructor(private readonly mintRequestService: MintRequestService) {}

  // @UniDecorators.Get(
  //   '',
  //   'Get total mint request list from database',
  //   true,
  //   MintRequestDto
  // )
  // async getMintRequestList(): Promise<MintRequestDto[]> {
  //   return this.mintRequestService.getMintRequestList()
  // }

  @UniDecorators.Get(
    '/:userAddress',
    'Get total mint request list from database',
    true,
    MintRequestDto
  )
  async getMintRequestListByUserAddress(
    @Param('userAddress') userAddress: string
  ): Promise<MintRequestDto[]> {
    return this.mintRequestService.getMintRequestListByUserAddress(userAddress)
  }

  @UniDecorators.Post(
    '/generate-list/:daoAddress',
    'Generate mint requests list from csv file',
    false,

  )
  @UseInterceptors(
    FileInterceptor('file', { storage: diskStorage({
      destination: './uploads/csv',
      filename: (req, file, cb) => {
        cb(null, file.originalname.replace(' ', '-'));
      },
    }) },)
  )
  async generateMintRequestList(

    @Param('daoAddress') daoAddress: string,
      @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    await this.mintRequestService.generateMintRequestList(file, daoAddress)
  }

  @UniDecorators.Post('', 'Create new mint request in database', false, Number)
  async createMintRequest(@Body() createDto: CreateMintRequestDto): Promise<number> {
    return this.mintRequestService.createMintRequest(createDto)
  }

  @UniDecorators.Delete(
    '/:id',
    'Remove existing mint request from database',
  )
  async removeMintRequest(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.mintRequestService.removeMintRequest(id)
  }

  @UniDecorators.Post(
    '/success/:id',
    'Get signature to mint token',
    false,
    DaoEntity
  )
  async successMintRequest(@Param('id', ParseIntPipe) id: number): Promise<DaoEntity> {
    const res = this.mintRequestService.successMintRequest(id)
    return res
  }

  @UniDecorators.Post(
    '/generate-signature/:mintRequestId',
    'Get signature to mint token',
    false,
    Promise<string>

  )
  async signToken(@Param('mintRequestId', ParseIntPipe) id: number): Promise<string> {
    const res = this.mintRequestService.generateSignature(id)
    return res
  }
}
