import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { UserController } from "./users/users.controller";
import { UserService } from "./users/users.service";
import { ClientsModule } from "./clients/clients.module";
import { ProjectsModule } from "./projects/projects.module";
import { ProjectMilestonesModule } from "./project-milestones/project-milestones.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/user.entity";
import { Client } from "./clients/client.entity";
import { Project } from "./projects/project.entity";
import { ProjectMilestone } from "./project-milestones/project-milestone.entity";
import { OffersModule } from "./offers/offers.module";
import { Offer } from "./offers/offer.entity";

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    ProjectsModule,
    ProjectMilestonesModule,
    OffersModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: process.env.DATABASE_HOSTNAME,
    //   port: process.env.DATABASE_PORT as unknown as number,
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   entities: [User, Client, Project, ProjectMilestone, Offer],
    //   url: process.env.DATABASE_URL,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
        port: process.env.DATABASE_PORT as unknown as number,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Client, Project, ProjectMilestone, Offer],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
