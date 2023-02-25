import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileRepository } from '../outbound-adapter/update-profile.repository';
import {
  UpdateProfileOutboundPort,
  UpdateProfileOutboundPortInputDto,
} from '../outbound-port/update-profile.outbound-port';

@Injectable()
export class UpdateProfileService {
  constructor(
    @Inject(UpdateProfileRepository)
    private updateProfileOutboundPort: UpdateProfileOutboundPort,
  ) {}

  async execute(params: UpdateProfileOutboundPortInputDto): Promise<void> {
    await this.updateProfileOutboundPort.execute(params);
    return;
  }
}
