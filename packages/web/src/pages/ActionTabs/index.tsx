import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ActionForm from '../../components/ActionForm';
import InputForm from '../../components/InputForm';
import ActionForm2 from '../../components/ActionForm2';
import InputTableForm from '../../components/inputTableForm';
import {  useLocation } from 'react-router-dom';
import { IAction } from '@automatisch/types';

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
  const [inputDataArray, setInputDataArray] = useState<InputActionField[]>([]); 
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const [showInputActionForm, setShowInputActionForm] = useState(true);
  const location = useLocation();
  const actionData = (location.state as { actionData?: IAction })?.actionData;
  


  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };


  useEffect(() => {
    if (actionData) {
      setActionFormData({
        name: actionData.name,
        key: actionData.key,
        description: actionData.description,
      });
      // setInputDataArray(actionData.substeps || []);
    }
  }, [actionData]);


  const switchToInputActionFormTab = (data: State['actionFormData']) => {
    setActionFormData(data);
    setShowInputActionForm(true);
    setActiveTab(1);
  };

  const handleInputActionData = (data: InputActionField) => {
    setInputDataArray((prevData) => [...prevData, data]);
    setShowInputActionForm(false); 
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
        initialData={actionFormData || undefined} 
      />
        )}
        {activeTab === 1 && (
          <>
            {showInputActionForm && (
              <InputForm
              FormData={actionFormData || { name: '', key: '', description: '' }}
              onAddInputData={handleInputActionData} 
            />
            )}
            {!showInputActionForm && (
              <InputTableForm
                inputData={inputDataArray}
                onNext={navigateToActionForm2}
                onAddAnotherField={handleAddAnotherField}
              />
            )}
          </>
        )}
        {activeTab === 2 && (
          <ActionForm2
            actionFormData={actionFormData || { name: '', key: '', description: '' }}
            inputActionData={inputDataArray}
          />
        )}
      </div>
    </div>
  );
}

export default ActionTabs;