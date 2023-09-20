import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { ITrigger } from '@automatisch/types';
import { Link } from 'react-router-dom'; 
import * as URLS from 'config/urls';

interface ListAllTriggersFormProps {
  triggers: ITrigger[];
}

function ListAllTriggersForm({ triggers }: ListAllTriggersFormProps) {
  return (
    <Box sx={{ mt: 3 }}>
      {triggers.map((trigger, index) => (
        <Box key={index} sx={{ mb: 2, borderBottom: '1px solid #ccc', padding: '16px' }}>
          <Typography variant="h6">{trigger.name}</Typography>
          <Typography variant="body1" marginTop={'4px'}>Description: {trigger.description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              component={Link}
              to={URLS.TRIGGER_TABS}
            >
              View Details
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ListAllTriggersForm;
