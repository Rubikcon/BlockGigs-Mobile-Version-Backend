import { Module } from "@nestjs/common";
import { WaitlistController } from "./waitlist.controller";
import { WaitlistService } from "./waitlist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WaitlistTalent } from "./waitlist-talent.entity";
import { WaitlistCompany } from "./waitlist-company.entity";

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService],
  imports: [
    TypeOrmModule.forFeature([WaitlistTalent]),
    TypeOrmModule.forFeature([WaitlistCompany]),
  ],
  exports: [TypeOrmModule],
})
export class WaitlistModule {}
