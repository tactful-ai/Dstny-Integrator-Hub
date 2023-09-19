import config from 'config/app';
type TriggerData = {
  name: string;
  key: string;
  description: string;
  run: string;
  type: string;
  pollInterval: number;
  args: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
};

async function newTriggerTesting(triggerData: TriggerData, mainKey: string, authorization_header: string) {
  try {
    const formattedTriggerData = {
      name: triggerData.name,
      key: triggerData.key,
      description: triggerData.description,
      run: triggerData.run,
      type: triggerData.type ,
      pollInterval: triggerData.pollInterval,
      args: triggerData.args,
    };

    const response = await fetch(`${config.apiUrl}/integrations/trigger/polling/${mainKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Token' : `< Bearer ${authorization_header}>`,
      },
      body: JSON.stringify(formattedTriggerData),
      
    });
    console.log(formattedTriggerData);
    console.log(`< Bearer ${authorization_header}>`);


    if (response.ok) {
      console.log('Trigger data sent successfully!');
      return { success: true, message: 'Successful' };
    } else {
      console.error('Failed to send Trigger data to the backend.');
      return { success: false, message: 'Failed' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, message: 'An error occurred' };
  }
}

export default newTriggerTesting;

