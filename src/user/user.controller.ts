import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() user: { username: string; fullname: string; password: string },
  ): Promise<User> {
    const { fullname, password, username } = user;
    return await this.userService.save({ username, password, fullname });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Request() req) {
    return await this.userService.findOne(req.user.username);
  }
}
