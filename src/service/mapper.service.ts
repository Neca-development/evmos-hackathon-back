import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { MintRequestEntity } from '../data/entity/mint-request.entity'
import { MintRequestDto } from '../dto/mint-request/mint-request.dto';

@Injectable()
export class MapperService extends AutomapperProfile {
  protected mapper: Mapper;

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.mapper = mapper;
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, MintRequestEntity, MintRequestDto);
    };
  }
}
