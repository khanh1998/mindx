import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(
    @Body() payload: { content: string; postId: number },
    @Request() req,
  ) {
    return this.commentService.createComment(payload, req.user.username);
  }
}
