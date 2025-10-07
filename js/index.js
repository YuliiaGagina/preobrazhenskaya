(function(){

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const main = document.getElementById("main");

  if (!preloader || !main) return; // если элементов нет — выйти

  if (!sessionStorage.getItem("preloaderShown")) {
    setTimeout(() => {
      preloader.style.display = "none";
      main.style.display = "block";
      sessionStorage.setItem("preloaderShown", "true");
    }, 2000);
  } else {
    preloader.style.display = "none";
    main.style.display = "block";
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

    const setSlidePosition = () => {
      const slideWidth = slides[0].offsetWidth;
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    };

    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
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

    // === SWIPE ===
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    slider.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    slider.addEventListener("touchmove", e => {
      if (!isSwiping) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        // горизонтальный свайп
        document.body.classList.add("no-scroll");
        e.preventDefault();
      }
    }, { passive: false });

    slider.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const delta = startX - endX;

      if (Math.abs(delta) > 50) {
        if (delta > 0) nextBtn.click();
        else prevBtn.click();
      }

      document.body.classList.remove("no-scroll");
      isSwiping = false;
    });

    window.addEventListener("resize", setSlidePosition);
    setSlidePosition();
  });

  // === TABS ===
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

