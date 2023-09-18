import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ActionForm from '../../components/ActionForm';
import InputActionForm from '../../components/InputActionForm';
import ActionForm2 from '../../components/ActionForm2';
import InputTableForm from '../../components/inputTableForm';
import { useNavigate } from 'react-router-dom';

interface State {
  actionFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputActionData?: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
}

type InputActionField = {
  label: string;
  key: string;
  type: string;
  required: boolean;
  description: string;
  variables: boolean;
};

function ActionTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [actionFormData, setActionFormData] = useState<State['actionFormData'] | null>(null);
  const [inputActionData, setInputActionData] = useState<InputActionField[]>([]);
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const navigate = useNavigate();
  const [showInputActionForm, setShowInputActionForm] = useState(true);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  const switchToInputActionFormTab = (data: State['actionFormData']) => {
    setActionFormData(data);
    setShowInputActionForm(true);
    setActiveTab(1);
  };

  const handleInputActionData = (data: InputActionField[]) => {
    if (data.length > 0) {
      setInputActionData((prevData) => [...prevData, ...data]);
      setShowInputActionForm(false);
    }
  };

  const handleSettingsCompleted = () => {
    setSettingsCompleted(true);
  };

  const navigateToActionForm2 = () => {
    setActiveTab(2);
  };

  const handleAddAnotherField = () => {
    setShowInputActionForm(true);
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
          <ActionForm
            onNext={(data) => {
              switchToInputActionFormTab(data);
              handleSettingsCompleted();
            }}
          />
        )}
        {activeTab === 1 && (
          <>
            {showInputActionForm && (
              <InputActionForm
                actionFormData={actionFormData || { name: '', key: '', description: '' }}
                inputActionData={inputActionData}
                onNext={(data) => handleInputActionData(data)}
              />
            )}
            {!showInputActionForm && (
              <InputTableForm
                inputActionData={inputActionData}
                onNext={navigateToActionForm2}
                onAddAnotherField={handleAddAnotherField}
              />
            )}
          </>
        )}
        {activeTab === 2 && (
          <ActionForm2
            actionFormData={actionFormData || { name: '', key: '', description: '' }}
            inputActionData={inputActionData}
          />
        )}
      </div>
    </div>
  );
}

export default ActionTabs;