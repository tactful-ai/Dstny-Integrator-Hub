import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as URLS from 'config/urls';

function OverviewForm() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Overview</Typography>
      <div style={{ marginTop: '16px' }}>
        <Button
          component={Link}
          to={ URLS.INTEGRATION_PAGE } 
          // Replace with the actual URL for the authentication page
          variant="outlined"
          color="primary"
          fullWidth
        >
          Create integration
        </Button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Button
          component={Link}
          to={ URLS.LOGIN } 
          // Replace with the actual URL for the authentication page
          variant="outlined"
          color="primary"
          fullWidth
        >
          Authentication
        </Button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button
          component={Link}
          to={URLS.LOGIN} 
          // Replace with the actual URL for the triggers page
          variant="outlined"
          color="primary"
          fullWidth
        >
          Triggers
        </Button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button
          component={Link}
          to={URLS.LOGIN} 
          // Replace with the actual URL for the actions page
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
