import { Injectable } from '@nestjs/common';
import { Seed } from '@scripts/seed';
@Injectable()
export class AppService {
  constructor(
    private readonly seed: Seed
  ) {}
  async onModuleInit() {
    await this.seed.run();
  }
}
