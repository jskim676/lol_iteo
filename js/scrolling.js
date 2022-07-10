import { sectionHeight, indi } from "./script.js";

function scrolling (height, target) {
  window.addEventListener('wheel',e=> {
    let winY = window.pageYOffset;
    if(winY > height) {
      target.classList.remove('hidden');
      target.classList.add('animationY');
    } else {
      target.classList.add('hidden');
      target.classList.remove('animationY');
    }
    
    if(winY > sectionHeight*5/3) {
      indi.classList.remove('hidden');
      indi.classList.add('animationX');
    } else {
      indi.classList.add('hidden');
      indi.classList.remove('animationX');
    }
  });
}

export default scrolling