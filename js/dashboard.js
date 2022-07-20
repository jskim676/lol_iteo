const loginBtn = document.getElementById('loginBtn');
// 아이디값이 확인되고 비밀번호 값에 엔터가 눌릴시 데이터 보내주기
function pwPrintName () {
  const idInputAnswer = document.getElementById('idInputAnswer');
  const pwInputAnswer = document.getElementById('pwInputAnswer');
  const loginScreen = document.getElementById('loginScreen');
  const changeLoginScreen = document.getElementById('changeLoginScreen');
  const idAppear = document.getElementById('idAppear');
  const greeting = document.getElementById('greeting');
  let userName = idInputAnswer.value;
  if(idInputAnswer.value !== "" & pwInputAnswer.value !== "") {
    idAppear.textContent = userName;
    greeting.textContent = "님 반갑습니다";
    idAppear.classList.add('animation-YFast');
    greeting.classList.add('animation-YFast');
    idAppear.style.transition = "1s";
    greeting.style.transition = "1s";
    idInputAnswer.value = null;
    setTimeout(()=>{greeting.style.opacity = 0;},3000)
    loginScreen.classList.add('hidden');
    changeLoginScreen.classList.remove('hidden');
    document.getElementById('myIcon').classList.remove('hidden');
    changeLoginScreen.children[0].children[0].src = document.getElementById('myIcon').children[0].src;
    changeLoginScreen.children[0].children[1].textContent = userName;
    for(let i=0; i<changeLoginScreen.children.length; i++) {
      changeLoginScreen.children[i].classList.add('animation-YFast');
    }
  }
}
loginBtn.addEventListener('click', function() {
  pwPrintName();
});



function rankGame (target) {
  target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/06_diamond/images/diamond_baseface_matte.png";
  
  let totalGame = Math.floor(Math.random()*(150-100)+100);
  let winRate = Math.floor(Math.random()*(100-50)+50);
  target.nextElementSibling.children[1].textContent = `${Math.floor(100*winRate/totalGame)}% ${totalGame}전 ${winRate}승 ${totalGame-winRate}패`;
}

const rank = {
  solo : document.getElementById('soloRank'),
  team : document.getElementById('teamRank')
}
rankGame(rank.solo); rankGame(rank.team);
