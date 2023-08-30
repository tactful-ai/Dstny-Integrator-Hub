import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, FormHelperText, MenuItem } from '@mui/material'
import Container from 'components/Container'
import Form from 'components/Form'
import PageTitle from 'components/PageTitle'
import TextField from 'components/TextField'

function NewAuthField() {
  return (
    <Box sx={{py: 4}}>
        <Container>
            <PageTitle>New Field</PageTitle>
            <Divider sx={{ mt: [2, 0], mb: 2 }} />
            <Form>
                    <TextField 
                        fullWidth
                        required
                        name='label' 
                        label={<span>Label <span style={{color: 'red'}}>*</span></span>} 
                        helperText="Enter the field's friendly name for users." 
                        sx={{my: '0.5rem'}}
                    />
                    <TextField 
                        sx={{my: '0.5rem'}}
                        fullWidth
                        required
                        name='key' 
                        label={<span>Key <span style={{color: 'red'}}>*</span></span>} 
                        helperText={<span>Add the field key, for example: <code style={{border: '1px solid #eee', padding: '2px'}}>api_key</code></span>} 
                    />


                    <TextField 
                        sx={{my: '0.5rem'}}

                        name='type' 
                        select 
                        fullWidth
                        label="Type" 
                        defaultValue="string"
                        helperText="Select the field type. Use String (default) for most text input, or Password to obscure text for secret values."
                    >
                        {['string', 'password'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>


                    <TextField                 
                        sx={{my: '0.5rem'}}
                        name='description' 
                        label="Description"
                        fullWidth
                        maxRows={6}
                        multiline
                    />

                    <FormGroup>
                        <FormControlLabel                 
                            sx={{my: '0.5rem'}}
                            control={<Checkbox name='is-required'/>} 
                            label="Is this field required? check if yes"
                        />

                        <FormControlLabel                 
                            sx={{my: '0.5rem'}}
                            control={<Checkbox name='can-copy'/>} 
                            label="Do you allow to copy this field? check if yes"
                        />

                        <FormControlLabel                 
                            sx={{my: '0.5rem'}}
                            control={<Checkbox name='read-only'/>} 
                            label="Is this field read-only? check if yes"
                        />
                    </FormGroup>

                    <Box sx={{mt: '1rem', display: 'flex', gap: '1rem'}}>
                        <Button type="submit" size="small" variant="contained" onClick={() => {console.log('submit')}}>Add</Button>
                        <Button type="button" size="small" variant="outlined">Cancel</Button>
                    </Box>
            </Form>
        </Container>
    </Box>
  )
}

export default NewAuthField