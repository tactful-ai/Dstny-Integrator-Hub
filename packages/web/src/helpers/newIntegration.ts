import * as URLS from 'config/urls';
import config from 'config/app';

interface IntegrationData {
    name: string;
    Key: string;
    SupportsConnections: boolean;
    BaseUrl: string;
    apiBaseUrl: string;
    logo?: File | null;
  }
  
  async function newIntegration(integrationData: IntegrationData) {
    try {
      const formData = new FormData();

      formData.append('name', integrationData.name);
      formData.append('key', integrationData.Key);
      formData.append('supportsConnections', integrationData.SupportsConnections.toString());
      formData.append('baseUrl', integrationData.BaseUrl);
      formData.append('apiBaseUrl', integrationData.apiBaseUrl);
  
      if (integrationData.logo) {
        formData.append('logo', integrationData.logo);
      }
  
      const token = localStorage.getItem('automatisch.token') as string;
      const response = await fetch(`${config.apiUrl}/integrations/create`, {
        method: 'POST',
        headers: {

          'authorization': 'Bearer ' + token
        },
        credentials: 'include',
        body: formData as unknown as BodyInit,
      });
  
      if (response.ok) {
        console.log('Integration data sent successfully!');
        const mainKey = integrationData.Key;
  
        if (mainKey !== null && mainKey !== undefined) {
          localStorage.setItem('appKey', mainKey);
          return { success: true, message: 'Successful' };
        } else {
          console.error('mainKey is null or undefined');
          return { success: false, message: 'mainKey is null or undefined' };
        }
      } else {
        console.error('Failed to send integration data to the backend.');
        return { success: false, message: 'Failed to send integration data to the backend' };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return { success: false, message: 'An error occurred' };
    }
  }
  
  export default newIntegration;
  