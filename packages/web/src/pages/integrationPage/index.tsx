import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from 'components/Container';
import IntegrationForm from 'components/integrationForm'; // Import the IntegrationForm component


export default function IntegrationPage() {


  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Stack direction="column" gap={2}>
          <IntegrationForm />
         
        </Stack>
      </Container>
    </Box>
  );
}
