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
import newTriggerTesting from 'helpers/newTriggerTesting';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  const { appKey } = useParams();
  const authorizationHeader = localStorage.getItem('automatisch.token') || '';

  const [triggerType, setTriggerType] = useState('polling');
  const [testResult, setTestResult] = useState<string | null>(null);

  const [triggerData, setTriggerData] = useState({
    name: triggerFormData.name,
    key: triggerFormData.key,
    description: triggerFormData.description,
    run: '',
    testRun: '',
    registerHook: '',
    unregisterHook: '',
  });

  const handleTriggerTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTriggerType(event.target.value);
  };

  const handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
  
    setTriggerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    // Define your provided code here
    const providedCode = `let page = 0;\nlet response;\n\nconst headers = {
      'X-API-KEY': $.auth.data.apiKey as string,
    };\n\n\ndo {\n  const requestPath = \`/customers?page=\${page}&limit=10&order=DESC\`;\n  response = await $.http.get(requestPath, { headers });\n\n  response.data.items.forEach((customer: IJSONObject) => {\n    const dataItem = {\n      raw: customer,\n      meta: {\n        internalId: customer.id.toString(),\n      },\n    };\n\n    $.pushTriggerItem(dataItem);\n  });\n\n  page += 1;\n} while (response.data.length >= 10);`;

    // Define your provided testRun code here
    const providedtestRun = 'const { data: form } = await $.http.get(`/forms/${$.step.parameters.formId}`);\n\nconst { data: responses } = await $.http.get(`/forms/${$.step.parameters.formId}/responses`);\n\nconst lastResponse = responses.items[0];\n\nif (!lastResponse) {\n  return;\n}\n\nconst computedWebhookEvent = {\n  event_type: '
    f
    orm_
    response
    ',\n  form_response: {\n    form_id: form.id,\n    token: lastResponse.token,\n    landed_at: lastResponse.landed_at,\n    submitted_at: lastResponse.submitted_at,\n    definition: {\n      id: $.step.parameters.formId,\n      title: form.title,\n      fields: form?.fields,\n    },\n    answers: lastResponse.answers,\n  },\n};\n\nconst dataItem = {\n  raw: computedWebhookEvent,\n  meta: {\n    internalId: computedWebhookEvent.form_response.token,\n  },\n};\n\n$.pushTriggerItem(dataItem);';
  
    // Define your provided registerHook code here
    const providedregisterHook = 'const subscriptionPayload = {\n  enabled: true,\n  url: $.webhookUrl,\n};\n\nawait $.http.put(`/forms/${$.step.parameters.formId}/webhooks/${$.flow.id}`, subscriptionPayload);';
  
    // Define your provided unregisterHook code here
    const providedunregisterHook = 'await $.http.delete(`/forms/${$.step.parameters.formId}/webhooks/${$.flow.id}`);';
  
    const handleContinue = (type: string) => {
      setIsContinuePressed(true);
      switch (type) {
        case 'run':
          handleInputChange('run', { target: { value: providedCode } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
          break;
        case 'tr':
          handleInputChange('testRun', { target: { value: providedtestRun } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
          break;
        case 'rh':
          handleInputChange('registerHook', { target: { value: providedregisterHook } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
          break;
        case 'uh':
          handleInputChange('unregisterHook', { target: { value: providedunregisterHook } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
          break;
        default:
          break;
      }
    };
    

  const [isLoading, setIsLoading] = useState(false);
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const formattedTriggerData = {
        name: triggerData.name,
        key: triggerData.key,
        description: triggerData.description,
        type: triggerType,
        pollInterval: 15,
        testRun: triggerData.testRun,
        registerHook: triggerData.registerHook,
        unregisterHook: triggerData.unregisterHook,
        args: inputTriggerData || [],
      };
      const result = await newTriggerTesting(
        formattedTriggerData,
        appKey,
        authorizationHeader,
        triggerType
      );

      if (result?.success) {
        setTestResult('Successful');
      } else {
        setTestResult('Failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(URLS.NEW_INTEGRATION_LIST_ACTIONS_PAGE(appKey));
  };


  return (
    <Paper sx={{ p: 3, width: '100%', padding: '24px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Triggers
          </Typography>
        </div>
        <RadioGroup
          aria-label="triggerType"
          name="triggerType"
          value={triggerType}
          onChange={handleTriggerTypeChange}
        >
          <FormControlLabel value="polling" control={<Radio />} label="Polling Trigger" />
          <FormControlLabel value="webhook" control={<Radio />} label="Webhook Trigger" />
        </RadioGroup>
        {triggerType === 'polling' && (
          <CustomAccordion
            tag={<div className="tag-number">Step 1</div>}
            heading="Configure your API request"
          >
            <div className="wrapping-box">
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="run">Code:</label>
                <CodeEditor
                  name="run"
                  value={providedCode}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange('run', evn)}
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
                onClick={() => handleContinue('run')}
              >
                Continue
              </Button>
            </div>
          </CustomAccordion>
        )}
        {triggerType === 'webhook' && (
          <CustomAccordion
            tag={<div className="tag-number">Step 1</div>}
            heading="Configure your API request"
          >
            <div className="wrapping-box">
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="run">Test Run Code:</label>
                <CodeEditor
                  name="run"
                  value={providedtestRun}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange('testRun', evn)}
                  style={{
                    fontSize: 13,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                      'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2, ml: 1, mb: 2 }}
                  onClick={() => handleContinue('tr')}
                >
                  Continue
                </Button>
                \n \n
                <label htmlFor="run">Register Hook Code:</label>
                <CodeEditor
                  name="run"
                  value={providedregisterHook}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange('registerHook', evn)}
                  style={{
                    fontSize: 13,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                      'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2, ml: 1, mb: 2 }}
                  onClick={() => handleContinue('rh')}
                >
                  Continue
                </Button>
                \n \n
                <label htmlFor="run">Unregister Hook Code:</label>
                <CodeEditor
                  name="run"
                  value={providedunregisterHook}
                  language="ts"
                  padding={15}
                  onChange={(evn) => handleInputChange('unregisterHook', evn)}
                  style={{
                    fontSize: 13,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                      'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2, ml: 1, mb: 2 }}
                  onClick={() => handleContinue('uh')}
                >
                  Continue
                </Button>
              </div>
            </div>
          </CustomAccordion>
        )}

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
              Test
            </LoadingButton>
            {testResult && (
              <Typography variant="body2" sx={{ mt: 2, ml: 1, mb: 2 }}>
                Test Result: {testResult}
              </Typography>
            )}
          </div>
        </CustomAccordion>
        <Button type="submit" variant="contained" color="primary" size="small" sx={{ mt: 2 }}>
          Finish
        </Button>
      </form>
    </Paper>
  );
}

export default TriggerForm2;
