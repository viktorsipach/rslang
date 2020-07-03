const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');

async function putUserSettings({ settings }) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  } 
};

async function getUserSettings() {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }  
};

export { putUserSettings, getUserSettings }