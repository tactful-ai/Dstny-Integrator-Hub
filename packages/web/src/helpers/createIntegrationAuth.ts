import { field } from "@automatisch/types"
import config from "config/app";

const endpointUrl = `${config.apiUrl}/integrations/auth/apikey`

type AuthIntegrationData = {
    fields: field[];
    endpoint: string;
    headers: Record<string, string>;
    appKey: string;
}


/**
 * 
 *     const headers = new Headers();
  
    try {
      const response = await fetch(`${config.apiUrl}/integrations/create`, {
        method: 'POST',
        headers: headers,
        body: formData as unknown as BodyInit,
      });
 */

async function createIntegrationAuth({fields, endpoint, headers, appKey}:AuthIntegrationData) {
    try {

        const token = localStorage.getItem('automatisch.token') as string;
        const res = await fetch(`${endpointUrl}/${appKey}`, {
            method: 'POST',
            body:JSON.stringify({
                fields: fields,
                headers: headers,
                verifyEndpoint: endpoint
            }),
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer ' + token
            },
        });

        if(!res.ok) {
            throw new Error('There is an error sending the data')
        }
        
        return true;

        
    } catch(e) {
        console.log(e);
        return false;
    }
}

export default createIntegrationAuth;