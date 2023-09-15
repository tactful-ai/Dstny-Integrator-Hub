import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation , useNavigate } from 'react-router-dom';
import CustomAccordion from "components/CustomAccordion"; 
import CodeEditor from '@uiw/react-textarea-code-editor'; 
import * as URLS from 'config/urls';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress'; 
import newTriggerTesting from 'helpers/newTriggerTesting'; 

interface FormData {
  name: string;
  key: string;
  description: string;
  run: string;
  pollInterval: number;
}

function TriggerForm2() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  
  const providedCode = `let page = 0;\nlet response;\n\nconst headers = {
    'X-API-KEY': $.auth.data.apiKey as string,
  };\n\n\ndo {\n  const requestPath = \`/customers?page=\${page}&limit=10&order=DESC\`;\n  response = await $.http.get(requestPath, { headers });\n\n  response.data.items.forEach((customer: IJSONObject) => {\n    const dataItem = {\n      raw: customer,\n      meta: {\n        internalId: customer.id.toString(),\n      },\n    };\n\n    $.pushTriggerItem(dataItem);\n  });\n\n  page += 1;\n} while (response.data.length >= 10);`;

  const [triggerData, setTriggerData] = useState<FormData>({
    name:  '',
    key: '',
    description: '',
    run: providedCode, 
    pollInterval : 15,
  });

    const [isCodeModified, setIsCodeModified] = useState(false);
    const mainKey = localStorage.getItem('appKey') || ''; 
    const [testResult, setTestResult] = useState<string | null>(null);
  
    useEffect(() => { 
      const locationState = location.state as FormData;
      const { name, key, description } = locationState;
      setTriggerData((prevData) => ({
        ...prevData,
        name: name || '',
        key: key || '',
        description: description || '',
     }));
    }, [location]);
   


  let isTestSuccessful = false;



  const handleTest = async () => {
    setIsLoading(true);
  
    const codeToUse = isCodeModified ? triggerData.run : providedCode;
  
    const formattedTriggerData = {
      name: triggerData.name,
      key: triggerData.key,
      description: triggerData.description,
      run: codeToUse,
      pollInterval: triggerData.pollInterval,
    };

    try {
      const result = await newTriggerTesting(formattedTriggerData, mainKey);

  
      if (result.success) {
        isTestSuccessful = true;
        setTestResult("Successful");
      } else {

        isTestSuccessful = false;
        setTestResult("Failed");
      }
    } finally {
      setIsLoading(false);
    }
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
    navigate(URLS.ACTION_TABS);
  };
  // const handleAdd = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   window.location.href = `${URLS.TRIGGER_PAGE}?mainkey=${mainKey}`;
  // };

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
  const paperStyle = {
    width: '700px',
    padding: '20px',
    marginLeft: '-70px',
  };

  return (
    <Paper sx={paperStyle} >
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <Typography variant="h6" sx={{ mb: 2 , mt:4}}>Triggers</Typography>
        </div>
        <CustomAccordion tag={<div className="tag-number">Step 1</div>} heading="Configure your API request">
          <div className="wrapping-box">
          <div style={{ marginBottom: '15px' , marginLeft : '10px'}}>
          <Typography variant="h6"  sx={{ mb: 2  ,mt: 2}}>Polling Trigger</Typography>
              <label htmlFor="run">Code:</label>
              <CodeEditor
                  name="run"
                  value={providedCode}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange(evn)}
                  style={{
                    fontSize: 13,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                      'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
           </div>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="small"
              className="continue-button"
              sx={{ mt: 2 , ml :1 , mb:2}}
              onClick={handleContinue}
            >
              Continue
            </Button>
            </div>

        </CustomAccordion>
        <CustomAccordion tag={<div className="tag-number">Step 2</div>} heading="Test your API request">
        <div className="wrapping-box">
            <Typography variant="h6" sx={{ mt: 2 , ml :1 , mb:2}} >Response</Typography>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              className="test-button"
              size="small"
              sx={{ mt: 2 , ml :1 , mb:2}}
              disabled={isLoading}
              onClick={handleTest}
              loading={isLoading}
              loadingIndicator={<CircularProgress size={24} />}
            >
              Test
            </LoadingButton>
            {testResult && (
              <Typography  variant="body2" sx={{ mt: 2 , ml :1 , mb:2}}>
                Test Result: {testResult}
              </Typography>
            )}
         </div>
        </CustomAccordion>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className="finish-button"
          onClick={handleSubmit}
        >
          Finish
        </Button>
      </form>
    </Paper>
  );
  
}

export default TriggerForm2;
