import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, CircularProgress, Divider, Grid, Typography, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { GET_APP } from 'graphql/queries/get-app';
import ListAllActionsForm from '../../components/listAllActionsForm';
import * as URLS from 'config/urls';
import { IAction } from '@automatisch/types';
import Can from 'components/Can';
import NoResultFound from 'components/NoResultFound';
import ConditionalIconButton from 'components/ConditionalIconButton';
import PageTitle from 'components/PageTitle';
import useFormatMessage from 'hooks/useFormatMessage';

function AppDetailsPage() {
  const { appKey } = useParams();
  const authorization_header = localStorage.getItem('automatisch.token') || '';
  const formatMessage = useFormatMessage();

  const [loading, setLoading] = useState(false);
  const [getApp, { data, error }] = useLazyQuery(GET_APP, {
    context: {
      headers: {
        Authorization: `${authorization_header}`,
      },
    },
    onCompleted: () => {
      setLoading(false);
    },

  });

  useEffect(() => {
    setLoading(true);
    getApp({
      variables: {
        key: appKey,
      },
    });
  }, [appKey, getApp]);

  return (
    <Box sx={{ py: 3 }}>
      <Paper sx={{ p: 3, width: '95%', padding: '24px', marginLeft: '8px' }}>
        <Grid container sx={{ mb: [0, 3] }} columnSpacing={1.5} rowSpacing={3}>
          <Grid container item xs sm alignItems="center" order={{ xs: 0 }}>
            <PageTitle>{formatMessage('Actions')}</PageTitle>
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
                  to={URLS.NEW_INTEGRATION_CREATE_ACTIONS_PAGE(appKey)}
                  fullWidth
                  disabled={!allowed}
                >
                  {formatMessage('Add Action')}
                </ConditionalIconButton>
              )}
            </Can>
          </Grid>
        </Grid>

        <Divider sx={{ mt: [2, 0], mb: 2 }} />
        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {error && <Typography variant="h6">Error: {error.message}</Typography>}
        {data && data.getApp ? (
          <Box>
            {data.getApp.actions ? (
              <ListAllActionsForm actions={data.getApp.actions as IAction[]} />
            ) : (
              <NoResultFound
                text={'No Actions Yet'}
                to={URLS.NEW_INTEGRATION_CREATE_ACTIONS_PAGE(appKey)}
              />
            )}
          </Box>
        ) : (
          <Typography> </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={URLS.NEW_INTEGRATION_OVERVIEW_PAGE(appKey)}
          sx={{ mt: 2 }}
        >
          Back To Overview
        </Button>
      </Paper>
    </Box>
  );
}

export default AppDetailsPage;
