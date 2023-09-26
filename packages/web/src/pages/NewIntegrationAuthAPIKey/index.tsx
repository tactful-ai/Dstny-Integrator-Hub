import { field } from "@automatisch/types"
import { Box, Button, Divider, FormHelperText, Grid } from "@mui/material"
import AuthFirstStep from "components/AuthFirstStep"
import AuthSecondStep from "components/AuthSecondStep"
import Container from "components/Container"
import PageTitle from "components/PageTitle"
import createIntegrationAuth from "helpers/createIntegrationAuth"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as URLS from 'config/urls';



export type header = {
    key: string;
    value: string;
}

export type NewIntegrationAuthAPIKeyFormValues = {
    endpoint: string;
    headers: header[];
    fields: field[];
}

function NewIntegrationAuthAPIKey() {



    const form = useForm<NewIntegrationAuthAPIKeyFormValues>({
        defaultValues: {
            endpoint: '',
            headers: [],
            fields: []
        }
    });

    const navigate = useNavigate();
    const { appKey } = useParams();

    const { register, control, handleSubmit, watch, getValues, formState } = form;
    const { errors } = formState;

    async function onSubmit(data: NewIntegrationAuthAPIKeyFormValues) {
        const submittedHeaders: Record<string, string> = {};
        data.headers.forEach((header) => {
            submittedHeaders[header.key] = header.value;
        });

        const response = await createIntegrationAuth({ fields: data.fields, endpoint: data.endpoint, headers: submittedHeaders, appKey });

        if (response)
            navigate(URLS.NEW_INTEGRATION_CREATE_TRIGGERS_PAGE(appKey));


    }

    return (
        <Box sx={{ py: 3 }}>
            <Container>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container sx={{ mb: [0, 3] }} columnSpacing={1.5} rowSpacing={3}>
                        <Grid
                            container
                            item
                            xs
                            sm
                            alignItems="center"
                            order={{ xs: 0, height: 80 }}
                        >
                            <PageTitle>API Key</PageTitle>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: [2, 0], mb: 2 }} />

                    <div className='wrapping-box'>
                        <PageTitle marginBottom="1rem" fontSize="1.3rem">What is API key?</PageTitle>
                        <FormHelperText>
                            API Key Auth lets you build a form to request an API key, along with any additional fields your API requires for authentication. Zapier then passes the data users enter in those fields with every API call.
                        </FormHelperText>
                    </div>

                    <AuthFirstStep watch={watch} getValues={getValues} control={control} register={register} errors={errors} />

                    <AuthSecondStep control={control} getValues={getValues} register={register} watch={watch} errors={errors} />

                    <Grid container item flexDirection="row-reverse">
                        <Button type="submit" variant="contained" >Submit</Button>
                    </Grid>
                </form>
            </Container>
        </Box>
    )
}

export default NewIntegrationAuthAPIKey