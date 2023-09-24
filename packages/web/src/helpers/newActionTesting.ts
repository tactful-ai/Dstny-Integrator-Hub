import config from 'config/app';
type ActionData = {
    name: string;
    key: string;
    description: string;
    run: string;
    args: {
      label: string;
      key: string;
      type: string;
      required: boolean;
      description: string;
      variables: boolean;
    }[];
  };

async function newActionTesting (ActionData: ActionData, mainKey:string )  {

  try {
    const formattedActionData = {
      name: ActionData.name,
      key: ActionData.key,
      description: ActionData.description,
      run: ActionData.run ,
      args: ActionData.args,
    };
    const token = localStorage.getItem('automatisch.token') as string;
    const response = await fetch(`${config.apiUrl}/integrations/actions/${mainKey}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formattedActionData),
    });

    if (response.ok) {
      console.log('Action data sent successfully!');
      return { success: true, message: 'Successful' };
    } else {
        console.error('Failed to send Action data to the backend.');
        return { success: false, message: 'Failed' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, message: 'An error occurred' };
  }    
}
  
export default newActionTesting;


  