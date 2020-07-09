const currentDate = (new Date()).toLocaleString();

const initialSettings = {
  training: {
    mainSettings: {
      level: 1,
      round: 1,
      amountOfLearnedWordsPerDay: 0,
      date: currentDate,
    },
    settingsPage: {
      maxCardsPerDay: 15,
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
    trainingProgress: {
      amountOfRepeatedWordsPerDay: 0,
      seriesOfCorrectAnswers: 0,
      longestSeriesOfCorrectAnswers: 0,
      allCorrectAnswersAmount: 0,
    }
  },
}

export default initialSettings;