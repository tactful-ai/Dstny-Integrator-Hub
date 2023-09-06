import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material'
import Container from 'components/Container'
import { AuthNewFormProps } from '@automatisch/types';



function AuthNewForm({  handleClose, removeField,  formUtilities }: AuthNewFormProps) {

    const currIndex = formUtilities.authFields.length - 1;
    console.log(formUtilities.authFields);
    
    return (
        <Box sx={{ py: 4 }}>
            <Container>
                <Divider sx={{ mt: [2, 0], mb: 2 }} />
                    <TextField
                        fullWidth
                        label={<span>Label <span style={{ color: 'red' }}>*</span></span>}
                        helperText="Enter the field's friendly name for users."
                        sx={{ my: '0.5rem' }}
                        
                        {...formUtilities.register('label', { required: 'The label is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        fullWidth
                        label={<span>Key <span style={{ color: 'red' }}>*</span></span>}
                        helperText={<span>Add the field key, for example: <code style={{ border: '1px solid #eee', padding: '2px' }}>api_key</code></span>}
                        {...formUtilities.register('key', { required: 'The key is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        select
                        fullWidth
                        defaultValue="string"
                        helperText="Select the field type. Use String (default) for most text input, or Password to obscure text for secret values."
                        {...formUtilities.register('type')}

                    >
                        {['string', 'password'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>


                    <TextField
                        sx={{ my: '0.5rem' }}
                        label="Description"
                        fullWidth
                        maxRows={6}
                        multiline
                        {...formUtilities.register('description')}

                    />

                    <FormGroup>
                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register('required')} />}
                            label="Is this field required? check if yes"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register('canCopy')} />}
                            label="Do you allow to copy this field? check if yes"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register('readOnly')} />}
                            label="Is this field read-only? check if yes"
                        />
                    </FormGroup>
                    <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem' }}>
                        <Button onClick={handleClose} type="submit" size="small" variant="contained" >Add</Button>
                        <Button onClick={() => {removeField(currIndex); handleClose()}} type="button" size="small" variant="outlined">Cancel</Button>
                    </Box>
            </Container>
        </Box>
    )
}

export default AuthNewForm