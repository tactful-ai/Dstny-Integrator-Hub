import React from 'react';
import InputTable from '../inputTable'; 
import Button from '@mui/material/Button';

interface InputTableFormProps {
  inputData: {
    label: string;
    key: string;
    description: string;
    type: string;
    required: boolean;
    variables: boolean;
  }[];
  onNext: () => void;
  onAddAnotherField: () => void;
  onDelete: (index: number) => void; 
}

function InputTableForm({ inputData, onNext, onAddAnotherField, onDelete }: InputTableFormProps) {
  return (
    <div>
      <div>
        <h2>Input Fields Table</h2>
        <InputTable inputData={inputData} onDelete={onDelete} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="button" variant="contained" sx={{ mt: 2, order: 1 }} onClick={onAddAnotherField}>
          Add Another Field
        </Button>
        <Button type="button" variant="contained" color="primary" sx={{ mt: 2, order: 2 }} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default InputTableForm;
