import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentEntity } from 'src/comment/comment.entity';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { DeleteResult } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() dto: CreateTrackDto): Promise<TrackEntity> {
    return this.trackService.create(dto);
  }

  @Get()
  getAll(): Promise<TrackEntity[]> {
    return this.trackService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<TrackEntity> {
    return this.trackService.getOne(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  createComment(@Body() dto: CreateCommentDto): Promise<CommentEntity> {
    return this.trackService.createComment(dto);
  }
}
