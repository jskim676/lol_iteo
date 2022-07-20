const teamMember = {
  skinA : document.getElementById('skinATeamMember'),
  skinB : document.getElementById('skinBTeamMember'),
  ggA : document.getElementById('ggATeamMember'),
  ggB : document.getElementById('ggBTeamMember'),
}

const skinATeamValue = document.getElementById('skinATeamValue');
const skinBTeamValue = document.getElementById('skinBTeamValue');
const ggATeamValue = document.getElementById('ggATeamValue');
const ggBTeamValue = document.getElementById('ggBTeamValue');
const teamValue = {
  skinA : document.getElementById('skinATeamValue'),
  skinB : document.getElementById('skinBTeamValue'),
  ggA : document.getElementById('ggATeamValue'),
  ggB : document.getElementById('ggBTeamValue')
}

const skinTimeValue = document.getElementById('skinTimeValue');
const skinTimeBar = document.getElementById('skinTimeBar');
const ggTimeValue = document.getElementById('ggTimeValue');
const ggTimeBar = document.getElementById('ggTimeBar');

const teamScore = {
  skinA : document.getElementById('skinATeamScore'),
  skinB : document.getElementById('skinBTeamScore'),
  ggA : document.getElementById('ggATeamScore'),
  ggB : document.getElementById('ggBTeamScore'),
}

//챔피언의 일러스트 중 기본 스킨을 제외한 나머지 스킨을 배열안에 넣어 불러오는 형식 
const skinAjax = new XMLHttpRequest();
const skinURL = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1/skins.json`;
skinAjax.open('GET', skinURL, false);
skinAjax.send();
const champions = JSON.parse(skinAjax.response);
const skinAllData = Object.values(champions);
let skinImg = document.getElementById('skinImg');
const backDropFilter = document.getElementById('backDropFilter');

// 스킨 문제 출제
const nextSkin = () => {
  let skinData = [];
  for(let j=0; j<skinAllData.length; j++) {
    if(skinAllData[j].isBase !== true) {
      skinData.push(skinAllData[j]);
    }
  }
  let skinQuizRoute = skinData[Math.floor(Math.random()*skinData.length)].splashPath;
  let skinIllust = skinQuizRoute.slice(skinQuizRoute.indexOf("v1/")+3, skinQuizRoute.length);
  let skinAnswer = parseInt(skinQuizRoute.slice(skinQuizRoute.lastIndexOf("/")+1, skinQuizRoute.length-4));
  skinImg.children[0].src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/" + skinIllust;
  backDropFilter.classList.remove('hidden');

  return [skinData , skinAnswer];
}

let skinData = nextSkin()[0];
let skinAnswer = nextSkin()[1];


// 시작 버튼 클릭시 스킨 이미지가 나타남
const skinPlayBtn = document.getElementById('skinPlayBtn');
let playState = true;
skinPlayBtn.addEventListener('click', function() {
  if(playState === true) {
    skinImg.classList.remove('hidden');
    skinTimeValue.innerHTML = "2 : 00";
    gameTime(skinTimeBar, skinTimeValue);
    playState = null;
  } else if(playState === false) {
    setTimeout(()=> { nextSkin() , skinAnswer = nextSkin(), gameTime(skinTimeBar, skinTimeValue)}, 2000);
    skinTimeValue.innerHTML = "2 : 00";
    playState = null;
  }
});
  
// 답을 쓰게 되면 채팅창에 표기되며 정답일시 블러가 제거되고 맞춘 팀의 점수가 오름
function skinPrintName () {
  for(let j=0; j<skinData.length; j++) {
    if(skinData[j].id === skinAnswer) {
      console.log(skinData[j].name);
      const skinInputAnswer = document.getElementById('skinInputAnswer').value;
      const skinAppearAnswer = document.getElementById('skinAppearAnswer');
      if(skinAppearAnswer.children.length >= 0) {
        const answerBox = document.createElement('div');
        skinAppearAnswer.appendChild(answerBox);
        answerBox.classList.add('answerBox');
        answerBox.innerText = skinInputAnswer;
        if(teamMember.skinA.classList.contains('consistOf')) {answerBox.classList.add('redteam')}
        if(teamMember.skinB.classList.contains('consistOf')) {answerBox.classList.add('blueteam')}

        if(skinData[j].name === skinInputAnswer) {
          backDropFilter.classList.add('hidden');
          alert('정답입니다');
          setTimeout(()=> { nextSkin() , skinAnswer = nextSkin()[1];}, 1500);
          if(teamMember.skinA.classList.contains('consistOf')) {
            score(teamScore.skinA);
            teamValue.skinA.innerText = `${teamScore.skinA.children.length} / 5`;
          } else if (teamMember.skinB.classList.contains('consistOf')){
            score(teamScore.skinB);
            teamValue.skinB.innerText = `${teamScore.skinB.children.length} / 5`;
          }
        }
        if(teamScore.skinA.children.length === 5 || teamScore.skinB.children.length === 5 ){
          alert('게임 종료');
          skinImg.classList.add('hidden');
          playState = false;
        }
      }
    }
  }
}