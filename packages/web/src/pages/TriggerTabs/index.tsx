import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TriggerForm from '../../components/TriggerForm';
import InputForm from '../../components/InputForm';
import TriggerForm2 from '../../components/TriggerForm2';
import InputTableForm from '../../components/inputTableForm';
import { useLocation, useParams } from 'react-router-dom';
import { ITrigger } from '@automatisch/types';
import { GET_APP } from 'graphql/queries/get-app';
import { useLazyQuery } from '@apollo/client';

interface State {
  TriggerFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputTriggerData?: InputTriggerField[];
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
  const {appKey} = useParams();
  const authorization_header = localStorage.getItem('automatisch.token') || '';
  const [activeTab, setActiveTab] = useState(0);

  const [triggerFormData, setTriggerFormData] = useState<State['TriggerFormData']>({
    name: '',
    key: '',
    description: '',
  });

  const [inputDataArray, setInputDataArray] = useState<InputTriggerField[]>([]);
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const [showInputTriggerForm, setShowInputTriggerForm] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const location = useLocation();
  const specificTriggerKey = (location.state as { key: string })?.key || '';

const [useStateUsing, setUseStateUsing] = useState(true);
  const handleTabChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
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
        
        if (specificTriggerKey && data && data.getApp.triggers) {
          const specificTrigger = data.getApp.triggers.find((trigger: ITrigger) => trigger.key === specificTriggerKey);
          if (specificTrigger) {
            setTriggerFormData({
              name: specificTrigger.name,
              key: specificTrigger.key,
              description: specificTrigger.description,
            });
      
            let inputFields: InputTriggerField[] = [];
            if (specificTrigger.arguments) {
              inputFields = specificTrigger.arguments.map((argument: InputTriggerField) => ({
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
  }, [appKey, useStateUsing, getApp, specificTriggerKey]);
  


  const switchToInputTriggerFormTab = (data: State['TriggerFormData']) => {
    setTriggerFormData(data);
    setShowInputTriggerForm(false);
    setActiveTab(1);
  };

  const handleInputTriggerData = (data: InputTriggerField) => {
    setInputDataArray((prevData) => [...prevData, data]);
    setShowInputTriggerForm(false);
  };
  const onUpdateInputData = (index: number, updatedData: InputTriggerField) => {
    const updatedArray = [...inputDataArray];
    updatedArray[index] = updatedData;
    setInputDataArray(updatedArray);
    setEditingIndex(null); 
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
    setActiveTab(1);
  };
  const handleDeleteItem = (index: number) => {
    const updatedData = [...inputDataArray];
    updatedData.splice(index, 1);
    setInputDataArray(updatedData);
  };
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setShowInputTriggerForm(true); 
    setActiveTab(1);
    console.log(index);
  };

  const emptyFunction = () => {
    // do nothing
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
    {showInputTriggerForm && editingIndex === null && (
      <InputForm
        inputData={inputDataArray}
        onAddInputData={handleInputTriggerData}
        onUpdateInputData={emptyFunction}
        editingIndex={null}
      />
    )}

    {showInputTriggerForm && editingIndex !== null && (
      <InputForm
        inputData={inputDataArray.slice(editingIndex, editingIndex + 1)}
        onAddInputData={emptyFunction}
        onUpdateInputData={(index, updatedData) => {
          onUpdateInputData(editingIndex, updatedData);
          setEditingIndex(null);
        }}
        editingIndex={0}
      />
    )}

    {!showInputTriggerForm && editingIndex === null && (
      <InputTableForm
        inputData={inputDataArray}
        onDelete={handleDeleteItem}
        onNext={navigateToTriggerForm2}
        onAddAnotherField={handleAddAnotherField}
        onEdit={handleEdit}
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