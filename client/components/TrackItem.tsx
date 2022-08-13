import React from 'react';
import { ITrack } from '../types/track';
import { Grid, Card, Button, Box, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss';
import { PlayArrow, Pause, Delete } from '../node_modules/@mui/icons-material/index';
import { useRouter } from '../node_modules/next/router';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track.id)}>
      <IconButton onClick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img width={70} height={70} src={track.picture} />
      <Grid container direction="column" style={{ width: 200, margin: '0 10px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.text}</div>
      </Grid>
      {active && <div>2:44 / 3:15</div>}
      <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
