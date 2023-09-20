import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Divider, Grid, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { GET_APP } from 'graphql/queries/get-app';
import ListAllTriggersForm from '../../components/listAllTriggersForm';
import * as URLS from 'config/urls';
import { ITrigger } from '@automatisch/types';

type TriggerUnion = ITrigger;

function AppDetailsPage() {
  const appKey = localStorage.getItem('appKey') || '';
  const authorization_header = localStorage.getItem('automatisch.token') || '';
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    navigate(URLS.TRIGGER_TABS);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Paper sx={{ p: 3, width: '90%', padding: '24px', marginLeft: '8px' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h2">Triggers</Typography>
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Your Button
          </Button>
        </Grid>

        <Divider sx={{ mt: [2, 0], mb: 2 }} />
        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {error && <Typography variant="h6">Error: {error.message}</Typography>}
        {data && data.getApp ? (
          <Box>
            <Typography variant="h4">{data.getApp.name || 'No name available'}</Typography>
            {data.getApp.triggers ? (
              <ListAllTriggersForm triggers={data.getApp.triggers as TriggerUnion[]} />
            ) : (
              <Typography variant="body1">No triggers available for this app.</Typography>
            )}
          </Box>
        ) : (
          <Typography variant="body1">No data available for the specified key.</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default AppDetailsPage;
