import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post, PostBase } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Comment, CommentBase } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createComment(
    payload: CommentBase,
    authorUsername: string,
  ): Promise<Comment> {
    const author = await this.userRepository.findOneOrFail({
      where: { username: authorUsername },
    });
    const post = await this.postRepository.findOneOrFail(payload.postId);
    return this.commentRepository.save({
      content: payload.content,
      post,
      author,
    });
  }
}
