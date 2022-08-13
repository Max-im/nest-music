import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Pause, PlayArrow, VolumeUp } from '../node_modules/@mui/icons-material/index';
import { Grid, IconButton } from '../node_modules/@mui/material/index';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

let audio;

const Player = () => {
  const track: ITrack = {
    id: 'c04ee10e-ede4-4539-98b7-007139428d79',
    name: 'track-1',
    artist: 'artist-1',
    text: 'text-1',
    listens: 0,
    audio: 'http://localhost:5000/audio/5d80e799-c99e-401c-a248-0e917d854d3d.mp3',
    picture: 'http://localhost:5000/image/45165c29-2998-4bfa-888f-7dc6c76531bf.jpg',
    comments: [{ id: 1, username: 'one', text: 'lorem' }],
  };
  const { pause, volume, duration, active, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } =
    useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
      audio.src = track.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        console.log(audio.duration,'lllllllll')
        setDuration(audio.duration);
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      }
    }
  }, []);

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

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>{pause ? <PlayArrow /> : <Pause />}</IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 10px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.text}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
