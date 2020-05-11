window.onload=function(){

(function () {
    // Opening / closing navigation on mobile
    const toggleIcon = document.querySelector('.button-toggle');
    const buttonSearch = document.querySelector('.button-search');
  
    function toggleOpen() {
      const nav = document.querySelector('.nav');
      nav.classList.toggle('nav--open');
      toggleIcon.setAttribute('aria-expanded', nav.classList.contains('nav--open'));
    }
  
    function searchOpen() {
      const navSearchInput = document.querySelector('.nav__input');
      navSearchInput.classList.toggle('nav__input--visible');
      buttonSearch.setAttribute('aria-expanded', navSearchInput.classList.contains('nav__input--visible'));
    }
  
    toggleIcon.addEventListener('click', toggleOpen);
    buttonSearch.addEventListener('click', searchOpen);
  
  
    // SVG icons filling on hover
    const svgIcons = document.querySelectorAll('.socials__svg');
  
    function fill() {
      const child = this.querySelector('.socials__path');
      child.classList.add('socials__path--filled');
    }
  
    function removeFill() {
      const child = this.querySelector('.socials__path');
      child.classList.remove('socials__path--filled');
    }
  
    svgIcons.forEach(svg => svg.addEventListener('mouseleave', removeFill));
    svgIcons.forEach(svg => svg.addEventListener('mouseover', fill));
  

  
  
    // Smooth scrolling
    const root = $('html, body');
    const navLowHeight = 16 * 4; // 16px(root) * 4rem(nav--low);
  
    const mediaQuery = window.matchMedia('(max-width: 47.94rem)');
    const headerLowHeight = mediaQuery.matches ? 16 * 3 : 16 * 4; // root px font-size * header rem font-size
  
    $('a').click((e) => {
      e.preventDefault();
  
      $('.nav').removeClass('nav--open');
      const href = $.attr(e.currentTarget, 'href');
  
      root.animate({
        scrollTop: $(href).offset().top + 2 - headerLowHeight
      }, 500, () => {
        location.hash = href;
      });
      return false;
    });
  
  
    // Active nav items when scrolling to specified section
    const navLinks = document.querySelectorAll('.nav__link');
    const headerContainer = document.querySelector('.header__container');
    const headerTop = document.querySelector('.header--top');
  
    function changeNavItemActivation() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (headerContainer.offsetHeight / 3 < scrollTop) {
        headerContainer.classList.add('header--low');
        headerTop.classList.add('header--top--hide');
      } else {
        headerContainer.classList.remove('header--low');
        headerTop.classList.remove('header--top--hide');
        
      }
      
  
      navLinks.forEach((link) => {
        const currentLink = link;
        const refId = currentLink.getAttribute('href').slice(1);
        const refElement = document.getElementById(refId);
  
        const elementOffsetTop = refElement.offsetTop;
        const elementOffsetBottom = refElement.offsetTop + refElement.offsetHeight;
        const scrollPoint = scrollTop + navLowHeight;
  
        if (elementOffsetTop <= scrollPoint && elementOffsetBottom > scrollPoint) {
          currentLink.classList.add('nav__link--active');
        } else {
          currentLink.classList.remove('nav__link--active');
        }
      });
    }
    document.addEventListener('scroll', changeNavItemActivation);
  
  
    // Show and animate element when scroll reaches a half of the element's height
    const animatedElements = document.querySelectorAll('.hidden');
  
    function animateAfterReach() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + window.innerHeight;
  
      animatedElements.forEach((elem) => {
        if (elem.offsetTop + (elem.offsetHeight / 2) <= scrollBottom) {
          elem.classList.remove('hidden');
          elem.classList.remove('hidden');
        }
      });
    }
    document.addEventListener('scroll', animateAfterReach);
  }());
}
  