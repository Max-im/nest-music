import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Button } from '@mui/material';
import StepWrapper from '../../components/StepWrapper';
import { TextField } from '../../node_modules/@mui/material/index';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import axios from '../../node_modules/axios/index';
import { useRouter } from '../../node_modules/next/router';

export default function Create() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const name = useInput('');
  const author = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', author.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios.post('http://localhost:5000/tracks', formData)
        .catch(err => console.log(err)).finally(() => router.push('/tracks')) 
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={'column'} style={{ padding: 20 }}>
            <TextField style={{ marginTop: 10 }} label={'Track name'} {...name} />
            <TextField style={{ marginTop: 10 }} label={'Author'} {...author} />
            <TextField style={{ marginTop: 10 }} label={'Text'} multiline rows={3} {...text} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Upload Image</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Upload Audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>
        <Button onClick={next}>
          Next
        </Button>
      </Grid>
    </MainLayout>
  );
}
