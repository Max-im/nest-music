import React from 'react';
import { Pause, PlayArrow, VolumeUp } from '../node_modules/@mui/icons-material/index';
import { Grid, IconButton } from '../node_modules/@mui/material/index';
import styles from '../styles/Player.module.scss';
import TrackProgress from './TrackProgress';

const Player = () => {
  const track: ITrack = {
    id: 'c04ee10e-ede4-4539-98b7-007139428d79',
    name: 'track-1',
    artist: 'artist-1',
    text: 'text-1',
    listens: 0,
    audio: 'audio',
    picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg',
    comments: [{ id: 1, username: 'one', text: 'lorem' }],
  };
  const active = false;
  return (
    <div className={styles.player}>
      <IconButton onCLick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 10px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.text}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => {}}/>
      <VolumeUp style={{marginLeft: 'auto'}} />
      <TrackProgress left={0} right={100} onChange={() => {}}/>
    </div>
  );
};

export default Player;
