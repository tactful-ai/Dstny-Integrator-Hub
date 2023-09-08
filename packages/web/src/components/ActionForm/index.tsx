import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as URLS from 'config/urls';
import { useLocation, useNavigate } from 'react-router-dom';

function ActionForm() {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const mainkey = queryParams.get('mainkey');
  const [actions, setActions] = useState([
    {
      name: '',
      Key: '',
      Description: '',
    },
  ]);

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name.split('-')[0]; 

    setActions((prevActions) => {
      const newActions = [...prevActions];
      const index = Number(name.split('-')[1]); 
      newActions[index] = {
        ...newActions[index],
        [fieldName]: value,
      };
      return newActions;
    });
  };

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queryParameters = actions
      .map((action) => `name=${action.name}&key=${action.Key}&description=${action.Description}`)
      .join('&');

    window.location.href = `${URLS.INPUTACTION_PAGE}?${queryParameters}&mainkey=${mainkey}`;
    console.log(mainkey);
    console.log(queryParameters);

  };

  const paperStyle = {
    width: '500px',
    padding: '20px',
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
      <form onSubmit={handleSubmit}>
        {actions.map((action, index) => (
          <div key={index}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`name-${index}`}>Name:</label>
              <TextField
                name={`name-${index}`}
                fullWidth
                required
                value={action.name}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`Key-${index}`}>Key:</label>
              <TextField
                name={`Key-${index}`}
                fullWidth
                required
                value={action.Key}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`Description-${index}`}>Description:</label>
              <TextField
                name={`Description-${index}`}
                fullWidth
                required
                value={action.Description}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Continue
        </Button>
      </form>
    </Paper>
  );
}

export default ActionForm;
