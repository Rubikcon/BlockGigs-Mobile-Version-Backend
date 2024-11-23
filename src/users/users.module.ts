import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule {}
