import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

interface InputTableProps {
  inputData: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    variables: boolean;
  }[];
  onDelete: (index: number) => void;
}

function InputTable({ inputData, onDelete }: InputTableProps) {


  const handleDeleteClick = (index: number) => {
    onDelete(index);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>Variables</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inputData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.required ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.variables ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button               
                variant="outlined"
              size="small"
              color="primary" 
              onClick={() => handleDeleteClick(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InputTable;
