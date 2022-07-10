const championChoice = document.querySelectorAll('#championChoice > div > img')
const lanePosition = document.getElementById('lanePosition');
const randomLoadScreenData = [];
const reroll = document.getElementById('reroll');
const rerollBtn = document.querySelector('#reroll > div');

for(let i=0; i<skinAllData.length; i++) {
  if(skinAllData[i].id%1000 === 0) {
    randomLoadScreenData.push(skinAllData[i].loadScreenPath);
  }
}

// 마음에 들지않는 챔피언이 나왔다면 다시 기회를 얻을 수 있다.
let rerollValue = 4;
let turnValue = 0;
rerollBtn.addEventListener('click',function() {
  rerollValue--;
  if(rerollValue >= 0 ) {
    turnValue++;
    rerollBtn.children[0].style.transform = `rotate(${turnValue}turn)`;
    rerollBtn.children[0].style.transition= "0.5s";
    let lsData = [];
    while(lsData.length < 5) {
      idx = Math.floor(Math.random()*randomLoadScreenData.length);
      if(lsData.indexOf(idx)<0) {
        // lsData.push(randomLoadScreenData[idx]);
        lsData.push(idx);
      }
    }
      for(let j=0; j<championChoice.length; j++) {
        championChoice[j].classList.remove('hidden');
        
        let lowerCaseLsPath = randomLoadScreenData[lsData[j]].toLowerCase();
        let lsIllust = lowerCaseLsPath.slice(lowerCaseLsPath.indexOf("assets/")+7, lowerCaseLsPath.length);

        championChoice[j].src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/" + lsIllust;
      
        reroll.children[1].textContent = `현재 남은 리롤의 횟수는 ${rerollValue}번 입니다`;
    }
  }
});


// 챔피언의 위치를 옮기며 조합을 구성할 수 있다.
document.addEventListener('DOMContentLoaded', (event) => {
  let dragChamp = null;
  
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragChamp = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('img', this.src);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragChamp != this) {
      dragChamp.src = this.src;
      this.src = e.dataTransfer.getData('img');
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    champs.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  let champs = Array.from(championChoice);
  champs.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});
