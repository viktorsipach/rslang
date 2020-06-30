async function getRoundData(level, round, wordsPerRound) {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level - 1}&page=${round - 1}&wordsPerExampleSentenceLTE=25&wordsPerPage=${wordsPerRound}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(error) {
    return {error};
  }
}

async function getSCustomRoundData(level, round, wordsPerSentence, wordsPerRound) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level - 1}&page=${round - 1}&wordsPerExampleSentenceLTE=${wordsPerSentence}&wordsPerPage=${wordsPerRound}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getRoundsAmountInLevel(level, wordsPerSentence, wordsPerRound) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words/count?group=${level - 1}&wordsPerExampleSentenceLTE=${wordsPerSentence}&wordsPerPage=${wordsPerRound}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.count;
}

export { getRoundData, getSCustomRoundData, getRoundsAmountInLevel };
