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

interface InputTriggerData {
  label: string;
  key: string;
  type: string;
  required: boolean;
  description: string;
  variables: boolean;
}

interface TriggerForm2Props {
  triggerFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputTriggerData?: InputTriggerData[]; 
}

function TriggerForm2({ triggerFormData, inputTriggerData }: TriggerForm2Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const mainKey = localStorage.getItem('appKey') || '';

  const [TriggerData, setTriggerData] = useState({
    name: triggerFormData.name,
    key: triggerFormData.key,
    description: triggerFormData.description,
    run: '',
  });

  
  const providedCode = `let page = 0;\nlet response;\n\nconst headers = {
    'X-API-KEY': $.auth.data.apiKey as string,
  };\n\n\ndo {\n  const requestPath = \`/customers?page=\${page}&limit=10&order=DESC\`;\n  response = await $.http.get(requestPath, { headers });\n\n  response.data.items.forEach((customer: IJSONObject) => {\n    const dataItem = {\n      raw: customer,\n      meta: {\n        internalId: customer.id.toString(),\n      },\n    };\n\n    $.pushTriggerItem(dataItem);\n  });\n\n  page += 1;\n} while (response.data.length >= 10);`;

  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const locationState = location.state as TriggerForm2Props;
  
    if (locationState && locationState.triggerFormData) {
      const { name, key, description } = locationState.triggerFormData;
      console.log(name,key,description);
  
      setTriggerData((prevData) => ({
        ...prevData,
        name: name || '',
        key: key || '',
        description: description || '',
      }));
    }
  }, [location]);
  

  const [isCodeModified, setIsCodeModified] = useState(false);
  let isTestSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinue = () => {
    if (isCodeModified) {
      setTriggerData((prevData) => ({
        ...prevData,
        run: prevData.run,
      }));
      setIsContinuePressed(true);
    }
  };




  const handleTest = async () => {
    setIsLoading(true);
    const formattedTriggerData = {
      name: TriggerData.name,
      key: TriggerData.key,
      description: TriggerData.description,
      run: isContinuePressed ? TriggerData.run : providedCode,
      args: inputTriggerData || [], 
    };

    try {
      const result = await newTriggerTesting(formattedTriggerData, mainKey);

      if (result.success) {
        isTestSuccessful = true;
      } else {
        isTestSuccessful = false;
      }
    } finally {
      setIsLoading(false);
      setTestResult(isTestSuccessful ? 'Successful' : 'Failed');
    }
  };
  

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'run') {
      setTriggerData((prevData) => ({
        ...prevData,
        run: value,
      }));
      setIsCodeModified(true);
    }
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.ACTION_TABS);
  };

  return (
    <Paper sx={{ p: 3, width: '100%' , padding:'24px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Triggers
          </Typography>
        </div>
        <CustomAccordion tag={<div className="tag-number">Step 1</div>} heading="Configure your API request">
          <div className="wrapping-box">
            <div style={{ marginBottom: '15px' }}>
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
              sx={{ mt: 2, ml: 1, mb: 2 }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </CustomAccordion>
        <CustomAccordion tag={<div className="tag-number">Step 2</div>} heading="Test your API request">
          <div className="wrapping-box">
            <Typography variant="h6" sx={{ mt: 2, ml: 1, mb: 2 }}>
              Response
            </Typography>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 2, ml: 1, mb: 2 }}
              disabled={isLoading}
              onClick={handleTest}
              loading={isLoading}
              loadingIndicator={<CircularProgress size={24} />}
            >
              test
            </LoadingButton>
            {testResult && (
              <Typography variant="body2" sx={{ mt: 2, ml: 1, mb: 2 }}>
                Test Result: {testResult}
              </Typography>
            )}
          </div>
        </CustomAccordion>
        <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 2 }} onClick={handleSubmit}>
          Finish
        </Button>
      </form>
    </Paper>
  );
}

export default TriggerForm2;
