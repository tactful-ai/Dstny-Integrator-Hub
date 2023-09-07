import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import WrappingBox from 'components/WrappingBox';
import CustomAccordion from 'components/CustomAccordion';
import TagNumber from 'components/TagNumber';
import CodeEditor from '@uiw/react-textarea-code-editor';
import * as URLS from 'config/urls';
import config from 'config/app';

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
    const formattedActionData = {
      name: ActionData.name,
      key: ActionData.Key,
      description: ActionData.Description,
      run: isContinuePressed ? ActionData.run : providedCode,
      args: locationState.inputActionData,
    };
    console.log(formattedActionData);

    try {
      const response = await fetch(`${config.apiUrl}/integrations/actions/aya`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedActionData),
      });

      if (response.ok) {
        console.log('Action data sent successfully!');
        isTestSuccessful = true;
      } else {
        console.error('Failed to send Action data to the backend.');
        isTestSuccessful = false;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setTestResult(isTestSuccessful ? 'Successful' : 'Failed');
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
    navigate(URLS.OVERVIEW_PAGE);
  };

  return (
    <div style={{ marginLeft: '-80px' }}>
      <Paper sx={paperStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Actions
            </Typography>
          </div>
          <CustomAccordion tag={<TagNumber text="Step 1" />} heading="Configure your API request">
            <WrappingBox>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="run">Code:</label>
                <CodeEditor
                  name="run"
                  value={providedCode}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange(evn)}
                  style={{
                    fontSize: 12,
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
                sx={{ mt: 2 }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </WrappingBox>
          </CustomAccordion>
          <CustomAccordion tag={<TagNumber text="Step 2" />} heading="Test your API request">
            <WrappingBox>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Response
              </Typography>
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

export default ActionForm2;
