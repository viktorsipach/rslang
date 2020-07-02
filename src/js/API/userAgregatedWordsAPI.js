const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');
console.log(token);
console.log(userId);

export default async function getUserCurrentWords(filter) {
  try {
    //const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/filter=${filter}`, {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?filter=${filter}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      }
    });
    console.log(rawResponse);
    if (!rawResponse.ok) {
      return false;
    }
    const content = await rawResponse.json();
    console.log(content);
    return content;
  } catch (error) {
    return error;
  }  
};
