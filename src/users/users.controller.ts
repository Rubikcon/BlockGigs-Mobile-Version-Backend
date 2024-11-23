import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserDTO } from "./users.dto";
import { UserUpdateDTO } from "./user-update.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param() { id }: any): Promise<UserDTO> {
    const user = await this.userService.getUser(id);
    return { ...(user as UserDTO) };
  }

  @Post()
  async registerUser(@Body() userdto: UserDTO): Promise<UserDTO> {
    return this.userService.createUser(userdto);
  }

  @Put(":id")
  async updateUser(
    @Param("id") userId: number,
    @Body() updateDTO: UserUpdateDTO
  ) {
    return this.userService.updateUser(userId, updateDTO);
  }
}
