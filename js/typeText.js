function typeText () {
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');
  
  const color = ["rgb(83, 131, 232)", "rgb(223, 187, 102)", "rgb(180, 16, 16)", "rgb(205, 209, 255)"]
  const textArray = ["OP.GG", "FOW.KR", "INVEN", "LOL.ITEO"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 700;
  let textArrayIndex = 0;
  // 단어 선택 숫자
  let charIndex = 0;
  // 단어철자 선택 숫자
  
  // 글자 추가
  const create = () => {
    if (charIndex < textArray[textArrayIndex].length) {
      // 단어의 철자 총 갯수가 철자 선택숫자보다 크다면 
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      // typing 이라는 클래스가 존재하지 않으면 추가해줘
      typedTextSpan.style.color = color[textArrayIndex];
      // 추가되는 글자의 색깔은 color 변수에서 대입
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      // 글자 내용에 한글자씩 대입
      charIndex++;
      // 철자 선택 숫자 증가
      setTimeout(create, typingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  
  // 글자 지우기
  const erase = () => {
    if (textArrayIndex===textArray.length-1){
        return console.log('Hello, world!');
    }
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      // typing 이라는 클래스가 존재하지 않으면 추가해줘
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      // 
      charIndex--;
      setTimeout(erase, erasingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      setTimeout(create, typingDelay + 1100);
    }
  }
  
  // 문서가 실행될때 실행
  document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(create, newTextDelay + typingDelay);
  });
}

export default typeText