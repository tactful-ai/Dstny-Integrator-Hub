import { Box, Divider, FormHelperText, Grid, Typography, Button } from "@mui/material"
import AuthTableFields from "components/AuthFieldsTable"
import Container from "components/Container"
import CustomAccordion from "components/CustomAccordion"
import PageTitle from "components/PageTitle"
import TagNumber from "components/TagNumber"
import WrappingBox from "components/WrappingBox"

function NewIntegrationAuthAPIKey() {
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

                <CustomAccordion tag={<TagNumber text="Step 1"/>} heading="Configure your fields">
                    <WrappingBox>
                        <Typography sx={{fontSize: '1rem', display: 'inline-block'}} >Authentication Fields <Typography sx={{fontSize: '10px', color: 'red', fontWeight: '600', display: 'inline-block'}}>{'(required)'}</Typography></Typography>

                        <FormHelperText focused>
                            <Typography sx={{fontSize: '0.8rem'}}>
                                Build a form with fields for each item your API requires for authentication, including a field for your API key and additional field for any other data needed. Zapier does not include any fields by default. 
                            </Typography> <br /> 

                            <Typography sx={{fontWeight: '600', fontSize: '0.9rem'}}>
                                You must define at least one field where your users can enter API credentials. Your authentication configuration is not complete
                            </Typography>
                        </FormHelperText>
                    </WrappingBox>

                    <AuthTableFields rows={[]}/>

                    <Box sx={{mt: '1rem', display: 'flex', gap: '1rem'}}>
                        <Button type="button" size="small" variant="outlined">Add Fields</Button>
                        <Button type="button" size="small" variant="contained">Continue</Button>
                    </Box>

                </CustomAccordion>

            </Container>
        </Box>
  )
}

export default NewIntegrationAuthAPIKey