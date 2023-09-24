import config from 'config/app';
type TriggerData = {
  name: string;
  key: string;
  description: string;
  run: string;
  pollInterval: number;
};

async function newTriggerTesting(triggerData: TriggerData, mainKey: string) {
  try {
    const formattedTriggerData = {
      name: triggerData.name,
      key: triggerData.key,
      description: triggerData.description,
      run: triggerData.run,
      pollInterval: triggerData.pollInterval,
    };

    const token = localStorage.getItem('automatisch.token') as string;

    const response = await fetch(`${config.apiUrl}/integrations/trigger/polling/${mainKey}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formattedTriggerData),
      
    });


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

