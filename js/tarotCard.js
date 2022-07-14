function tarotCard () {
  function todayDate () {
    const today = document.getElementById('today');
    
    // 오늘의 날짜
    let day = new Date();   
    let year = day.getFullYear();
    let month = ('0' + (day.getMonth() + 1)).slice(-2);
    let date = ('0' + day.getDate()).slice(-2);
    today.textContent = `${year + '-' + month + '-' + date}`;
  }

  todayDate();

  const tarotCard = document.querySelector('#tarotCard > div:nth-child(1)');
  const tarotBtn = document.getElementById('tarotBtn');
  const tarotResult = document.querySelector('#tarotCard > div:nth-child(2)');
  
  for(let i=0; i<22; i++) {
    const cardDefault = document.createElement('img');
    tarotCard.appendChild(cardDefault);
    cardDefault.setAttribute('data-card',`${i}`);
    cardDefault.src = "./img/tarotCard/cardDefault.png";
  }
  
  const card = tarotCard.children;
  let cardIndex = Math.floor(Math.random()*card.length);
  let cardState = false;
  
  // 카드의 위치,각도
  for(let i = 0; i < tarotCard.children.length; i++) {
    function position () {
      card[i].style.zIndex = i;
      card[i].style.left = `${i*1.6}vw`;
      
      card[i].style.transform = `rotate(${(i-10)}deg)`;
      
      if(i<11) {
        card[i].style.bottom = `${2*i/25}vh`;
      } else {
        card[i].style.bottom = `${(2*(card.length-1-i))/25}vh`;
      }
    }
    position();
      
    tarotCard.addEventListener('dblclick',function(e) {
      cardState = true;
      let getDataset = e.target.dataset.card;
      if(card[i].dataset.card === getDataset) {
        card[i].style.bottom = "12vh";
        card[i].style.transition = "0.3s";
        card[i].style.transform = "rotate(0deg)";
        card[i].style.zIndex = tarotCard.children.length;
      } else {
        position();
      }
    });
      
    // 타로카드의 결과
    tarotBtn.addEventListener('click',function() {
      const sectionTarotCard = document.querySelector('#section-tarotCard > div')
      if(cardState === true) {
        tarotCard.classList.add('on');
        sectionTarotCard.classList.add('tarotBgc');
        sectionTarotCard.style.transition = "1s";
        console.log(tarotResult.children[i]);
        tarotResult.children[i].style.opacity = 1;
        tarotResult.children[cardIndex].style.opacity = 1;
        tarotResult.children[cardIndex].style.zIndex = 2;
        let rotate = [0, 180];
        tarotResult.children[cardIndex].style.transform = `rotate(${rotate[Math.floor(Math.random()*2)]}deg)`;
        setTimeout(()=>{tarotResult.classList.remove('on'), document.querySelector('#tarotCard > div:nth-child(3)').children[cardIndex].classList.remove('on')},700);
      }
    });
  };
}

export default tarotCard