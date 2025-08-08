import { Module } from '@nestjs/common';
import { Seed } from './seed';
import { ApplicationModule } from '@repositories/application/application.module';

@Module({
    imports: [ApplicationModule],
    providers: [Seed],
    exports: [Seed],
})
export class SeedModule {}