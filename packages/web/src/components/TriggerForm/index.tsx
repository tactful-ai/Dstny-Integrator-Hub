
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import * as URLS from 'config/urls';

function IntegrationForm() {

 

  const paperStyle = {
     width: '500px', // Adjust the width as needed
     padding: '20px', // Add padding as needed
   };
  

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>Triggers</Typography>
     
    </Paper>
  );
}

export default IntegrationForm;
