import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { useRouter } from '../../node_modules/next/router';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import { ITrack } from '../../types/track';

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try{
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track.id,
      });
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch(err){ console.log(err)} 
  };

  return (
    <MainLayout title={"Track | Nest Music | " + track.name + ' - ' + track.artist} keywords={track.name+', '+track.artist}>
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
        <TextField label="Name" fullWidth {...username} />
        <TextField label="Comment" fullWidth multiline rows={4} {...text} />
        <Button onClick={addComment}>Add Comment</Button>
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
      serverTrack: response.data,
    },
  };
};
