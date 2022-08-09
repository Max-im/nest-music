import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles() files,
    @Body() dto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll(
    @Query('count') take: number,
    @Query('offset') skip: number,
  ): Promise<TrackEntity[]> {
    return this.trackService.getAll(take, skip);
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<TrackEntity[]> {
    return this.trackService.search(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<TrackEntity> {
    return this.trackService.getOne(id);
  }

  @Put('/listen/:id')
  listenTrack(@Param('id') id: string): Promise<TrackEntity> {
    return this.trackService.listenTrack(id);
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
