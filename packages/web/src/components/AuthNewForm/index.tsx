import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material'
import Container from 'components/Container'
import { AuthNewFormProps } from '@automatisch/types';



function AuthNewForm({  handleClose, removeField,  formUtilities }: AuthNewFormProps) {

    const lastIndex = formUtilities.getValues().fields.length - 1;
    function handleAdd() {
        handleClose();
    }

    function handleCancel() {
        removeField(lastIndex);
        handleClose()
    }
    
    return (
        <Box sx={{ py: 2 }}>
            <Container>
                <Divider sx={{ mt: [2, 0], mb: 1 }} />
                    <TextField
                        fullWidth
                        label={<span>Label <span style={{ color: 'red' }}>*</span></span>}
                        helperText="Enter the field's friendly name for users."
                        sx={{ my: '0.5rem' }}
                        
                        {...formUtilities.register(`fields.${lastIndex}.label`, { required: 'The label is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        fullWidth
                        label={<span>Key <span style={{ color: 'red' }}>*</span></span>}
                        helperText={<span>Add the field key, for example: <code style={{ border: '1px solid #eee', padding: '2px' }}>api_key</code></span>}
                        {...formUtilities.register(`fields.${lastIndex}.key`, { required: 'The key is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        select
                        fullWidth
                        defaultValue="string"
                        helperText="Select the field type. Use String (default) for most text input, or Password to obscure text for secret values."
                        {...formUtilities.register(`fields.${lastIndex}.type`)}

                    >
                        {['string', 'password'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>


                    <TextField
                        sx={{ my: '0.5rem' }}
                        label="Description"
                        fullWidth
                        maxRows={6}
                        multiline
                        {...formUtilities.register(`fields.${lastIndex}.description`)}

                    />

                    <FormGroup sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register(`fields.${lastIndex}.required`)} />}
                            label="Required"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register(`fields.${lastIndex}.canCopy`)} />}
                            label="Allow to copy"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...formUtilities.register(`fields.${lastIndex}.readOnly`)} />}
                            label="Read only"
                        />
                    </FormGroup>
                    <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem', flexDirection: 'row-reverse' }}>
                        <Button onClick={handleAdd} type="submit" size="small" variant="contained" >Add</Button>
                        <Button onClick={handleCancel} type="button" size="small" variant="outlined">Cancel</Button>
                    </Box>
            </Container>
        </Box>
    )
}

export default AuthNewForm