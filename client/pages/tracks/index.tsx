import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Card, Button, Box } from '@mui/material';
import { useRouter } from '../../node_modules/next/router';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { wrapper } from '../../store/index';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';
import { TextField } from '../../node_modules/@mui/material/index';
import { useDispatch } from 'react-redux';

const Index = () => {
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    )
  }

  if (error.length) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title="Track List | Nest Music">
      <Grid container justifyContent="center">
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Tracks</h1>
              <Button onClick={() => router.push('/tracks/create')}>Upload</Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} label="Search"/>
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res}) => {
  await store.dispatch(await fetchTracks());
});