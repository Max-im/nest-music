import { TrackEntity } from 'src/track/track.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  text: string;

  @ManyToOne(() => TrackEntity, (track) => track.comments)
  track: TrackEntity;
}
