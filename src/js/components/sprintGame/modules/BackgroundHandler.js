import SprintBackground from '../../../../assets/img/sprint/space-trail.jpg';

function setBackgroundImage(parentSelector) {
  const parent = document.querySelector(`${parentSelector}`);
  const backgroundImage = new Image();
    backgroundImage.src = SprintBackground;
    backgroundImage.addEventListener('load', () => {
      parent.style.backgroundImage = `linear-gradient(0deg, rgba(255,255,255,1) 1%, rgba(255,255,255,0.4) 14%), url(${backgroundImage.src})`;
    });
}

export default {
  setBackgroundImage,
};
