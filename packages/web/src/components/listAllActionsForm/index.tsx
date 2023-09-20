import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { IAction } from '@automatisch/types';
import { Link } from 'react-router-dom'; 
import * as URLS from 'config/urls';

interface ListAllActionsFormProps {
  actions: IAction[];
}

function ListAllActionsForm({ actions }: ListAllActionsFormProps) {
  return (
    <Box sx={{ mt: 3 }}>
      {actions.map((action, index) => (
        <Box key={index} sx={{ mb: 1, borderBottom: '1px solid #ccc', padding: '16px' }}>
          <Typography variant="h6">{action.name}</Typography>
          <Typography variant="body1" marginTop={'4px'}>Description: {action.description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              component={Link}
              to={URLS.ACTION_TABS}
            >
              View Details
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ListAllActionsForm;
