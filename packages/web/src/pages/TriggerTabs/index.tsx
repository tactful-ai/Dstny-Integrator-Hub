import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TriggerForm from '../../components/TriggerForm';
import InputForm from '../../components/InputForm';
import TriggerForm2 from '../../components/TriggerForm2';
import InputTableForm from '../../components/inputTableForm';
import { useNavigate } from 'react-router-dom';

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
  const [inputTriggerData, setInputTriggerData] = useState<InputTriggerField[]>([]);
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const navigate = useNavigate();
  const [showInputTriggerForm, setShowInputTriggerForm] = useState(true);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  const switchToInputTriggerFormTab = (data: State['TriggerFormData']) => {
    setTriggerFormData(data);
    setShowInputTriggerForm(true);
    setActiveTab(1);
  };

  const handleInputTriggerData = (data: InputTriggerField[]) => {
    if (data.length > 0) {
      setInputTriggerData((prevData) => [...prevData, ...data]);
      setShowInputTriggerForm(false);
    }
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
          />
        )}
        {activeTab === 1 && (
          <>
            {showInputTriggerForm && (
              <InputForm
                FormData={triggerFormData || { name: '', key: '', description: '' }}
                inputData={inputTriggerData}
                onNext={(data) => handleInputTriggerData(data)}
              />
            )}
            {!showInputTriggerForm && (
              <InputTableForm
                inputData={inputTriggerData}
                onNext={navigateToTriggerForm2}
                onAddAnotherField={handleAddAnotherField}
              />
            )}
          </>
        )}
        {activeTab === 2 && (
          <TriggerForm2
            triggerFormData={triggerFormData || { name: '', key: '', description: '' }}
            inputTriggerData={inputTriggerData}
          />
        )}
      </div>
    </div>
  );
}

export default TriggerTabs;