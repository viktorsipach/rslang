import { MESSAGE_FIELD } from './constants';

const createUser = async (user) => {
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
};

const loginUser = async (user) => {
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
};

const setGameProgressToUserSetting = async ({ userId, userToken, gameProgress }) => {
  await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameProgress),
  });
};

const getGameProgressFromUserSetting = async ({ userId, userToken }) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    return content.optional;
  }
  if (rawResponse.statusText === 'Unauthorized') {
    return undefined;
  }
  return { level: 1, page: 1 };
};

export {
  createUser, loginUser, setGameProgressToUserSetting, getGameProgressFromUserSetting,
};
