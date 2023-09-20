import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TriggerForm from '../../components/TriggerForm';
import InputForm from '../../components/InputForm';
import TriggerForm2 from '../../components/TriggerForm2';
import InputTableForm from '../../components/inputTableForm';
import { useNavigate } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import { ITrigger } from '@automatisch/types';

interface State {
  TriggerFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputTriggerData?: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
}

type InputTriggerField = {
  label: string;
  key: string;
  type: string;
  required: boolean;
  description: string;
  variables: boolean;
};

function TriggerTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [triggerFormData, setTriggerFormData] = useState<State['TriggerFormData'] | null>(null);
  const [inputDataArray, setInputDataArray] = useState<InputTriggerField[]>([]); 
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const navigate = useNavigate();
  const [showInputTriggerForm, setShowInputTriggerForm] = useState(true);
    const location = useLocation();
  const triggerData = (location.state as { triggerData?: ITrigger })?.triggerData;
  

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

    useEffect(() => {
    if (triggerData) {
      setTriggerFormData({
        name: triggerData.name,
        key: triggerData.key,
        description: triggerData.description,
      });
      // setInputDataArray(actionData.substeps || []);
    }
  }, [triggerData]);



  const switchToInputTriggerFormTab = (data: State['TriggerFormData']) => {
    setTriggerFormData(data);
    setShowInputTriggerForm(true);
    setActiveTab(1);
  };

  const handleInputTriggerData = (data: InputTriggerField) => {
    setInputDataArray((prevData) => [...prevData, data]);
    setShowInputTriggerForm(false); 
  };

  const handleSettingsCompleted = () => {
    setSettingsCompleted(true);
  };

  const navigateToTriggerForm2 = () => {
    setActiveTab(2);
  };

  const handleAddAnotherField = () => {
    setShowInputTriggerForm(true);
  };
  

  return (
    <div>
      <Paper square>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Settings" />
          <Tab label="Input Designer" disabled={!settingsCompleted} />
          <Tab label="API Configuration" disabled={!settingsCompleted} />
        </Tabs>
      </Paper>
      <div style={{ padding: '20px' }}>
        {activeTab === 0 && (
          <TriggerForm
            onNext={(data) => {
              switchToInputTriggerFormTab(data);
              handleSettingsCompleted();
            }}
            initialData={triggerFormData || undefined} 
          />
        )}
{activeTab === 1 && (
          <>
            {showInputTriggerForm && (
              <InputForm
                FormData={triggerFormData || { name: '', key: '', description: '' }}
                onAddInputData={handleInputTriggerData} 
              />
            )}
            {!showInputTriggerForm && (
              <InputTableForm
                inputData={inputDataArray} 
                onNext={navigateToTriggerForm2}
                onAddAnotherField={handleAddAnotherField}
              />
            )}
          </>
        )}
        {activeTab === 2 && (
          <TriggerForm2
            triggerFormData={triggerFormData || { name: '', key: '', description: '' }}
            inputTriggerData={inputDataArray} 
          />
        )}
      </div>
    </div>
  );
}

export default TriggerTabs;