import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface State {
  inputData: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
}

interface InputFormProps {
  inputData: State['inputData'] | null;
  onAddInputData: (data: State['inputData'][0]) => void;
  editingIndex: number | null; 
  onUpdateInputData: (index: number, data: State['inputData'][0]) => void; 
}

function InputForm({
  inputData,
  onAddInputData,
  editingIndex,
  onUpdateInputData,
}: InputFormProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (inputData) {
      // Set all input data objects
      setCombinedFormData({
        inputData: [...inputData],
      });
    }

    if (editingIndex !== null) {
      // If editingIndex is not null, it means we are editing existing data.
      setCombinedFormData((prevData) => {
        const editedData = prevData.inputData[editingIndex];
        const updatedInputData = prevData.inputData.map((item, i) =>
          i === editingIndex ? editedData : item
        );
        return {
          ...prevData,
          inputData: updatedInputData,
        };
      });
    } else {
      // Initialize combinedFormData with an empty array when creating a new input.
      setCombinedFormData({
        inputData: [
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
    }
  }, [location, inputData, editingIndex]);

  const [combinedFormData, setCombinedFormData] = useState<State>({
    inputData: [
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;

      setCombinedFormData((prevData) => ({
        ...prevData,
        inputData: prevData.inputData.map((item, i) =>
          i === index
            ? {
                ...item,
                [name.split('-')[0]]: checked,
              }
            : item
        ),
      }));
    } else {
      setCombinedFormData((prevData) => ({
        ...prevData,
        inputData: prevData.inputData.map((item, i) =>
          i === index
            ? {
                ...item,
                [name.split('-')[0]]: value,
              }
            : item
        ),
      }));
    }
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const selectedType = event.target.value;

    setCombinedFormData((prevData) => ({
      ...prevData,
      inputData: prevData.inputData.map((item, i) =>
        i === index
          ? {
              ...item,
              type: selectedType,
            }
          : item
      ),
    }));
  };

  const handleNext = () => {
    if (editingIndex !== null) {
      onUpdateInputData(editingIndex, combinedFormData.inputData[0]);
    } else {
      onAddInputData(combinedFormData.inputData[0]);
    }

    // Clear the form after submission
    setCombinedFormData({
      inputData: [
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
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Input Field
      </Typography>
      <form onSubmit={handleNext}>
        {combinedFormData.inputData.map((item, index) => (
          <div key={index}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`label-${index}`}>Label:</label>
              <TextField
                name={`label-${index}`}
                fullWidth
                required
                value={item.label}
                onChange={(event) => handleInputChange(event, index)}
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
                onChange={(event) => handleInputChange(event, index)}
                margin="dense"
                size="small"
                disabled={editingIndex !== null}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`description-${index}`}>Description:</label>
              <TextField
                name={`description-${index}`}
                fullWidth
                required
                value={item.description}
                onChange={(event) => handleInputChange(event, index)}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor={`type-${index}`}>Type:</label>
              <FormControl fullWidth>
                <Select
                  name={`type-${index}`}
                  value={item.type}
                  onChange={(event) => handleSelectChange(event, index)}
                  margin="dense"
                  size="small"
                >
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="dropdown">Dropdown</MenuItem>
                  <MenuItem value="dynamic">Dynamic</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`required-${index}`}
                    checked={item.required}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                }
                label="Required"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`variables-${index}`}
                    checked={item.variables}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                }
                label="Variables"
              />
            </div>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {editingIndex !== null ? 'Update' : 'Create'}
        </Button>
      </form>
    </Paper>
  );
}

export default InputForm;
