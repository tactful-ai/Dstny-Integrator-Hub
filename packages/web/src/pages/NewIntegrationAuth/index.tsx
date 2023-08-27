import { Box, Divider, Grid } from "@mui/material";
import Container from "components/Container";
import PageTitle from "components/PageTitle";
import useFormatMessage from "hooks/useFormatMessage";
import React from "react";

export default function NewIntegrationAuthentication():React.ReactElement {

    const formatMessage = useFormatMessage();

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
                    <PageTitle>{formatMessage('Authentication')}</PageTitle>
                </Grid>
            </Grid>
            <Divider sx={{ mt: [2, 0], mb: 2 }} />
        </Container>
    </Box>);
}