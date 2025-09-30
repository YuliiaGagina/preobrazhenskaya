(function(){
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = menu.querySelector('.overlay__close');
  const ctaBtn = menu.querySelector('.overlay__cta-mob'); // кнопка "Связаться"
  const panelLinks = menu.querySelectorAll('.overlay__panel a'); // все ссылки меню
  let lastFocused = null;

  function open(){
    lastFocused = document.activeElement;
    menu.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeBtn.focus({preventScroll:true});
    document.addEventListener('keydown', onKey);
  }
  function close(){
    menu.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if (lastFocused) {
      lastFocused.focus({preventScroll:true});
    }
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){ if(e.key==='Escape') close(); }

  if (burger) burger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  // ✅ закрытие по кнопке "Связаться"
  if (ctaBtn) {
    ctaBtn.addEventListener('click', close);
  }

  // ✅ закрытие по клику на любую ссылку меню
panelLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault(); // отменяем стандартный
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' }); // плавный скролл
      }
      close();
    }
  });
});

  // ✅ закрытие по клику вне панели (фон)
  menu.addEventListener('click', (e)=>{
    if(e.target===menu) close();
  });
})();





document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const sliders = document.querySelectorAll(".slider");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove("is-active"));
      sliders.forEach(s => s.classList.remove("is-active"));

      tab.classList.add("is-active");
      document.getElementById(target).classList.add("is-active");
    });
  });

  sliders.forEach(slider => {
    const track = slider.querySelector(".slider__track");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".slider__btn.prev");
    const nextBtn = slider.querySelector(".slider__btn.next");

    let index = 0;
    let slideCount = slides.length;

    // Clone for infinite
    const first = slides[0].cloneNode(true);
    const last = slides[slideCount - 1].cloneNode(true);
    track.appendChild(first);
    track.insertBefore(last, slides[0]);
    const newSlides = slider.querySelectorAll(".slide");
    let currentIndex = 1;

    const update = (animate = true) => {
      const width = slider.clientWidth;
      if (!animate) track.style.transition = "none";
      else track.style.transition = "transform 0.5s ease";
      slideWidth = slider.clientWidth; 
      track.style.transform = `translateX(-${width * currentIndex}px)`;
    };

    update(false);

    nextBtn.addEventListener("click", () => {
      if (currentIndex < newSlides.length - 1) {
        currentIndex++;
        update();
        if (currentIndex === newSlides.length - 1) {
          setTimeout(() => {
            currentIndex = 1;
            update(false);
          }, 500);
        }
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        update();
        if (currentIndex === 0) {
          setTimeout(() => {
            currentIndex = slideCount;
            update(false);
          }, 500);
        }
      }
    });

    // Swipe
    let startX = 0;
    slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    slider.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextBtn.click();
      else if (endX - startX > 50) prevBtn.click();
    });

    window.addEventListener("resize", () => update(false));
  });







});

