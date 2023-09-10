import { field } from "@automatisch/types"

const endpointUrl = `http://localhost:3000/integrations/auth/apikey`

type AuthIntegrationData = {
    fields: field[];
    endpoint: string;
    headers: Record<string, string>;
    appKey: string;
}

async function createIntegrationAuth({fields, endpoint, headers, appKey}:AuthIntegrationData) {
    try {
        const res = await fetch(`${endpointUrl}/${appKey}`, {
            method: 'POST',
            body:JSON.stringify({
                fields: fields,
                headers: headers,
                verifyEndpoint: endpoint
            })
        });

        if(!res.ok) {
            throw new Error('There is an error sending the data')
        }
        
        const responseData = await res.json();
        console.log(responseData)
    } catch(e) {
        console.log(e);
    }
}

export default createIntegrationAuth;