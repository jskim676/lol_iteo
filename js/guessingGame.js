const ggAjax = new XMLHttpRequest();
const squareURL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1/champion-summary.json";
ggAjax.open('GET', squareURL, false);
ggAjax.send();
const squareKey = JSON.parse(ggAjax.response).slice(1);
const squareIcon = document.getElementById('squareIcon');
const squareBtn = document.getElementById('squareBtn');


let hiddenData = true;
squareBtn.addEventListener('click',function() {
  if(hiddenData === true) {
    squareIcon.classList.remove('hidden');
    hiddenData = false;
  } else {
    squareIcon.classList.add('hidden');
    hiddenData = true;
  }
});


const ggPlayBtn = document.getElementById('ggPlayBtn');


ggPlayBtn.addEventListener('click', function() {
  if(playState === true) {
    setTimeout(()=> { const questionBox = document.createElement('div');  ggAppearAnswer.appendChild(questionBox); questionBox.innerText = "이 챔피언은 CC기가 있나요? 있다면 어떤 CC기가 있나요?";}, 1000);
    setTimeout(()=> { const questionBox = document.createElement('div');  ggAppearAnswer.appendChild(questionBox); questionBox.innerText = "이 챔피언은 마나 코스트를 사용하나요?";}, 5000);
    setTimeout(()=> { const questionBox = document.createElement('div');  ggAppearAnswer.appendChild(questionBox); questionBox.innerText = "이 챔피언은 이동기를 가지고 있나요?";}, 9000);
    setTimeout(()=> { const questionBox = document.createElement('div');  ggAppearAnswer.appendChild(questionBox); questionBox.innerText = "이 챔피언은 주로 어느 라인을 가는건가요?";}, 13000);


    squareIcon.classList.add('hidden');
    ggTimeValue.innerHTML = "2 : 00";
    gameTime(ggTimeBar, ggTimeValue);
    playState = null;
  } else if(playState === false) {
    setTimeout(()=> { nextGg() , skinAnswer = nextGg(), gameTime(ggTimeBar, ggTimeValue);}, 2000);
    skinTimeValue.innerHTML = "2 : 00";
    playState = null;
  }
  hiddenData = true;
});

// 챔피언 문제 출제
const nextGg = () => {
  let squareData = squareKey[Math.floor(Math.random()*squareKey.length)].squarePortraitPath;
  let squareIllust = squareData.slice(squareData.indexOf("assets/")+7,squareData.length);
  let squareAnswer = parseInt(squareData.slice(squareData.lastIndexOf("/")+1, squareData.length-4));
  squareIcon.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/" + squareIllust;
  squareIcon.classList.add('hidden');
  hiddenData = true;
  
  return squareAnswer
}

let squareAnswer = nextGg();
const ggInputAnswer = document.getElementById('ggInputAnswer').value;
const ggAppearAnswer = document.getElementById('ggAppearAnswer');

// 답을 쓰게 되면 채팅창에 표기되며 정답일시 블러가 제거되고 맞춘 팀의 점수가 오름
function ggPrintName () {
  for(let j=0; j<squareKey.length; j++) {
    if(squareKey[j].id === squareAnswer) {
      console.log(squareKey[j].name);
      if(ggAppearAnswer.children.length >= 0) {
        const answerBox = document.createElement('div');
        ggAppearAnswer.appendChild(answerBox);
        answerBox.classList.add('answerBox');
        answerBox.innerText = ggInputAnswer;
        if(teamMember.ggA.classList.contains('consistOf')) {answerBox.classList.add('redteam')}
        if(teamMember.ggB.classList.contains('consistOf')) {answerBox.classList.add('blueteam')}
        if(squareKey[j].name === ggInputAnswer) {
          squareIcon.classList.remove('hidden');
          alert('정답입니다');
          setTimeout(()=> { nextGg() , squareAnswer = nextGg();}, 2000);

          if(teamMember.ggA.classList.contains('consistOf')) {
            score(teamScore.ggA);
            ggATeamValue.innerText = `${teamScore.ggA.children.length} / 5`;
          } else if (teamMember.ggB.classList.contains('consistOf')){
            score(teamScore.ggB);
            ggBTeamValue.innerText = `${teamScore.ggB.children.length} / 5`;
          }
        }
        if(teamScore.ggA.children.length === 5 || teamScore.ggB.children.length === 5 ){
          alert('게임 종료');
          squareIcon.classList.add('hidden');
          playState = false;
        }
      }
    }
  }
}