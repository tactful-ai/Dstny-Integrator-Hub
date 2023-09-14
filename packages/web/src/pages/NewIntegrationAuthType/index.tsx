import { Box, Divider, FormHelperText, Grid, Button } from "@mui/material";
import Container from "components/Container";
import PageTitle from "components/PageTitle";
import * as URLS from 'config/urls';
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function NewIntegrationAuthentication(): React.ReactElement {

    const [authType, setAuthType] = useState<string>('');
    const navigate = useNavigate();
    function changeAuthTypeHandler(e: ChangeEvent<HTMLInputElement>) {
        console.log(authType)
        setAuthType(e.target.value);
    }

    function handleClickContinue() {
        if(authType === "api-key")
            navigate(URLS.NEW_INTEGRATION_AUTH_API_KEY);

    }

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
                        <PageTitle>Authentication</PageTitle>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: [2, 0], mb: 2 }} />

                <div className='wrapping-box'>
                    <input type="radio" id="api-key" value="api-key" name="auth-type" onChange={changeAuthTypeHandler} />
                    <label htmlFor="api-key">
                        <span> Api key </span>
                        <FormHelperText>
                            Use API Key authentication type if you simply need to collect some information from your users and then include that information, as it was entered by the user, when you make an API request. Learn more.
                        </FormHelperText>
                    </label>
                </div>
                <div className='wrapping-box'>
                    <input type="radio" id="oauth" value="oauth" name="auth-type" onChange={changeAuthTypeHandler} />
                    <label htmlFor="oauth">
                        <span> OAuth v2</span>
                        <FormHelperText>
                            Use the OAuth 2 authentication type if your API supports OAuth 2 "Authorization Code" grant. When setting up a flow, your user's browser will be redirected to your site where you can authenticate them. Your OAuth implementation will then return an access token that your Zapier integration will use to authorize requests to your API. If your API uses one of the other OAuth 2 grant types, Session auth or API Key authentication will be a better fit.
                        </FormHelperText>
                    </label>
                </div>
                <Grid>
                    <Button disabled={authType !== 'api-key'} variant="contained" onClick={handleClickContinue}>Continue</Button>
                </Grid>
            </Container>
        </Box>);
}