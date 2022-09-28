import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { DossierModule } from '../dossier/dossier.module';
import { CompanyModule } from '../company/company.module';
import { ProductuModule } from '../product/product.module';
import { ServiceuModule } from '../service/service.module';
import { ClientuModule } from '../client/client.module';
import { InvoiceuModule } from '../invoice/invoice.module';
import { SaleuModule } from '../sale/sale.module';
import { SaleItemuModule } from '../saleItem/saleItem.module';

import { GLOBAL_CONFIG } from '../../configs/global.config';
import { LoggerModule } from '../logger/logger.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    DossierModule,
    CompanyModule,
    ProductuModule,
    ServiceuModule,
    ClientuModule,
    InvoiceuModule,
    SaleuModule,
    SaleItemuModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
