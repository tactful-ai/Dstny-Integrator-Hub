// InputActionForm.js
import React, { useState , useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation  } from 'react-router-dom';
import * as URLS from 'config/urls';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function InputActionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [combinedFormData, setCombinedFormData] = useState({
    actionFormData: {
      name: '',
      Key: '',
      Description: '',
    },
    inputActionData: [
      {
        label: '',
        key: '',
        type: '',
        required: false,
        description: '',
        variables: false,
      },
    ],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const actionFormData = {
      name: searchParams.get('name') || '',
      Key: searchParams.get('key') || '',
      Description: searchParams.get('description') || '',
    };
    console.log(actionFormData)

    setCombinedFormData((prevData) => ({
      ...prevData,
      actionFormData,
    }));
  }, [location.search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name.split('-')[0];

    setCombinedFormData((prevData) => ({
      ...prevData,
      inputActionData: [
        {
          ...prevData.inputActionData[0],
          [fieldName]: value,
        },
      ],
    }));
  };

  const handleSelectChange = (index: number, selectedValue: string, fieldName: string) => {
    setCombinedFormData((prevData) => ({
      ...prevData,
      inputActionData: prevData.inputActionData.map((item, i) =>
        i === index
          ? {
              ...item,
              [fieldName]: selectedValue === 'true',
            }
          : item
      ),
    }));
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    navigate(URLS.ACTION_PAGE2, {
      state: combinedFormData,
    });
    console.log(combinedFormData, combinedFormData.inputActionData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Input Field
      </Typography>
      <form onSubmit={handleSubmit}>
        {combinedFormData.inputActionData.map((item, index) => (
          <div key={index}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`label-${index}`}>Label:</label>
              <TextField
                name={`label-${index}`}
                fullWidth
                required
                value={item.label}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`key-${index}`}>Key:</label>
              <TextField
                name={`key-${index}`}
                fullWidth
                required
                value={item.key}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor={`type-${index}`}>Type:</label>
              <TextField
                name={`type-${index}`}
                fullWidth
                required
                value={item.type}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor={`required-${index}`}>Required:</label>
              <FormControl fullWidth>
                <Select
                  name={`required-${index}`}
                  value={item.required.toString()}
                  onChange={(event) => handleSelectChange(index, event.target.value, 'required')}
                  margin="dense"
                  size="small"
                >
                  <MenuItem value="false">False</MenuItem>
                  <MenuItem value="true">True</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`description-${index}`}>Description:</label>
              <TextField
                name={`description-${index}`}
                fullWidth
                required
                value={item.description}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor={`variables-${index}`}>Variables:</label>
              <FormControl fullWidth>
                <Select
                  name={`variables-${index}`}
                  value={item.variables.toString()}
                  onChange={(event) => handleSelectChange(index, event.target.value, 'variables')}
                  margin="dense"
                  size="small"
                >
                  <MenuItem value="false">False</MenuItem>
                  <MenuItem value="true">True</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
    </Paper>
  );
}

export default InputActionForm;
