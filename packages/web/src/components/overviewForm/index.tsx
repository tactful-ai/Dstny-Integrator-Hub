
import { useLocation, useParams, Location, useNavigate } from 'react-router-dom';
import * as URLS from 'config/urls';
import Box from '@mui/material/Box';
import PageTitle from 'components/PageTitle';
import { Divider, Grid } from '@mui/material';
import Container from 'components/Container';


type RoutingState = {
  overlaidLocation?: Location
  newIntegration?: boolean
} | null





function OverviewForm() {


  const { appKey } = useParams();
  const location = useLocation();
  const locationState = location.state as RoutingState;
  const navigate = useNavigate();

  function handleClickAuth() {
    navigate(URLS.NEW_INTEGRATION_AUTH_API_KEY_PAGE(appKey));
  }

  function handleClickTriggers() {
    navigate(URLS.NEW_INTEGRATION_LIST_TRIGGERS_PAGE(appKey));
  }

  function handleClickActions() {
    navigate(URLS.NEW_INTEGRATION_LIST_TRIGGERS_PAGE(appKey));
  }

  return (


    <Box sx={{ py: 3 }}>
      <Container>
        <Grid container sx={{ mb: [0, 3] }} columnSpacing={1.5} rowSpacing={3}>
          <Grid
            container
            item
            alignItems="center"
            order={{ xs: 0, height: 80 }}
          >
            <PageTitle>Overview</PageTitle>
          </Grid>
        </Grid>
        <Divider sx={{ mt: [2, 0], mb: 2 }} />

        {locationState?.newIntegration && (<div onClick={handleClickAuth} className='overview-box' role='link'>
          <PageTitle marginBottom="1rem" fontSize="1.3rem">Authentication</PageTitle>
          <div className='overview-text'>
            Tell us how to authenticate users with your API
          </div>
        </div>)}

        <div onClick={handleClickTriggers} className='overview-box' role='link'>
          <PageTitle marginBottom="1rem" fontSize="1.3rem">Triggers</PageTitle>
          <div className='overview-text'>
            Help users find new data when it's available in your app
          </div>
        </div>

        <div onClick={handleClickActions} className='overview-box' role='link'>
          <PageTitle marginBottom="1rem" fontSize="1.3rem">Actions</PageTitle>
          <div className='overview-text'>
            Help users write data back to your integration
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default OverviewForm;
