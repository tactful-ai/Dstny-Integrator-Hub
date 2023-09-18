import React from 'react';
import InputTable from '../inputTable';
import Button from '@mui/material/Button';

interface InputTableFormProps {
  inputActionData: {
    label: string;
    key: string;
    description: string;
    type: string;
    required: boolean;
    variables: boolean;
  }[];
  onNext: () => void;
  onAddAnotherField: () => void; 
}

function InputTableForm({ inputActionData, onNext, onAddAnotherField }: InputTableFormProps) {

  return (
    <div>
      <h2>Input Fields Table</h2>
      <InputTable inputActionData={inputActionData} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={onNext}>
        Continue
      </Button>
      <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={onAddAnotherField}>
        Add Another Field
      </Button>
    </div>
  );
}

export default InputTableForm;
