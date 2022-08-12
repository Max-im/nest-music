import React from 'react';
import { ITrack } from '../../types/track';
import { Grid, Button, TextField } from '@mui/material';
import { useRouter } from '../../node_modules/next/router';
import MainLayout from '../../layouts/MainLayout';

const TrackPage = () => {
  const track: ITrack = {
    id: 'c04ee10e-ede4-4539-98b7-007139428d79',
    name: 'track-1',
    artist: 'artist-1',
    text: 'text-1',
    listens: 0,
    audio: 'audio',
    picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg',
    comments: [{id: 1, username: 'one', text: 'lorem'}],
  };
  const router = useRouter();

  return (
    <MainLayout>
      <Button variant={'outlined'} style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
        to tracks
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img width={200} height={200} src={track.picture} />
        <div style={{ marginLeft: 30 }}>
          <h1>Track -{track.name}</h1>
          <p>Author - {track.artist}</p>
          <p>Listens -{track.listens}</p>
        </div>
      <p>Description -{track.text}</p>
      </Grid>
      <Grid container>
        <h3>Comments:</h3>
        <TextField label="Name" fullWidth/>
        <TextField label="Comment" fullWidth multiline rows={4}/>
        <Button>Add Comment</Button>
      </Grid>
      <div>
        {track.comments.map(comment => (
            <div key={comment.id}>
                <p>Author - {comment.username}</p>
                <p>Comment - {comment.text}</p>
            </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;
