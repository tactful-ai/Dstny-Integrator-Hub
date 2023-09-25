import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as URLS from 'config/urls';
import {  useNavigate, useParams } from 'react-router-dom';

function TriggerForm() {
  const navigate = useNavigate();
  const {appKey} = useParams();
  const [triggerData, setTriggerData] = useState({
    name: '',
    Key: '',
    Description: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTriggerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedTriggerData = {
      name: triggerData.name,
      key: triggerData.Key,
      description: triggerData.Description,
    };
    
    navigate(URLS.NEW_INTEGRATION_TRIGGER_PAGE2(appKey), { 
      state:  formattedTriggerData  });
  };

  const paperStyle = {
    width: '500px',
    padding: '20px',
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>Triggers</Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={triggerData.name}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="Key">Key:</label>
          <TextField
            name="Key"
            fullWidth
            multiline
            required
            value={triggerData.Key}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="Key">Description:</label>
          <TextField
            name="Description"
            fullWidth
            multiline
            required
            value={triggerData.Description}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} >
          Continue
        </Button>
      </form>
    </Paper>
  );
}

export default TriggerForm;
