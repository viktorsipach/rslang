const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');
console.log(token);
console.log(userId);

async function getUserWord({ wordId }) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      }
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content;
    }   
    return undefined;
  } catch (error) {
    return error;
  }  
};

async function createUserWord({ wordId, word }) {
  const userWord = await getUserWord({wordId});
  if (userWord === undefined) {
    try {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      });
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        return content;
      }
      return undefined;
    } catch (error) {
      return error;
    } 
  }
  return undefined;
};

async function updateUserWord({ wordId, word }) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  } 
};

async function deleteUserWord({ wordId }) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return rawResponse;
  } catch (error) {
    return error;
  }
};

async function getAllUserWords() {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;    
  }  
};

export { createUserWord, updateUserWord, deleteUserWord, getUserWord, getAllUserWords };
