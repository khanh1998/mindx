import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Post, PostBase } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(post: PostBase, username: string) {
    const author = await this.userRepository.findOneOrFail({
      where: { username },
    });
    return await this.postRepository.save({ ...post, author });
  }

  async getPostByUsername(username: string) {
    return await this.postRepository.findAndCount({
      relations: ['author'],
      where: { author: { username } },
    });
  }

  async getAll() {
    return this.postRepository.find({});
  }
}
