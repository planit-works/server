import {
  UpdateProfileOutboundPort,
  UpdateProfileOutboundPortInputDto,
} from '../outbound-port/update-profile.outbound-port';
import { UpdateProfileService } from './update-profile.service';

class MockUpdateProfileOutboundPort implements UpdateProfileOutboundPort {
  execute(params: UpdateProfileOutboundPortInputDto): Promise<void> {
    return Promise.resolve();
  }
}

let updateProfileService: UpdateProfileService;

describe('UpdateProfileService 유닛 테스트', () => {
  beforeEach(async () => {
    updateProfileService = new UpdateProfileService(
      new MockUpdateProfileOutboundPort(),
    );
  });

  test('UpdateProfileService를 인스턴스로 생성할 수 있다.', () => {
    expect(updateProfileService).toBeDefined();
  });

  test('정상적인 요청에 대해 204 상태코드를 반환한다.', async () => {
    await expect(
      updateProfileService.execute({
        profileId: 1,
        avatarUrl: 'avatars/123456789',
      }),
    ).resolves.not.toThrow();
  });
});
