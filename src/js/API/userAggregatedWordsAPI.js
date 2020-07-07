export default async function getFilteredUserWords(filter, wordsPerPage) {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      }
    });
    if (!rawResponse.ok) {
      return undefined;
    }
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }  
};
