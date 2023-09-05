import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import WrappingBox from "components/WrappingBox";
import CustomAccordin from "components/CustomAccordin"; 
import TagNumber from "components/TagNumber";
import CodeEditor from '@uiw/react-textarea-code-editor'; 
import * as URLS from 'config/urls';
import config from 'config/app';

interface FormData {
  name: string;
  Key: string;
  Description: string;
  code: string;

}

function ActionForm2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ActionData, setActionData] = useState<FormData>({
    name: '',
    Key: '',
    Description: '',
    code: '',

  });

  const providedCode = "const requestPath = `/customers/${$.step.parameters.id}`;\n\nconst headers = {\n  'X-API-KEY': $.auth.data.authToken as string,\n};\n\nconst response = await $.http.delete(\n  requestPath,\n);\n\n$.setActionItem({ raw: response.data });";


  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name") || "";
    const key = searchParams.get("key") || "";
    const description = searchParams.get("description") || "";

    setActionData({
      name,
      Key: key,
      Description: description,
      code: providedCode,

    });
  }, [location.search]);

  const [isCodeModified, setIsCodeModified] = useState(false);
  let isTestSuccessful = false; 

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinue = () => {
    if (isCodeModified) {
      setActionData((prevData) => ({
        ...prevData,
        code: prevData.code,
      }));
      setIsContinuePressed(true); 
  };
  }  

  const handleTest = async () => {
    const resultMessage = isTestSuccessful ? "Successful" : "Failed";
    setTestResult(resultMessage);
  
    const codeToUse = isContinuePressed ? ActionData.code : providedCode; 
  
    const formattedActionData = {
      name: ActionData.name,
      Key: ActionData.Key,
      Description: ActionData.Description,
      code: codeToUse,
    };
    console.log(formattedActionData);

  
    try {
      const response = await fetch(`${config.apiUrl}/integrations/trigger/polling/demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedActionData),
      });
  
      if (response.ok) {
        console.log('Trigger data sent successfully!');
        isTestSuccessful = true;
      } else {
        console.error('Failed to send Trigger data to the backend.');
        isTestSuccessful = false;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
  
    if (name === 'code') {
      setActionData((prevData) => ({
        ...prevData,
        code: value,
      }));
      
      setIsCodeModified(true);
    } else {
      setActionData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const paperStyle = {
    width: '700px',
    padding: '20px',
    marginLeft: '-70px',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.OVERVIEW_PAGE);

  }
  

  return (
    <div style={{ marginLeft: '-80px' }}>
      <Paper sx={paperStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
          </div>
          <CustomAccordin tag={<TagNumber text="Step 1" />} heading="Configure your API request">
            <WrappingBox>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="code">Code:</label>
                <CodeEditor
                  name="code"
                  value={ActionData.code}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange(evn)}
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
                continue
              </Button>
            </WrappingBox>
          </CustomAccordin>
          <CustomAccordin tag={<TagNumber text="Step 2" />} heading="Test your API request">
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
          </CustomAccordin>
          <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 2 }}>
            Finish
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ActionForm2;
