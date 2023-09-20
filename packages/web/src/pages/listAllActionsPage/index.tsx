import Paper from '@mui/material/Paper';
import ListAllActionsForm from '../../components/listAllActionsForm';
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_APP } from "graphql/queries/get-app"; 

function AppDetailsPage() {
  const appKey = localStorage.getItem('appKey') || '';
  const authorization_header = localStorage.getItem('automatisch.token') || '';

  const [loading, setLoading] = useState(false);
  const [getApp, { data, error }] = useLazyQuery(GET_APP, {
    context: {
      headers: {
        'Authorization' : `${authorization_header}`
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
    <div>
    <Paper sx={{ p: 3, width: '100%' , padding:'24px' }}>
        <h1>App Details</h1>
        {loading && <p>Loading app data...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.getApp ? (
  <div>
    <h2>{data.getApp.name || "No name available"}</h2>
    {data.getApp.actions ? (
      <ListAllActionsForm actions={data.getApp.actions} />
    ) : (
      <p>No actions available for this app.</p>
    )}
  </div>
) : (
  <p>No data available for the specified key.</p>
)}

      </Paper>
    </div>
  );
}

export default AppDetailsPage;
