import { Box, Divider, FormHelperText, Grid } from "@mui/material"
import AuthFirstStep from "components/AuthFirstStep"
import Container from "components/Container"
import CustomAccordion from "components/CustomAccordion"
import PageTitle from "components/PageTitle"
import TagNumber from "components/TagNumber"
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

function NewIntegrationAuthAPIKey() {

    const [fields, setFields] = useState<field[]>([]);


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

                <CustomAccordion tag={<TagNumber text="Step 2"/>} heading="Configure a Test Request">

                    <WrappingBox>
                        Add a simple API endpoint to test user credentials. Also provide the required headers for this endpoint.
                    </WrappingBox>
                </CustomAccordion>
            </Container>
        </Box>
  )
}

export default NewIntegrationAuthAPIKey