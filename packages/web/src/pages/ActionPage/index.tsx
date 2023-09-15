import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from 'components/Container';
import ActionForm from 'components/ActionForm'; 


export default function ActionPage() {


  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Stack direction="column" gap={2}>
          {/* <ActionForm />
          */}
        </Stack>
      </Container>
    </Box>
  );
}
