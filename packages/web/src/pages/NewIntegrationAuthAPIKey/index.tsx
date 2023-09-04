import { Box, Divider, FormHelperText, Grid } from "@mui/material"
import AuthFirstStep from "components/AuthFirstStep"
import AuthSecondStep from "components/AuthSecondStep"
import Container from "components/Container"
import PageTitle from "components/PageTitle"
import WrappingBox from "components/WrappingBox"
import { useState } from "react"

export type field = {
  key: string;
  label: string;
  type: string;
  description?:string;
  readOnly:boolean;
  required: boolean;
  canCopy: boolean;
}

export type header = {
    key:string; 
    value: string;
}

function NewIntegrationAuthAPIKey() {

    const [fields, setFields] = useState<field[]>([]);
    const [endpoint, setEndpoint] = useState<string>('');
    const [headers, setHeaders] = useState<header[]>([]);

  return (
    <Box sx={{ py: 3 }}>
            <Container>
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

                <WrappingBox>
                    <PageTitle marginBottom="1rem" fontSize="1.3rem">What is API key?</PageTitle>
                    <FormHelperText>
                        API Key Auth lets you build a form to request an API key, along with any additional fields your API requires for authentication. Zapier then passes the data users enter in those fields with every API call.
                    </FormHelperText>
                </WrappingBox>

                <AuthFirstStep fields={fields} setFields={setFields}/>

                <AuthSecondStep 
                    headers={headers}
                    setHeaders={setHeaders}
                    endpoint={endpoint}
                    setEndpoint={setEndpoint} 
                />
            </Container>
        </Box>
  )
}

export default NewIntegrationAuthAPIKey