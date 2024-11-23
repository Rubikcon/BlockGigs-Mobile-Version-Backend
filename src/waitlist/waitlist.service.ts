import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WaitlistTalent } from "./waitlist-talent.entity";
import { Repository } from "typeorm";
import { WaitlistTalentDTO } from "./dtos/waitlist-talent.dto";
import { WaitlistCompanyDTO } from "./dtos/waitlist-company.dto";
import { WaitlistCompany } from "./waitlist-company.entity";

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(WaitlistTalent)
    private talentWaitlistRepository: Repository<WaitlistTalent>,
    @InjectRepository(WaitlistCompany)
    private companyWaitlistRepository: Repository<WaitlistCompany>
  ) {}

  addTalentWaitlist(waitlistDto: WaitlistTalentDTO) {
    return this.talentWaitlistRepository.save(waitlistDto);
  }

  addCompanyWaitlist(waitlistDto: WaitlistCompanyDTO) {
    return this.companyWaitlistRepository.save(waitlistDto);
  }

  getTalentWaitlist() {
    return this.talentWaitlistRepository.find();
  }

  getCompanyWaitlist() {
    return this.companyWaitlistRepository.find();
  }
}
