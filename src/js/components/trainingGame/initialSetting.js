const currentDate = (new Date()).toLocaleString();

const initialSettings = {
  training: {
    level: 1,
    round: 1,
    maxCardsPerDay: 15,
    amountOfLearnedWordsPerDay: 0,
    date: currentDate,
    cardSettings: {
      showTranslation: true,
      showExplanationSentence: true,
      showExampleSentence: true,
      showTranscription: true,
      showAssociatedPicture: true
    },
    autoPronunciation: true,
    showSentencesTranslation: true,
    showIDontKnowButton: true,
    showDeleteButton: true,
    showHardButton: true,
    newWordsOnly: true,
    learnedWordsOnly: true,
  },
}

export default initialSettings;