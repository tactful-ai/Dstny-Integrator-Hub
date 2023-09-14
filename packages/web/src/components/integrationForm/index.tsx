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
import newIntegration from 'helpers/newIntegration';




function IntegrationForm() {
  const navigate = useNavigate();
  const [integrationData, setIntegrationData] = useState({
    name: '',
    Key: '',
    logo: null as File | null, 
    BaseUrl: '',
    apiBaseUrl: '',
    SupportsConnections: true,
  });
  const [touchedFields, setTouchedFields] = useState({
    apiBaseUrl: false,
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
  
    if (!isUrlValid(integrationData.BaseUrl) || !isUrlValid(integrationData.apiBaseUrl)) {
      setIsLoading(false);
      return;
    }
  
    try {
      const result = await newIntegration(integrationData);
  
      if (result.success) {
        navigate(URLS.OVERVIEW_PAGE);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
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
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="apiBaseUrl">API Base URL:</label>
          <TextField
            name="apiBaseUrl"
            fullWidth
            required
            value={integrationData.apiBaseUrl}
            onChange={handleInputChange}
            onBlur={() => {
              setTouchedFields((prevTouchedFields) => ({
                ...prevTouchedFields,
                apiBaseUrl: true,
              }));
            }}
            margin="dense"
            size="small"
            error={touchedFields.apiBaseUrl && !isUrlValid(integrationData.apiBaseUrl)}
            helperText={
              touchedFields.apiBaseUrl && !isUrlValid(integrationData.apiBaseUrl)
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
      disabled={isLoading || (!isUrlValid(integrationData.BaseUrl)) || (!isUrlValid(integrationData.apiBaseUrl)) || (integrationData.logo === null)}
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
