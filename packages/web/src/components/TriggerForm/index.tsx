import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

interface TriggerData {
  name: string;
  key: string;
  description: string;
}

interface TriggerFormProps {
  onNext: (data: TriggerData) => void;
}

function TriggerForm({ onNext }: TriggerFormProps){

  const location = useLocation(); 
  const navigate = useNavigate();
  const [Triggers, setTriggers] = useState(
    {
      name: '',
      Key: '',
      Description: '',
    },
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTriggers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedTriggerData = {
      name: Triggers.name,
      key: Triggers.Key,
      description: Triggers.Description,
    };
    onNext(formattedTriggerData);
  };


  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
      <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"name"}>Name:</label>
              <TextField
                name={"name"}
                fullWidth
                required
                value={Triggers.name}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"Key"}>Key:</label>
              <TextField
                name={"Key"}
                fullWidth
                required
                value={Triggers.Key}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"Description"}>Description:</label>
              <TextField
                name={"Description"}
                fullWidth
                required
                value={Triggers.Description}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Continue
        </Button>
      </form>
    </Paper>
  );
}

export default TriggerForm;
