import { Box } from '@mui/material';

type TagNumberProps = {
    text: string;
}

function TagNumber({text}:TagNumberProps) {
  return (
    <Box sx={{width: '10%', mr: '1rem', borderRadius: '100px', backgroundColor:'#001F52', color: '#fff', textAlign: 'center', p: 1, fontSize: '14px', fontWeight: '500'}}>{text}</Box>
  )
}

export default TagNumber;