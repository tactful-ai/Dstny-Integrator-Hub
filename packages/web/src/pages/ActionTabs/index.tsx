import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ActionForm from '../../components/ActionForm';
import InputActionForm from '../../components/InputActionForm';
import ActionForm2 from '../../components/ActionForm2';
import { useNavigate } from 'react-router-dom';

interface ActionData {
  name: string;
  key: string;
  description: string;
}
interface State {
  actionFormData: {
    name: string;
    key: string;
    description: string;
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

function ActionTabs() {

  const [activeTab, setActiveTab] = useState(0);
  const [actionFormData, setActionFormData] = useState<ActionData | null>(null);
  const [allAction, setAllAction] = useState<State | null>(null);
  const [settingsCompleted, setSettingsCompleted] = useState(false); 

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  const switchToInputActionFormTab = (data: ActionData) => {
    setActionFormData(data);
    setActiveTab(1);
  };

  const navigateToActionForm2 = (data: State) => {
    setAllAction(data);
    setActiveTab(2); 
  };

  const handleSettingsCompleted = () => {
    setSettingsCompleted(true);
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
          <InputActionForm
            actionFormData={actionFormData || { name: '', key: '', description: '' }}
            onNext={navigateToActionForm2}
          />
        )}
        {activeTab === 2 && allAction && (
          <ActionForm2
            actionFormData={allAction.actionFormData}
            inputActionData={allAction.inputActionData}
          />
        )}
      </div>
    </div>
  );
}

export default ActionTabs;
