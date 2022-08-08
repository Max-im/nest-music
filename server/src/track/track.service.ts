import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(dto: CreateTrackDto): Promise<TrackEntity> {
    const track = new TrackEntity();

    Object.assign(track, dto);
    await this.trackRepository.save(track);

    return track;
  }

  async getAll() {
    return await this.trackRepository.find();
  }

  async getOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async delete(id: string): Promise<DeleteResult> {
    const track = await this.getOne(id);
    return await this.trackRepository.delete(track.id);
  }

  async createComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const track = await this.getOne(dto.trackId);
    const comment = new CommentEntity();
    Object.assign(comment, dto);
    track.comments = track.comments || [];
    track.comments.push(comment);
    await this.commentRepository.save(comment);
    await this.trackRepository.save(track);
    return comment;
  }
}
