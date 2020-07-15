import { MESSAGE_FIELD } from './constants';

const createUser = async (user) => {
  try {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 417) {
      MESSAGE_FIELD.innerHTML = 'You are already registered! Please sign in!';
      return undefined;
    }
    const content = await rawResponse.json();
    if (content.error !== undefined) {
      let errorMessage = '';
      Array.from(content.error.errors).forEach((element) => {
        errorMessage += `${element.message} <br>`;
      });
      MESSAGE_FIELD.innerHTML = errorMessage;
    } else {
      MESSAGE_FIELD.innerHTML = 'Your account was successfully created! <br>Please sign in to continue.';
    }
    return content;
  } catch (error) {
    MESSAGE_FIELD.innerHTML = error;
    return error;
  }
 
};

const loginUser = async (user) => {
  try {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      return content;
    }
    MESSAGE_FIELD.innerHTML = 'Invalid login or password!';
    return undefined;
  } catch (error) {
    MESSAGE_FIELD.innerHTML = error;
    return error;
  }  
};

const getUser = async (userId,token) => {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      return content;
    }
    return null;
  } catch (error) {
    MESSAGE_FIELD.innerHTML = error;
    return error;
  }  
};



export {
  createUser, loginUser, getUser
};
