import React from 'react';
import { Card, Container, Grid, Step, StepLabel, Stepper } from '../node_modules/@mui/material/index';

interface StepWrapperProps {
  activeStep: number;
  children: any
}

const steps = ['Track Information', 'Upload Track Picture', 'Upload Audio'];

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={i} completed={activeStep > i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" style={{ margin: '70px, 0', height: 270 }}>
        <Card style={{width: 600}}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
