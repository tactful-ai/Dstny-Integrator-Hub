import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from 'components/Container';
import OverviewComponent from 'components/overviewForm';


export default function overviewpage(){
  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Stack direction="column" gap={2}>
          <OverviewComponent />

        </Stack>
      </Container>
    </Box>
  );
}
