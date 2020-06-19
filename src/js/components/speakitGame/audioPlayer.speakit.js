const playAudio = (audioLink) => {
    const audio = new Audio(audioLink);
    audio.play()
};
export default  playAudio;