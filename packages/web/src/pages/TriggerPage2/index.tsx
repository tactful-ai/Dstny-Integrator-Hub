import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from 'components/Container';
import TriggerForm2 from 'components/TriggerForm2'; // Import the IntegrationForm component


export default function TriggerPage() {


  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Stack direction="column" gap={2}>
          <TriggerForm2 />
         
        </Stack>
      </Container>
    </Box>
  );
}
