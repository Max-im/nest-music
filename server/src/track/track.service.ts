import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';
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
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<TrackEntity> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const track = new TrackEntity();

    Object.assign(track, { ...dto, picture: picturePath, audio: audioPath });
    await this.trackRepository.save(track);

    return track;
  }

  async getAll(take = 10, skip = 0): Promise<TrackEntity[]> {
    return await this.trackRepository.find({ skip, take });
  }

  async search(query: string): Promise<TrackEntity[]> {
    return await this.trackRepository
      .createQueryBuilder('track')
      .where('track.name LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async getOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      relations: { comments: true },
      where: { id },
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async delete(id: string): Promise<DeleteResult> {
    const track = await this.getOne(id);
    return await this.trackRepository.delete(track.id);
  }

  async listenTrack(id: string): Promise<TrackEntity> {
    const track = await this.getOne(id);
    track.listens++;
    await this.trackRepository.save(track);
    return track;
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
