import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Card, Button, Box } from '@mui/material';
import { useRouter } from '../../node_modules/next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

export default function Index() {
  const router = useRouter();
  const tracks: ITrack[] = [
    {id: 'c04ee10e-ede4-4539-98b7-007139428d79', name: 'track-1', artist: 'artist-1', text: 'text-1', listens: 0, audio: 'audio', picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg', comments: []},
    {id: 'c04ee10e-ede4-4539-98b7-007139428d79', name: 'track-2', artist: 'artist-2', text: 'text-2', listens: 0, audio: 'audio', picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg', comments: []},
    {id: 'c04ee10e-ede4-4539-98b7-007139428d79', name: 'track-3', artist: 'artist-3', text: 'text-3', listens: 0, audio: 'audio', picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg', comments: []},
  ] 
  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Tracks</h1>
              <Button onClick={() => router.push('/tracks/create')}>Upload</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
}
