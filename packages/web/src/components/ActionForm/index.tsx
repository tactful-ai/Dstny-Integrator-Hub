import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import config from 'config/app';
import * as URLS from 'config/urls';

function ActionForm() {
  const [ActionData, setActionData] = useState({
    name: '',
    Key: '',
    Description: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setActionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedActionData = {
      name: ActionData.name,
      key: ActionData.Key,
      description: ActionData.Description,
    };

    window.location.href = `${URLS.ACTION_PAGE2}?name=${formattedActionData.name}&key=${formattedActionData.key}&description=${formattedActionData.description}`;

 
  };

  const paperStyle = {
    width: '500px',
    padding: '20px',
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={ActionData.name}
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
            value={ActionData.Key}
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
            value={ActionData.Description}
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

export default ActionForm;
