import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import * as URLS from 'config/urls';
import Box from '@mui/material/Box';

function OverviewForm() {
  const stepContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    borderUp: '1px solid #ccc',
    paddingUp: '20px',
  };

  const stepNumberStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '15px',
  };

  const stepContentStyle = {
    flex: '2',
    padding: ' 20px',  
  };

  const buttonContainerStyle = {
    marginLeft: 'auto',
  };
  const paperStyle = {
    width: '700px', 
    padding: '20px',
    alignItems: 'center', 
  };

  const {appKey} = useParams();
  return (
    <div style ={{marginLeft: '-60px'}}>
      <Box sx={paperStyle }>
      <Paper>
        <div style={{ maxWidth: '1300px', padding: '20px' }}>
          <Typography variant="h4" >Implementation Overview</Typography>

          <div style={stepContainerStyle}>
            <Typography variant="subtitle1" style={stepNumberStyle}>
              1 
            </Typography>
            <div style={stepContentStyle}>
              <Typography variant="h5" fontWeight="500" >Authentication</Typography>
              <Typography marginBottom="7px" color="#686868">
                Tell us how to authenticate users with your API
              </Typography>
            </div>
            <div style={buttonContainerStyle}>
              <Button
                component={Link}
                to={URLS.NEW_INTEGRATION_AUTH_API_KEY_PAGE(appKey)}
                variant="outlined"
                color="primary"
                size="small"
              >
                Set up
              </Button>
            </div>
          </div>

          <div style={stepContainerStyle}>
            <Typography variant="subtitle1" style={stepNumberStyle}>
              2 
            </Typography>
            <div style={stepContentStyle}>
              <Typography variant="h5" fontWeight="500" >Triggers</Typography>
              <Typography marginBottom="7px" color="#686868">
                Help users find new data when it's available in your app
              </Typography>
            </div>
            <div style={buttonContainerStyle}>
              <Button
                component={Link}
                to={URLS.NEW_INTEGRATION_LIST_TRIGGERS_PAGE(appKey)}
                variant="outlined"
                color="primary"
                size="small"
              >
                Set up
              </Button>
            </div>
          </div>

          <div style={stepContainerStyle}>
            <Typography variant="subtitle1" style={stepNumberStyle}>
              3 
            </Typography>
            <div style={stepContentStyle}>
              <Typography variant="h5" fontWeight="500" >Actions</Typography>
              <Typography marginBottom="7px" color="#686868">
                Help users write data back to your integration
              </Typography>
            </div>
            <div style={buttonContainerStyle}>
              <Button
                component={Link}
                to={URLS.NEW_INTEGRATION_LIST_ACTIONS_PAGE(appKey)}
                variant="outlined"
                color="primary"
                size="small"
              >
                Set up
              </Button>
            </div>
          </div>

        </div>
      </Paper>
    </Box>
    </div> 

    
  );
}

export default OverviewForm;
