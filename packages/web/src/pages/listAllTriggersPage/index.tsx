import Paper from '@mui/material/Paper';
import ListAllTriggersForm from '../../components/listAllTriggersForm'; // Adjust the import path
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_APP } from "graphql/queries/get-app"; // Adjust the import path

function AppDetailsPage() {
  const appKey = localStorage.getItem('appKey') || '';

  const [loading, setLoading] = useState(false);
  const [getApp, { data, error }] = useLazyQuery(GET_APP, {
    variables: {
      key: appKey,
    },
    onCompleted: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    getApp();
  }, [appKey, getApp]);

  return (
    <div>
      <Paper square>
        <h1>App Details</h1>
        {loading && <p>Loading app data...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.getApp ? (
          <div>
            <h2>{data.getApp.name}</h2>
            {data.getApp.triggers ? (
              <ListAllTriggersForm triggers={data.getApp.triggers} />
            ) : (
              <p>No triggers available for this app.</p>
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
