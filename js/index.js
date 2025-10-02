(function(){

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("preloaderShown")) {
    // Прелоадер показывается впервые
    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("main").style.display = "block";
      sessionStorage.setItem("preloaderShown", "true");
    }, 2000); // 2 секунды
  } else {
    // Прелоадер уже показывался — скрываем сразу
    document.getElementById("preloader").style.display = "none";
    document.getElementById("main").style.display = "block";
  }
});
  

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector('input[name="phone"]');

  const maskOptions = {
    mask: '+{380} 00 000 0000',
    lazy: false, // показывает +380 всегда
    placeholderChar: '_',
  };

  IMask(phoneInput, maskOptions);
});

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
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    const track = slider.querySelector(".slider__track");
    const slides = Array.from(track.children);
    const prevBtn = slider.querySelector(".slider__btn.prev");
    const nextBtn = slider.querySelector(".slider__btn.next");

    let currentIndex = 0;
    const totalSlides = slides.length;

    const setSlidePosition = () => {
      const slideWidth = slides[0].offsetWidth;
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    };

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        setSlidePosition();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        setSlidePosition();
      }
    });

    // Swipe (мобильный)
    let startX = 0;
    slider.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", e => {
      const delta = startX - e.changedTouches[0].clientX;
      if (delta > 50) nextBtn.click();
      else if (delta < -50) prevBtn.click();
    });

    window.addEventListener("resize", setSlidePosition);
    setSlidePosition();
  });

  // Табы (тоже не трогаем)
  const tabs = document.querySelectorAll(".tab");
  const slidersAll = document.querySelectorAll(".slider");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove("is-active"));
      slidersAll.forEach(s => s.classList.remove("is-active"));

      tab.classList.add("is-active");
      document.getElementById(target).classList.add("is-active");
    });
  });
});
