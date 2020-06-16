import SprintBackground from '../../../../assets/img/sprint/pencils_ashley-edwards.jpg';

function setBackgroundImage(parentSelector) {
  const parent = document.querySelector(`${parentSelector}`);
  const backgroundImage = new Image();
    backgroundImage.src = SprintBackground;
    backgroundImage.addEventListener('load', () => {
      parent.style.backgroundImage = `linear-gradient(0deg, rgba(255,255,255,1) 7%, rgba(255,255,255,0.4) 27%), url(${backgroundImage.src})`;
    });
}

export default {
  setBackgroundImage,
};
