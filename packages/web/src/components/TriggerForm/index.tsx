import React, { useState, useEffect } from 'react';
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
    initialData?: TriggerData;
}

function TriggerForm({ onNext, initialData }: TriggerFormProps){

  const location = useLocation(); 
  const navigate = useNavigate();
  const [triggers, setTriggers] = useState<TriggerData>(
    initialData || {
      name: '',
      key: '',
      description: '',
    }
  );

  useEffect(() => {
    if (initialData) {
      setTriggers(initialData);
    }
  }, [initialData]);

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
      name: triggers.name,
      key: triggers.key,
      description: triggers.description,
    };
    onNext(formattedTriggerData);
  };


 return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Triggers
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={triggers.name}
            onChange={handleInputChange}
            margin="dense"
            size="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="key">Key:</label>
          <TextField
            name="key"
            fullWidth
            required
            value={triggers.key}
            onChange={handleInputChange}
            margin="dense"
            size="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <TextField
            name="description"
            fullWidth
            required
            value={triggers.description}
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
