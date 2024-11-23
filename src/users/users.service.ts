import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserUpdateDTO } from "./user-update.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) return user;
    else {
      throw new NotFoundException("No user");
    }
  }

  async createUser(user: UserDTO): Promise<User> {
    let newUser = this.usersRepository.save(user as User);
    return newUser;
  }

  async updateUser(userId: number, updateDTO: UserUpdateDTO) {
    const user = await this.getUser(userId);

    user.walletAddress = updateDTO.walletAddress;

    return this.usersRepository.save(user);
  }
}
