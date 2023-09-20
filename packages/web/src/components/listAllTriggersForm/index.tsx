import React from 'react';
import { Box, Typography } from '@mui/material';
import { ITrigger } from '@automatisch/types';

interface ListAllTriggersFormProps {
  triggers: ITrigger[];
}

function ListAllTriggersForm({ triggers }: ListAllTriggersFormProps) {
  return (
    <Box sx={{ mt: 3 }}>
      {triggers.map((trigger, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6">{trigger.name}</Typography>
          <Typography variant="body1">Description: {trigger.description}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default ListAllTriggersForm;
