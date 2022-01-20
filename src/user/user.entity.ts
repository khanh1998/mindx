import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/comment.entity';

export class UserBase {
  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  @Exclude()
  password: string;
}

@Entity()
export class User extends UserBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (com) => com.author)
  comments: Comment[];
}
