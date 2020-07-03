const settings = {
  newWordsPerDay: 5,
  maxCardsPerDay: 7,
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
}

export default function getUserSettings() {
  return settings;
}