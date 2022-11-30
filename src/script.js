gsap.registerPlugin(ScrollTrigger);
const barBtnsEl = document.querySelectorAll('.bar-btn');
const barEl = document.querySelector('.bar');
const topEl = document.querySelector('.top');
const heroEl = document.querySelector('.hero__sidebar');
const titlesEl = document.querySelectorAll('.title');
const saveCardsEl = document.querySelectorAll('.save__cards__card');
const herosEl = document.querySelectorAll('.hero__sidebar__item');
const heroBtnLeftEl = document.querySelector('.hero__arrow--left');
const heroBtnRightEl = document.querySelector('.hero__arrow--right');
const partnersEl = document.querySelectorAll('.partner__item');
const partnerdotsContainerEl = document.querySelector('.partner__dots');
const newsCardsEl = document.querySelectorAll('.news__cards');
const newsDotsContainerEl = document.querySelector('.news__dots');

let heroIndex = 0;
let partnersIndex = 0;
let newsIndex = 0;
let windowWidth = window.innerWidth;

const heroMaxIndex = herosEl.length - 1;
const partnersMaxIndex = partnersEl.length - 1;
const newsMaxIndex = newsCardsEl.length - 1;

(function set() {
  for (let i = 0; i <= partnersMaxIndex; i++) {
    const dotEl = document.createElement('div');
    dotEl.classList.add('partner--dot');
    dotEl.classList.add('dot');
    if (partnersIndex === i) {
      dotEl.classList.add('dot--active');
    }
    partnerdotsContainerEl.append(dotEl);
  }
  for (let i = 0; i <= newsMaxIndex; i++) {
    const dotEl = document.createElement('div');
    dotEl.classList.add('news--dot');
    dotEl.classList.add('dot');
    if (newsIndex === i) {
      dotEl.classList.add('dot--active');
    }
    newsDotsContainerEl.append(dotEl);
  }
})();

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  setBarPosition();
});

const partnerDotsEl = document.querySelectorAll('.partner--dot');
const newsDotsEl = document.querySelectorAll('.news--dot');

gsap.to('.header', {
  backgroundColor: '#2d3134',
  scrollTrigger: {
    toggleActions: 'play pause resume reset',
  },
});

gsap.to(topEl, {
  display: 'block',
  scrollTrigger: {
    toggleActions: 'play pause resume reset',
  },
});

createScroll({ element: '.connectionus', start: '80%', moveY: true });
createScroll({ element: '.help__cards', start: '90%', moveY: true });
createScroll({ element: '.number--save', start: '80%', number: 50 });
createScroll({ element: '.number--team', start: '80%', number: 30 });
createScroll({ element: '.number--daily', start: '80%', number: 25 });
createScroll({ element: '.number--partners', start: '80%', number: 60 });

titlesEl.forEach((titleEl) => {
  createScroll({ element: titleEl, start: '60%', moveY: true });
});
saveCardsEl.forEach((saveCardEl) => {
  createScroll({ element: saveCardEl, start: '60%', moveY: true });
});

topEl.addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

barBtnsEl.forEach((barBtnEl) => {
  barBtnEl.addEventListener('click', () => {
    const barTransform = barEl.style.transform;
    if (barTransform.includes('100%')) {
      toggleShowBar('0%');
    } else {
      if (windowWidth < 768) {
        toggleShowBar('-100%');
      } else {
        toggleShowBar('100%');
      }
    }
    barEl.classList.toggle('show-bar');
  });
});

heroBtnLeftEl.addEventListener('click', () => {
  if (heroIndex === heroMaxIndex) {
    heroIndex = 0;
  } else {
    heroIndex++;
  }
  sliderMove(herosEl, heroIndex);
});

heroBtnRightEl.addEventListener('click', () => {
  if (heroIndex === 0) {
    heroIndex = heroMaxIndex;
  } else {
    heroIndex--;
  }
  sliderMove(herosEl, heroIndex);
});

partnerDotsEl.forEach((dotEl, index) => {
  dotEl.addEventListener('click', () => {
    partnersIndex = index;
    removeDotsClass(partnerDotsEl);
    dotEl.classList.add('dot--active');
    sliderMove(partnersEl, partnersIndex);
  });
});

newsDotsEl.forEach((dotEl, index) => {
  dotEl.addEventListener('click', () => {
    newsIndex = index;
    removeDotsClass(newsDotsEl);
    dotEl.classList.add('dot--active');
    sliderMove(newsCardsEl, newsIndex);
  });
});

function sliderMove(currentEl, currentIndex) {
  currentEl.forEach((el, index) => {
    el.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
  });
}
sliderMove(herosEl, heroIndex);
sliderMove(partnersEl, partnersIndex);
sliderMove(newsCardsEl, newsIndex);

function removeDotsClass(currentEl) {
  currentEl.forEach((dotEl) => {
    dotEl.classList.remove('dot--active');
  });
}

function setBarPosition() {
  if (windowWidth < 768) {
    barEl.style = 'left:0;';
    toggleShowBar('-100%');
    return;
  }
  barEl.style = 'right:0;';
  toggleShowBar('100%');
}
setBarPosition();

function toggleShowBar(unit) {
  barEl.style.transform = `translateX(${unit})`;
}

function createScroll(obj) {
  const animation = obj.moveY ? moveY(obj.element) : '';
  ScrollTrigger.create({
    trigger: obj.element,
    start: `top ${obj.start}`,
    toggleActions: 'play pause none none',
    animation,
    onEnter: () => {
      if (!obj.number) return;
      countNumber(obj.element, obj.number);
    },
  });
}

function moveY(element) {
  return gsap.to(element, {
    y: 0,
    opacity: 1,
  });
}

function countNumber(element, number) {
  let Cont = { val: 0 };
  const elementEl = document.querySelector(element);
  TweenLite.to(Cont, 5, {
    val: number,
    roundProps: 'val',
    onUpdate: () => {
      elementEl.innerHTML = Cont.val;
    },
  });
}
