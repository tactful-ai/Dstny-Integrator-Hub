import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material'
import Container from 'components/Container'
import Form from 'components/Form'
import { FieldValues, useForm } from 'react-hook-form'
import type { field } from 'pages/NewIntegrationAuthAPIKey'
import type { AuthFirstStepProps } from 'components/AuthFirstStep'

type AuthNewFormProps = {
    fieldsState:AuthFirstStepProps;
    handleClose:() => void;
}

function AuthNewForm({ fieldsState, handleClose  }: AuthNewFormProps) {

    const form = useForm<field>();
    const { register, getValues } = form;


    function handleSubmit(values: FieldValues) {
        fieldsState.setFields(prevValues => [...prevValues, getValues()]);
        handleClose();
    }
    return (
        <Box sx={{ py: 4 }}>
            <Container>
                <Divider sx={{ mt: [2, 0], mb: 2 }} />
                <Form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={<span>Label <span style={{ color: 'red' }}>*</span></span>}
                        helperText="Enter the field's friendly name for users."
                        sx={{ my: '0.5rem' }}
                        {...register('label', { required: 'The label is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        fullWidth
                        label={<span>Key <span style={{ color: 'red' }}>*</span></span>}
                        helperText={<span>Add the field key, for example: <code style={{ border: '1px solid #eee', padding: '2px' }}>api_key</code></span>}
                        {...register('key', { required: 'The key is required' })}
                    />

                    <TextField
                        sx={{ my: '0.5rem' }}
                        select
                        fullWidth
                        defaultValue="string"
                        helperText="Select the field type. Use String (default) for most text input, or Password to obscure text for secret values."
                        {...register('type')}

                    >
                        {['string', 'password'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>


                    <TextField
                        sx={{ my: '0.5rem' }}
                        label="Description"
                        fullWidth
                        maxRows={6}
                        multiline
                        {...register('description')}

                    />

                    <FormGroup>
                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...register('required')} />}
                            label="Is this field required? check if yes"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...register('canCopy')} />}
                            label="Do you allow to copy this field? check if yes"
                        />

                        <FormControlLabel
                            sx={{ my: '0.5rem' }}
                            control={<Checkbox {...register('readOnly')} />}
                            label="Is this field read-only? check if yes"
                        />
                    </FormGroup>
                    <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem' }}>
                        <Button type="submit" size="small" variant="contained" >Add</Button>
                        <Button onClick={handleClose} type="button" size="small" variant="outlined">Cancel</Button>
                    </Box>
                </Form>
            </Container>
        </Box>
    )
}

export default AuthNewForm