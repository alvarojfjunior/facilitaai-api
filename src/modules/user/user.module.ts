import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [PrismaService, UserListener],
  exports: [],
})
export class UserModule {}
