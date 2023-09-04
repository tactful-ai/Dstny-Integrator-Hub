
import { Button, Grid, TextField, Typography } from "@mui/material";
import WrappingBox from "components/WrappingBox";
import { remove } from "lodash";
import type { header } from "pages/NewIntegrationAuthAPIKey"
import { useFieldArray, useForm } from "react-hook-form";

type AuthTestRequesFormProps = {
    setEndPoint: (value: string) => void;
    setHeaders: (value: header[] | ((prevValue: header[]) => header[])) => void;
}

type AuthTestRequesFormValues = {
    endpoint: string;
    headers: {
        key: string;
        value: string;
    }[]
}

function AuthTestRequesForm({ setEndPoint, setHeaders }: AuthTestRequesFormProps) {

    const form = useForm<AuthTestRequesFormValues>({
        defaultValues: {
            endpoint: '',
            headers: []
        }
    });

    const { register, control, handleSubmit } = form;

    const { fields, append, remove } = useFieldArray({ name: 'headers', control });

    function onSubmit(values: AuthTestRequesFormValues) {
        console.log(values)
    }
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <WrappingBox>
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
                        <Button onClick={() => append({ key: "", value: "" })} variant="contained">Add</Button>
                    </Grid>
                </Grid>
            </WrappingBox>

            <Button variant="contained" type="submit">Save & Continue</Button>
        </form>
    )
}

export default AuthTestRequesForm