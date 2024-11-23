import { Controller, Post, Get, Body } from "@nestjs/common";
import { WaitlistService } from "./waitlist.service";
import { WaitlistTalentDTO } from "./dtos/waitlist-talent.dto";
import { WaitlistCompanyDTO } from "./dtos/waitlist-company.dto";

@Controller("waitlist")
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post("talent")
  async addTalentWaitlist(@Body() waitlistDto: WaitlistTalentDTO) {
    return this.waitlistService.addTalentWaitlist(waitlistDto);
  }

  @Get("talent")
  async getTalentWaitlist() {
    return this.waitlistService.getTalentWaitlist();
  }

  @Post("company")
  async addCompanyWaitlist(@Body() waitlistDto: WaitlistCompanyDTO) {
    return this.waitlistService.addCompanyWaitlist(waitlistDto);
  }

  @Get("company")
  async getCompanyWaitlist() {
    return this.waitlistService.getCompanyWaitlist();
  }
}
