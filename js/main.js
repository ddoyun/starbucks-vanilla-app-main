/**
 * 검색창
 */
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/**
 * 페이지 스크롤에 따른 요소 제어
 */
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//_.throttle(함수, 시간) 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', _.throttle(function(){
  if(window.scrollY > 500){
    //gsap.to(요소, 지속시간, 옵션)
    //배지 숨기기
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //탑버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  }else{
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //탑버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
      scrollTo: 0
    });
});

/**
 * 메인 배너 이벤트
 */
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl, index){
  //각 요소들을 순서대로 오픈
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7 > 1.4 > 2.1 > 2.8 식으로 반복
    //0부터 시작하지 않는 이유는 순차적으로 작동되는데, 0 * 0.7은 0이기 때문에 딜레이가 없기 때문에
    opacity: 1
  });
});

/**
 * 슬라이드 Swiper
 */
 new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
});
new Swiper('.promotion .swiper-container', {
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
});

/**
 * Promotion 슬라이드 토글 기능
 */
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
  isHidePromotion = !isHidePromotion
  if(isHidePromotion){
    promotionEl.classList.add('hide');
  }else{
    promotionEl.classList.remove('hide');
  }
});

/**
 * floating
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function floatingObject(selector, delay, size) {
  //gasp.to(요소, 시간, 옵션)
  gsap.to(selector, random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생
      ease: Power1.easeInOut // Easing 함수 적용
    }
  )
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리(감시)
 */
const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 //훅은 갈고리의 의미 > 해당하는 구간으로 진입시 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
});

/**
 * 년도 계산
 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();