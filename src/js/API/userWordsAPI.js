async function getUserWord({ wordId }) {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
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
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
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
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
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
    console.log(`UPDATE user word`);
    console.log(content);
    return content;
  } catch (error) {
    return error;
  } 
};

async function deleteUserWord({ wordId }) {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
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
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
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
