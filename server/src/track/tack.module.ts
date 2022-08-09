import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { FileService } from 'src/file/file.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
