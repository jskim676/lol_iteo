import { teamMember , summoner } from "./script.js";

function allIcon () {
  const myIcon = document.getElementById('myIcon');
  const iconAjax = new XMLHttpRequest();
  const iconURL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons.json";
  iconAjax.open('GET', iconURL, true);
  iconAjax.send();
  
  setTimeout(()=>{
    const summonericon = JSON.parse(iconAjax.response);
    const iconlist = Array.from(summonericon);
    const iconValue = [];
    
    // 아이콘데이터들을 내 변수에 담는다.
    for(let i=0; i<summonericon.length; i++) {
      if(iconlist[i].iconPath !== undefined) {
        iconValue.push(iconlist[i].iconPath);
      }
    }
    
    // 소환사 아이콘을 불러와 배치시킨다.
    for(let j=0; j<summoner.children.length; j++) {
      let iconData = iconValue[Math.floor(Math.random()*iconValue.length)];
      let iconIllust = iconData.slice(iconData.indexOf("v1/")+3, iconData.length);
      summoner.children[j].src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/" + iconIllust;
    }
    
    // 팀을 선택할 시에 소환사 아이콘이 이동되며 그 팀에 속해지는 걸로 된다.
    const teamSelection = (team1, team2) => {
      myIcon.children[0].src = summoner.children[0].src;
      teamMember.skinA.children[0].children[0].src = myIcon.children[0].src;
      teamMember.ggA.children[0].children[0].src = myIcon.children[0].src;
      team1.addEventListener('click',(event)=> {
        team1.classList.add('consistOf');
        team2.classList.remove('consistOf');
        let getDataset = event.target.dataset.icon;
        for(let k=0; k<team1.children.length; k++) {
          team2.children[k].children[0].classList.add('hidden');
          if(team1.children[k].dataset.icon === getDataset) {
            team1.children[k].children[0].src = myIcon.children[0].src;
            team1.children[k].children[0].classList.remove('hidden');
          } else {
            team1.children[k].children[0].classList.add('hidden');
          }
        }
      });
    }
    
    teamSelection(teamMember.skinA, teamMember.skinB); teamSelection(teamMember.skinB, teamMember.skinA); 
    teamSelection(teamMember.ggA, teamMember.ggB); teamSelection(teamMember.ggB, teamMember.ggA); 
  },1000);
};

export default allIcon
