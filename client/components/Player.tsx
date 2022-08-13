import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Pause, PlayArrow, VolumeUp } from '../node_modules/@mui/icons-material/index';
import { Grid, IconButton } from '../node_modules/@mui/material/index';
import styles from '../styles/Player.module.scss';
import TrackProgress from './TrackProgress';

let audio;

const Player = () => {
  const { pause, volume, duration, active, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } =
    useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(e.target.value);
    setVolume(inputNumber);
    audio.volume = inputNumber / 100;
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(e.target.value);
    setCurrentTime(inputNumber);
    audio.currentTime = inputNumber;
  };

  if (!active) return null;

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>{pause ? <PlayArrow /> : <Pause />}</IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 10px' }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.text}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
