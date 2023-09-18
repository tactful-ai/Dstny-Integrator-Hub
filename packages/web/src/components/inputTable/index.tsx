import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface InputTableProps {
  inputActionData: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    variables: boolean;
  }[];
}

function InputTable({ inputActionData }: InputTableProps) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {inputActionData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.required ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.variables ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InputTable;
