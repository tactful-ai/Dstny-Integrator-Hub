import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import WrappingBox from "components/WrappingBox";
import CustomAccordion from "components/CustomAccordion"; 
import TagNumber from "components/TagNumber";
import CodeEditor from '@uiw/react-textarea-code-editor'; 
import * as URLS from 'config/urls';
import config from 'config/app';

interface FormData {
  name: string;
  key: string;
  description: string;
  run: string;
  pollInterval: number;
}

function TriggerForm2() {
  const location = useLocation();
  const navigate = useNavigate();
  

  const providedCode = `let page = 0;\nlet response;\n\nconst headers = {
    'X-API-KEY': $.auth.data.apiKey as string,
  };\n\n\ndo {\n  const requestPath = \`/customers?page=\${page}&limit=10&order=DESC\`;\n  response = await $.http.get(requestPath, { headers });\n\n  response.data.items.forEach((customer: IJSONObject) => {\n    const dataItem = {\n      raw: customer,\n      meta: {\n        internalId: customer.id.toString(),\n      },\n    };\n\n    $.pushTriggerItem(dataItem);\n  });\n\n  page += 1;\n} while (response.data.length >= 10);`;

  const [triggerData, setTriggerData] = useState<FormData>({
    name: '',
    key: '',
    description: '',
    run: '', 
    pollInterval : 15,
  });

  const [isCodeModified, setIsCodeModified] = useState(false);

  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name") || "";
    const key = searchParams.get("key") || "";
    const description = searchParams.get("description") || "";

    setTriggerData({
      name,
      key: key,
      description: description,
      run: providedCode, 
      pollInterval: 15,
    });
  }, [location.search]);

  let isTestSuccessful = false; 


  const handleTest = async () => {

  
    const codeToUse = isContinuePressed ? triggerData.run : providedCode; 
  
    const formattedTriggerData = {
      name: triggerData.name,
      key: triggerData.key,
      description: triggerData.description,
      run: codeToUse,
      pollInterval: triggerData.pollInterval,
    };
    console.log(formattedTriggerData);

  
    try {
      const response = await fetch(`${config.apiUrl}/integrations/trigger/polling/aya`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedTriggerData),
      });
  
      if (response.ok) {
        console.log('Trigger data sent successfully!');
        isTestSuccessful = true;
        setTestResult("Successful");
      } else {
        console.error('Failed to send Trigger data to the backend.');
        isTestSuccessful = false;
        setTestResult("Failed");
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  const paperStyle = {
    width: '700px',
    padding: '20px',
    marginLeft: '-70px',
  };

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinue = () => {
    if (isCodeModified) {
      setTriggerData((prevData) => ({
        ...prevData,
        run: prevData.run,
      }));
      setIsContinuePressed(true); 
  };
  }  
  
  
  
  
  
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.ACTION_PAGE);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
  
    if (name === 'run') {
      setTriggerData((prevData) => ({
        ...prevData,
        run: value,
      }));
      
      setIsCodeModified(true);
    } else {
      setTriggerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div style={{ marginLeft: '-80px' }}>
      <Paper sx={paperStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Triggers</Typography>
          </div>
          <CustomAccordion tag={<TagNumber text="Step 1" />} heading="Configure your API request">
            <WrappingBox>
              <Typography variant="h6" sx={{ mb: 2 }}>Polling Trigger</Typography>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="run">Code:</label>
                <CodeEditor
                  name="run"
                  value={triggerData.run}
                  language="ts"
                  onChange={(evn) => handleInputChange(evn)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
              </div>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </WrappingBox>
          </CustomAccordion>
          <CustomAccordion tag={<TagNumber text="Step 2" />} heading="Test your API request">
            <WrappingBox>
              <Typography variant="h6" sx={{ mb: 2 }}>Response</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
                onClick={handleTest}
              >
                Test
              </Button>
              {testResult && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Test Result: {testResult}
                </Typography>
              )}
            </WrappingBox>
          </CustomAccordion>
          <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 2 }}>
            Finish
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default TriggerForm2;
