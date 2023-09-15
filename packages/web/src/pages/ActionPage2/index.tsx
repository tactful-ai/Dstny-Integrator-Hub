import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from 'components/Container';
import ActionForm2 from 'components/ActionForm2'; 


export default function ActionPage2() {


  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Stack direction="column" gap={2}>
          {/* <ActionForm2 /> */}
         
        </Stack>
      </Container>
    </Box>
  );
}
