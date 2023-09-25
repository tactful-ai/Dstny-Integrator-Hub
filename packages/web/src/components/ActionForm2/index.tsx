import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomAccordion from 'components/CustomAccordion';
import CodeEditor from '@uiw/react-textarea-code-editor';
import * as URLS from 'config/urls';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress'; 
import newActionTesting from 'helpers/newActionTesting'; 

interface State {
  actionFormData: {
    name: string;
    Key: string;
    Description: string;
  };
  inputActionData: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
}

function ActionForm2() {
  const location = useLocation();
  const navigate = useNavigate();
  const {appKey} = useParams(); 

  const [ActionData, setActionData] = useState({
    name: '',
    Key: '',
    Description: '',
    run: '',
  });

  const providedCode =
    "const requestPath = `/customers/${$.step.parameters.id}`;\n\nconst headers = {\n  'X-API-KEY': $.auth.data.authToken as string,\n};\n\nconst response = await $.http.delete(\n  requestPath,\n);\n\n$.setActionItem({ raw: response.data });";

  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const locationState = location.state as State;
    const { name, Key, Description } = locationState.actionFormData;

    setActionData((prevData) => ({
      ...prevData,
      name: name || '',
      Key: Key || '',
      Description: Description || '',
    }));
  }, [location]);

  const [isCodeModified, setIsCodeModified] = useState(false);
  let isTestSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinue = () => {
    if (isCodeModified) {
      setActionData((prevData) => ({
        ...prevData,
        run: prevData.run,
      }));
      setIsContinuePressed(true);
    }
  };

  const locationState = location.state as State;

  const handleTest = async () => {
    setIsLoading(true);
    const formattedActionData = {
      name: ActionData.name,
      key: ActionData.Key,
      description: ActionData.Description,
      run: isContinuePressed ? ActionData.run : providedCode,
      args: locationState.inputActionData,
    };
    
    console.log(formattedActionData);




    try {
      const result = await newActionTesting(formattedActionData, appKey);

  
      if (result.success) {
        isTestSuccessful = true;
      } else {
        isTestSuccessful = false;
      }
    }  finally {
      setIsLoading(false);
      setTestResult(isTestSuccessful ? 'Successful' : 'Failed');
    }
  };



  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'run') {
      setActionData((prevData) => ({
        ...prevData,
        run: value,
      }));
      setIsCodeModified(true);
    }
  };

  const paperStyle = {
    width: '700px',
    padding: '20px',
    marginLeft: '-70px',
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.FLOWS);
  };


  return (
    <div className="wrapping-box">
      <Paper sx={paperStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 , mt:4}}>
              Actions
            </Typography>
          </div>
          <CustomAccordion tag={<div className="tag-number">Step 1</div>} heading="Configure your API request">
            <div className="wrapping-box">
              <div style={{ marginBottom: '15px' , marginLeft : '10px'}}>
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
                sx={{ mt: 2 , ml :1 , mb:2}}
                onClick={handleContinue}
                
              >
                Continue
              </Button>
            </div>
          </CustomAccordion>
          <CustomAccordion tag={<div className="tag-number">Step 2</div>} heading="Test your API request">
            <div className="wrapping-box">
              <Typography variant="h6" sx={{ mt: 2 , ml :1 , mb:2}}>
                Response
              </Typography>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2 , ml :1 , mb:2}}
                disabled={isLoading}
                onClick={handleTest}
                loading={isLoading}
                loadingIndicator={<CircularProgress size={24} />}
              >
                test
              </LoadingButton>
              {testResult && (
                <Typography variant="body2" sx={{ mt: 2 , ml :1 , mb:2}}>
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
    </div>
  );
}

export default ActionForm2;
