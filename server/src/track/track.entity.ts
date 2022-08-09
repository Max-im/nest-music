import { v4 as uuid } from 'uuid';
import { CommentEntity } from 'src/comment/comment.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @PrimaryColumn({ type: 'uuid', default: uuid() })
  id: string;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  text: string;

  @Column({ default: '' })
  picture: string;

  @Column({ default: '' })
  audio: string;

  @Column({ default: 0 })
  listens: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.track)
  comments: CommentEntity[];
}
