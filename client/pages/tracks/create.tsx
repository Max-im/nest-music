import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Card, Button } from '@mui/material';
import StepWrapper from '../../components/StepWrapper';
import { TextField } from '../../node_modules/@mui/material/index';
import FileUpload from '../../components/FileUpload';

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const next = () => {
    setActiveStep((prev) => prev + 1);
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={'column'} style={{ padding: 20 }}>
            <TextField style={{ marginTop: 10 }} label={'Track name'} />
            <TextField style={{ marginTop: 10 }} label={'Author'} />
            <TextField style={{ marginTop: 10 }} label={'Text'} multiline rows={3} />
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
        <Button disabled={activeStep === 2} onClick={next}>
          Next
        </Button>
      </Grid>
    </MainLayout>
  );
}
