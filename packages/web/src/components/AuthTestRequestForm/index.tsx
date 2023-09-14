
import { AuthStepsProps } from "@automatisch/types";
import { Button, Grid, TextField, Typography } from "@mui/material";
import WrappingBox from "components/WrappingBox";
import { useFieldArray } from "react-hook-form";



function AuthTestRequesForm({control, register}: AuthStepsProps) {

    const { fields, append, remove } = useFieldArray({ name: 'headers', control });

    return (
        <>
            <div className='wrapping-box'>
                <Grid rowGap={2} container direction="column">
                    <Grid item container direction="row" columnGap={0.5} rowGap={2}>
                        <Grid xs={1}>
                            <TextField disabled name="method" type="text" value="GET" />
                        </Grid>
                        <Grid flexGrow={1}>
                            <TextField fullWidth type="text" label="endpoint" placeholder="ex:https://www.example.com" {...register('endpoint', { required: 'endpoint is required' })} />
                        </Grid>
                    </Grid>
                    <Grid> <Typography variant="h5">Headers</Typography> </Grid>

                    {fields.map((header, index) =>
                        <Grid key={header.id} item container direction="row" gap={1}>
                            <Grid flexGrow={1}>
                                <TextField fullWidth type="text" label="Key" {...register(`headers.${index}.key` as const, { required: 'Header key is required' })} />
                            </Grid>

                            <Grid flexGrow={1}>
                                <TextField fullWidth label="Value" type="text"  {...register(`headers.${index}.value` as const, { required: 'Header value is required' })} />
                            </Grid>

                            <Grid xs={0.75}>
                                <Button onClick={() => remove(index)} color="error" variant="contained">x</Button>
                            </Grid>
                        </Grid>)
                    }

                    <Grid>
                        <Button onClick={() => append({ key: "", value: "" })} variant="outlined">Add</Button>
                    </Grid>
                </Grid>
            </div>

            <Button variant="contained" type="submit">Save & Continue</Button>
        </>
    )
}

export default AuthTestRequesForm