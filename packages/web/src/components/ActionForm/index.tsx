import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as URLS from 'config/urls';
import { useNavigate, useParams } from 'react-router-dom';




interface ActionData {
  name: string;
  key: string;
  description: string;
}

interface ActionFormProps {
  onNext: (data: ActionData) => void;
  initialData?: ActionData;
}

function ActionForm({ onNext, initialData }: ActionFormProps) {
  
  const {appKey} = useParams(); 
  const [actions, setActions] = useState<ActionData>(
    initialData || {
      name: '',
      key: '',
      description: '',
    }
  );

  useEffect(() => {
    if (initialData) {
      setActions(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setActions((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const formattedActionData = {
      name: actions.name,
      key: actions.key,
      description: actions.description,
    };
    onNext(formattedActionData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Actions
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={actions.name}
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
            value={actions.key}
            onChange={handleInputChange}
            margin="dense"
            size="small"
            disabled={initialData?.key !== ''} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <TextField
            name="description"
            fullWidth
            required
            value={actions.description}
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

export default ActionForm;
