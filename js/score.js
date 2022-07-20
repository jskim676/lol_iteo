function score(team) {
  const scoreBar = document.createElement('div');

  if(team.children.length<5) {
    team.appendChild(scoreBar);
  }
}

function gameTime(barValue, timeValue) {
  let time = 120;
  let min = "";
  let sec = "";
  
  let barPercent = 100;
  barValue.style.width = `${barPercent}%`;
  let percentValue = barPercent/time;
  let percentMultiply = 0;
  
  let timer = setInterval(function() {
    percentMultiply++;
    barValue.style.transition = "1s";
    barValue.style.width = `${barPercent - percentValue*percentMultiply}%`;

    time--;
    min = parseInt(time/60);
    sec = time % 60;
    if(sec < 10) sec = "0" + sec;
    timeValue.innerHTML = min + " : " + sec ;

    if(time<0) {
      clearInterval(timer);
      timeValue.innerHTML = "시간 종료";
      // alert('시간 종료');
      playState = false;
      backDropFilter.classList.add('hidden');
      squareIcon.classList.remove('hidden');
    }
  }, 1000);
}


// export {score , gameTime};