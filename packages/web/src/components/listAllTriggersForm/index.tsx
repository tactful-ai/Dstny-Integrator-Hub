import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { ITrigger } from '@automatisch/types';
import { Link, useParams } from 'react-router-dom'; 
import * as URLS from 'config/urls';
import { useNavigate } from 'react-router-dom'; 

interface ListAllTriggersFormProps {
  triggers: ITrigger[];
}

function ListAllTriggersForm({ triggers }: ListAllTriggersFormProps) {

  const navigate = useNavigate();
  const {appKey} = useParams();
  const handleViewDetails = (key: string) => {
    navigate(URLS.NEW_INTEGRATION_CREATE_TRIGGERS_PAGE(appKey), { state: {key} });
  };

 return (
    <Box sx={{ mt: 3 }}>
      {triggers.map((trigger, index) => (
        <Box key={index} sx={{ mb: 1, borderBottom: '1px solid #ccc', padding: '16px' }}>
          <Typography variant="h6">{trigger.name}</Typography>
          <Typography variant="body1" marginTop={'4px'}>Description: {trigger.description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleViewDetails(trigger.key)}
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
