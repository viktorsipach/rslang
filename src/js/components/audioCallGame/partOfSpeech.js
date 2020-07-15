export async function getPartSpeech(word) {
  const url = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default {getPartSpeech};