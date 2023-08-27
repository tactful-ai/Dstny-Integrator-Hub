import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as URLS from 'config/urls';

function OverviewForm() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Implementation Overview</Typography>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="subtitle1">1 / 3</Typography>
        <div style={{ marginBottom: '11px' }}>
          <Typography>Tell us how to authenticate users with your API</Typography>
        </div>
        <Button
          component={Link}
          to={URLS.LOGIN}
          variant="outlined"
          color="primary"
          fullWidth
          
        >
          Authentication
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="subtitle1">2 / 3</Typography>
        <div style={{ marginBottom: '11px' }}>
        <Typography>Help users find new data as soon as it's avaliable in your app</Typography>
        </div>
        <Button
          component={Link}
          to={URLS.LOGIN}
          variant="outlined"
          color="primary"
          fullWidth
        >
          Triggers
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="subtitle1">3 / 3</Typography>
        <div style={{ marginBottom: '11px' }}>
        <Typography>Help users write data back to your integration</Typography>
        </div>
        <Button
          component={Link}
          to={URLS.LOGIN}
          variant="outlined"
          color="primary"
          fullWidth
        >
          Actions
        </Button>
      </div>
    </Paper>
  );
}

export default OverviewForm;
