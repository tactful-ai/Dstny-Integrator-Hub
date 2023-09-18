import { useQuery } from "@apollo/client"
import { IApp } from "@automatisch/types"
import { AddIcCallOutlined } from "@mui/icons-material"
import { Box, CircularProgress, Divider, Grid } from "@mui/material"
import AppRow from "components/AppRow"
import Can from "components/Can"
import ConditionalIconButton from "components/ConditionalIconButton"
import Container from "components/Container"
import NoResultFound from "components/NoResultFound"
import PageTitle from "components/PageTitle"
import SearchInput from "components/SearchInput"
import { GET_CONNECTED_APPS } from "graphql/queries/get-connected-apps"
import { Link, useNavigate } from "react-router-dom"
import * as URLS from 'config/urls';
import React from "react"
import { GET_INTEGRATIONS } from "graphql/queries/get-integrations"

function MyIntegrations() {

  const navigate = useNavigate();
  const [appName, setAppName] = React.useState(null);
  const { data, loading } = useQuery(GET_INTEGRATIONS, {
    variables: { name: appName },
  });

  const apps: IApp[] = data?.getConnectedApps;
  const hasApps = apps?.length;

  const onSearchChange = React.useCallback((event) => {
    setAppName(event.target.value);
  }, []);

  const goToApps = React.useCallback(() => {
    navigate(URLS.APPS);
  }, [navigate]);

  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Grid container sx={{ mb: [0, 3] }} columnSpacing={1.5} rowSpacing={3}>
          <Grid container item xs sm alignItems="center" order={{ xs: 0 }}>
            <PageTitle>Integrations</PageTitle>
          </Grid>

          <Grid item xs={12} sm="auto" order={{ xs: 2, sm: 1 }}>
            <SearchInput onChange={onSearchChange} />
          </Grid>

          <Grid
            container
            item
            xs="auto"
            sm="auto"
            alignItems="center"
            order={{ xs: 1, sm: 2 }}
          >
            <Can I="create" a="Connection" passThrough>
              {(allowed) => (
                <ConditionalIconButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to={URLS.INTEGRATION_PAGE}
                  fullWidth
                  disabled={!allowed}
                  icon={<AddIcCallOutlined />}
                  data-test="add-integration-button"
                >
                {`Add Integrations`}
                </ConditionalIconButton>
              )}
            </Can>
          </Grid>
        </Grid>

        <Divider sx={{ mt: [2, 0], mb: 2 }} />

        {false && (
          <CircularProgress
            data-test="apps-loader"
            sx={{ display: 'block', margin: '20px auto' }}
          />
        )}

        {!loading && !hasApps && (
          <NoResultFound
            text={'No integrations yet'}
            to={URLS.INTEGRATION_PAGE}
          />
        )}

        {!loading &&
          apps?.map((app: IApp) => <AppRow key={app.name} application={app} />)}

      </Container>
    </Box>
  )
}

export default MyIntegrations