import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { useRouter } from '../../node_modules/next/router';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();

  return (
    <MainLayout>
      <Button variant={'outlined'} style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
        to tracks
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img width={200} height={200} src={'http://localhost:5000/' + track.picture} />
        <div style={{ marginLeft: 30 }}>
          <h1>Track -{track.name}</h1>
          <p>Author - {track.artist}</p>
          <p>Listens -{track.listens}</p>
        </div>
        <p>Description -{track.text}</p>
      </Grid>
      <Grid container>
        <h3>Comments:</h3>
        <TextField label="Name" fullWidth />
        <TextField label="Comment" fullWidth multiline rows={4} />
        <Button>Add Comment</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
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

export const getServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id);
  return {
    props: {
      serverTrack: response.data
    }
  }
};
