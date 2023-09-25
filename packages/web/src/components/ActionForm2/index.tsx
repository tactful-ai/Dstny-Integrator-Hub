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

interface InputActionData {
  label: string;
  key: string;
  type: string;
  required: boolean;
  description: string;
  variables: boolean;
}

interface ActionForm2Props {
  actionFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputActionData?: InputActionData[]; 
}

function ActionForm2({ actionFormData, inputActionData }: ActionForm2Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {appKey} = useParams(); 
  const authorization_header = localStorage.getItem('automatisch.token') || '';

  const [ActionData, setActionData] = useState({
    name: actionFormData.name,
    key: actionFormData.key,
    description: actionFormData.description,
    run: '',
  });

  const providedCode= `
  const requestPath = '{{your request path}}';

  const headers = {
     // set your request headers
  };
  
  // const response = await $.http.delete(
  //  requestPath,
  // );
  
  $.setActionItem({ raw: response.data });
  ` ;

  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const locationState = location.state as ActionForm2Props;
  
    if (locationState && locationState.actionFormData) {
      const { name, key, description } = locationState.actionFormData;
      console.log(name,key,description);
  
      setActionData((prevData) => ({
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
      setActionData((prevData) => ({
        ...prevData,
        run: prevData.run,
      }));
      setIsContinuePressed(true);
    }
  };

  const handleTest = async () => {
    setIsLoading(true);
    const formattedActionData = {
      name: ActionData.name,
      key: ActionData.key,
      description: ActionData.description,
      run: isContinuePressed ? ActionData.run : providedCode,
      args: inputActionData || [], 
    };

    try {
      const result = await newActionTesting(formattedActionData, appKey, authorization_header);

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
      setActionData((prevData) => ({
        ...prevData,
        run: value,
      }));
      setIsCodeModified(true);
    }
  };



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.FLOWS);
  };

  return (
    <Paper sx={{ p: 3, width: '100%' , padding:'24px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Actions
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

export default ActionForm2;
