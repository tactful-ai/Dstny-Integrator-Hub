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
import { GET_APP } from 'graphql/queries/get-app';
import { useLazyQuery } from '@apollo/client';

interface State {
  actionFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputActionData?: InputActionField [];
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
  const appKey = localStorage.getItem('appKey') || '';
  const authorization_header = localStorage.getItem('automatisch.token') || '';
  const [activeTab, setActiveTab] = useState(0);
  const [actionFormData, setActionFormData] = useState<State['actionFormData']>({
    name: '',
    key: '',
    description: '',
  });

  const [inputDataArray, setInputDataArray] = useState<InputActionField[]>([]); 
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const [showInputActionForm, setShowInputActionForm] = useState(true);
  const location = useLocation();
  const specificActionKey = (location.state as { key: string })?.key || '';
  

  const [useStateUsing, setUseStateUsing] = useState(true);
  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  const [getApp, { data }] = useLazyQuery(GET_APP, {
    context: {
      headers: {
        Authorization: `${authorization_header}`,
      },
    },
    onError: (error) => {
      console.error("GraphQL query error:", error);
    },
  });

useEffect(() => {
    if (appKey && useStateUsing) {
      getApp({
        variables: {
          key: appKey,
        },
      })
      .then((result) => {
        const data = result.data; 
        console.log(data); 
        
        if (specificActionKey && data && data.getApp.actions) {
          const specificAction = data.getApp.actions.find((action: IAction) => action.key === specificActionKey);
          if (specificAction) {
            setActionFormData({
              name: specificAction.name,
              key: specificAction.key,
              description: specificAction.description,
            });
      
            let inputFields: InputActionField[] = [];
            if (specificAction.arguments) {
              inputFields = specificAction.arguments.map((argument: InputActionField) => ({
                label: argument.label || '',
                key: argument.key || '',
                type: argument.type || '',
                required: argument.required || false,
                description: argument.description || '',
                variables: argument.variables || false,
              }));
              setInputDataArray(inputFields);
            }
            setUseStateUsing(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [appKey, useStateUsing, getApp, specificActionKey]);


  const switchToInputActionFormTab = (data: State['actionFormData']) => {
    setActionFormData(data);
    setShowInputActionForm(false);
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
    const handleDeleteItem = (index: number) => {
    const updatedData = [...inputDataArray];
    updatedData.splice(index, 1);
    setInputDataArray(updatedData);
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
                onDelete={handleDeleteItem} 
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