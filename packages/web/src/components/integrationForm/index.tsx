import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as URLS from 'config/urls';
import config from 'config/app';
import { useLocation, useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress'; 




function IntegrationForm() {
  const navigate = useNavigate();
  const [integrationData, setIntegrationData] = useState({
    name: '',
    Key: '',
    logo: null as File | null, 
    BaseUrl: '',
    homePageUrl: '',
    SupportsConnections: true,
  });
  const [touchedFields, setTouchedFields] = useState({
    homePageUrl: false,
    BaseUrl: false,
  });
  const [isLoading, setIsLoading] = useState(false);


  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'logo') {
      return;
    }


    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));

    setIntegrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const isUrlValid = (url: string) => {
    return /^(http:\/\/|https:\/\/)(www\.)?[a-z0-9]+(\.[a-z0-9]+)+(:[0-9]+)?(\/.*)?$/i.test(url);
  };
  
  
  
  const handleInputChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const selectedFile = files?.[0];
  
    if (selectedFile) {
      if (selectedFile.type === 'image/svg+xml') {
        setIntegrationData((prevData) => ({
          ...prevData,
          [name]: selectedFile,
        }));
      } else {
        alert('Please select an SVG file.');
      }
    }
  };
  


  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    const parsedValue = value === 'true';

    setIntegrationData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (!isUrlValid(integrationData.BaseUrl) || !isUrlValid(integrationData.homePageUrl)) {
      return;
    }
  
    const mainkey = integrationData.Key;
  
    const formData = new FormData();
  
    const formattedIntegrationData = {
      name: integrationData.name,
      key: integrationData.Key,
      supportsConnections: integrationData.SupportsConnections.toString(),
      baseUrl: integrationData.BaseUrl,
      apiBaseUrl: integrationData.homePageUrl,
    };
  
    for (const key of Object.keys(formattedIntegrationData)) {
      const value = formattedIntegrationData[key as keyof typeof formattedIntegrationData];
      formData.append(key, value);
    }
  
    if (integrationData.logo) {
      formData.append('logo', integrationData.logo);
    }
  
    const headers = new Headers();
  
    try {
      const response = await fetch(`${config.apiUrl}/integrations/create`, {
        method: 'POST',
        headers: headers,
        body: formData as unknown as BodyInit,
      });
  
      if (response.ok) {
        console.log('Integration data sent successfully!');
        if (mainkey !== null && mainkey !== undefined) {
          window.location.href = `${URLS.TRIGGER_PAGE}?mainkey=${mainkey}`;
          setIsLoading(false);
        } else {
          console.error('mainkey is null or undefined');
          setIsLoading(false);
        }
      } else {
        console.error('Failed to send integration data to the backend.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false);
    }
  };
  
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create Integration </Typography>
      <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <TextField
            name="name"
            fullWidth
            required
            value={integrationData.name}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="Key">Key:</label>
          <TextField
            name="Key"
            fullWidth
            multiline
            required
            value={integrationData.Key}
            onChange={handleInputChange}
            margin="dense"
            size ="small"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="logo">Logo (has to be a SVG file):</label>
          <div style={{ marginTop: '8px' , marginBottom: '8px'}}>
             <input
               type="file"
               id="logo"
               name="logo"
               accept=".svg"
               required
               onChange={handleInputChangeLogo}
               style={{ display: 'block' }}
             />

          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="homePageUrl">Home Page URL:</label>
          <TextField
            name="homePageUrl"
            fullWidth
            required
            value={integrationData.homePageUrl}
            onChange={handleInputChange}
            onBlur={() => {
              setTouchedFields((prevTouchedFields) => ({
                ...prevTouchedFields,
                homePageUrl: true,
              }));
            }}
            margin="dense"
            size="small"
            error={touchedFields.homePageUrl && !isUrlValid(integrationData.homePageUrl)}
            helperText={
              touchedFields.homePageUrl && !isUrlValid(integrationData.homePageUrl)
                ? 'Invalid URL. Please enter a valid URL.'
                : ''
            }
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="BaseUrl">Base URL:</label>
          <TextField
            name="BaseUrl"
            fullWidth
            required
            value={integrationData.BaseUrl}
            onChange={handleInputChange}
            onBlur={() => {
              setTouchedFields((prevTouchedFields) => ({
                ...prevTouchedFields,
                BaseUrl : true,
              }));
            }}
            margin="dense"
            size="small"
            error={touchedFields.BaseUrl && !isUrlValid(integrationData.BaseUrl)}
            helperText={
              touchedFields.BaseUrl && !isUrlValid(integrationData.BaseUrl)
                ? 'Invalid URL. Please enter a valid URL.'
                : ''
            }
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="SupportsConnections">Supports Connections:</label>
          <FormControl fullWidth>
            <Select
              name="SupportsConnections"
              value={integrationData.SupportsConnections.toString()} 
              onChange={handleSelectChange}
              margin="dense"
              size="small"
            >
              <MenuItem value="false">False</MenuItem>
              <MenuItem value="true">True</MenuItem>
            </Select>
          </FormControl>
        </div>

        
        <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      disabled={isLoading || (!isUrlValid(integrationData.BaseUrl)) || (!isUrlValid(integrationData.homePageUrl)) || (integrationData.logo === null)}
      onClick={handleSubmit}
      loading={isLoading}
      loadingIndicator={<CircularProgress size={24} />} 
    >
      Create
    </LoadingButton>
      </form>
    </Paper>
  );
}


export default IntegrationForm;
