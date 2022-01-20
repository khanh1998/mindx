import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { timeStamp } from 'console';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(
    @Body() payload: { title: string; body: string; tags: string[] },
    @Request() req,
  ) {
    const { body, title, tags } = payload;
    return this.postService.createPost(
      { body, title, tags },
      req.user.username,
    );
  }

  @Get('/:username')
  getUserPost(@Param('username') username: string) {
    return this.postService.getPostByUsername(username);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }
}
