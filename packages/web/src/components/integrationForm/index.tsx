import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import * as URLS from 'config/urls';

function IntegrationForm() {
  const navigate = useNavigate();
  const [integrationData, setIntegrationData] = useState({
    name: '',
    description: '',
    logo: null,
    BaseUrl: '',
    homePageUrl: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setIntegrationData((prevData) => ({
          ...prevData,
          [name]: selectedFile,
        }));
      }
    } else {
      setIntegrationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Integration Data:', integrationData);
    navigate(URLS.OVERVIEW_PAGE);
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create Integration </Typography>
      <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={integrationData.name}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <TextField
            name="description"
            fullWidth
            multiline
            required
            value={integrationData.description}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="logo">Logo:</label>
          <div style={{ marginTop: '8px' , marginBottom: '8px'}}>
            <input
              type="file"
              id="logo"
              name="logo"
              required
              onChange={handleInputChange}
              style={{ display: 'block' }}
            />
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="homePageUrl">Home Page URL:</label>
          <TextField
            name="homePageUrl"
            fullWidth
            required
            value={integrationData.homePageUrl}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="BaseUrl">Base URL:</label>
          <TextField
            name="BaseUrl"
            fullWidth
            required
            value={integrationData.BaseUrl}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Integration
        </Button>
      </form>
    </Paper>
  );
}

export default IntegrationForm;
