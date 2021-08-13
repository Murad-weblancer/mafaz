console.log('menu');

class Slider {
  constructor(option) {
    this.slider = option.parent;
    this.sliderList = this.slider.querySelector('.slider__items');
    this.sliderItems = this.slider.querySelectorAll('.slider__items--slide');
    this.activeSlide = 0;
    this.moveSlide = 100;
    this.timeMove = option.time == undefined ? 1000 : option.time;
    this.interval = option.intervalSlide == undefined ? this.timeMove + 1000 : option.intervalSlide;
    this.dir = option.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.createDots = option.createDots;

    if (this.createDots == 'true') {
      this.ul = document.createElement('ul');
      this.ul.classList.add('slider__dots');
      this.sliderItems.forEach(() => {
        const li = document.createElement('li');
        this.ul.appendChild(li);
      });
      this.slider.appendChild(this.ul);
      this.dots = this.slider.querySelectorAll('.slider__dots li');
      this.dots[this.activeSlide].classList.add('active');
      this.dots.forEach((dot, key) => {
        dot.addEventListener('click', () => {
          this.controlsDots(key);
        });
      });
      this.active = true;
    }

    if (option.autoPlay == 'true') {
      let autoPlaySlider = setInterval(() => {
        this.move();
      }, this.interval);
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlaySlider);
      });
      this.slider.addEventListener('mouseleave', () => {
        autoPlaySlider = setInterval(() => {
          this.move();
        }, this.interval);
      });
    }

    this.sliderItems.forEach((slide, i) => {
      if (i != this.activeSlide) {
        slide.style = `transform: translate${this.dir}(${this.moveSlide}%)`;
      }

      if (i == this.sliderItems.length - 1) {
        slide.style = `transform: translate${this.dir}(-${this.moveSlide}%)`;
      }
    });
  }

  move() {
    this.sliderItems.forEach((slide, i) => {
      if (i != this.activeSlide) {
        slide.style = `transform: translate${this.dir}(${this.moveSlide}%)`;
      }
    });
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style = `transform: translate${this.dir}(${-this.moveSlide}%); transition: ${this.timeMove}ms`;

      if (this.createDots == 'true') {
        this.dots[this.activeSlide].classList.remove('active');
      }

      this.activeSlide++;

      if (this.activeSlide >= this.sliderItems.length) {
        this.activeSlide = 0;
      }

      this.sliderItems[this.activeSlide].style = `transform: translate${this.dir}(${0}%); transition: ${this.timeMove}ms`;

      if (this.createDots == 'true') {
        this.dots[this.activeSlide].classList.add('active');
      }
    }, this.timeMove + 200);
  }

  controlsDots(dotsKey) {
    if (this.active && dotsKey != this.activeSlide) {
      this.sliderItems.forEach(slide => {
        slide.style.transition = '0ms';
      });
      this.active = false;
      this.dots.forEach(dot => {
        dot.classList.remove('active');
      });
      let moveLeftOrRight = dotsKey > this.activeSlide ? -this.moveSlide : this.moveSlide;
      this.sliderItems[dotsKey].style.transform = `translate${this.dir}(${-moveLeftOrRight}%)`;
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${moveLeftOrRight}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.remove('active');
        this.activeSlide = dotsKey;
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.add('active');
      }, 100);
      setTimeout(() => {
        this.active = true;
      }, this.timeMove + 100);
    }
  }

}

const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
  let dir = slider.hasAttribute('data-direction') ? slider.getAttribute('data-direction') : 'X';
  let interval = slider.hasAttribute('data-interval') ? Number(slider.getAttribute('data-interval')) : undefined;
  let dots = slider.hasAttribute('data-dots') ? slider.getAttribute('data-dots') : 'false';
  let Play = slider.hasAttribute('data-playSlider') ? slider.getAttribute('data-playSlider') : 'false';
  new Slider({
    parent: slider,
    time: 1000,
    intervalSlide: interval,
    direction: dir,
    createDots: dots,
    autoPlay: Play
  });
});
const tabsLi = document.querySelectorAll('.single__images--min li');
const imgBig = document.querySelector('.single__images--big img');
tabsLi.forEach((li, key) => {
  li.addEventListener('click', function () {
    const srcImg = li.querySelector('img').getAttribute('src');
    tabsLi.forEach(item => {
      item.classList.remove('active');
    });
    li.classList.add('active');
    imgBig.setAttribute('src', srcImg);
  });
});

const burger = document.querySelector('.navbar__btn');
const menu = document.querySelector('.navbar__menu');

burger.addEventListener('click', function () {
  burger.classList.toggle('active')
  menu.classList.toggle('active')
})

const modalVhod = document.querySelector('.user');
const modal = document.querySelector('.modal__one');
const modalcontent = document.querySelector('.modal__one-content');
const btnSub = document.querySelector('.btn-submit');
const close = document.querySelector('.close');

// modalVhod.addEventListener('click', function () {
//   modal.style.display = 'flex';
//   setTimeout(() => {
//     modalcontent.style.top = 0;
//   }, 300);
// };
modalVhod.addEventListener('click', function () {
  modal.style.display = 'flex';
  setTimeout(() => {
    modalcontent.style.top = 0;
  }, 300);
});
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
btnSub.addEventListener('click', function () {
  location.reload();
  modal.style.display = 'none';
});
close.addEventListener('click', function () {
  modal.style.display = 'none';
})