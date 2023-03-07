import { Test, TestingModule } from '@nestjs/testing';
import { GoogleLoginService } from './google-login.service';

describe('GoogleLoginService', () => {
  let service: GoogleLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleLoginService],
    }).compile();

    service = module.get<GoogleLoginService>(GoogleLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
