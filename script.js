/*
 * Bella at Perry Mountain
 * ========================
 * 1. Measures header height for the weddings section sizing.
 * 2. Fades header out as the user scrolls.
 * 3. Adds 'in-view' class to sections when they enter the viewport,
 *    triggering overlay fade-in and image brightening.
 */

(function () {
  'use strict';

  /* --- Header height CSS variable --- */
  function setHeaderHeight() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', height + 'px');
  }

  window.addEventListener('DOMContentLoaded', setHeaderHeight);
  window.addEventListener('resize', setHeaderHeight);

  /* --- Fade header on scroll (desktop only) --- */
  function initHeaderFade() {
    if (window.innerWidth <= 768) return;

    var header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
      var fadeDistance = header.offsetHeight * 0.5;
      var progress = Math.min(scrollY / fadeDistance, 1);
      var opacity = 1 - progress;
      var blur = progress * 12;

      header.style.opacity = opacity;
      header.style.filter = 'blur(' + blur + 'px)';

      if (opacity <= 0) {
        header.style.pointerEvents = 'none';
      } else {
        header.style.pointerEvents = '';
      }
    });
  }

  window.addEventListener('DOMContentLoaded', initHeaderFade);

  /* --- Section viewport detection (sliding panels) --- */
  function initViewportDetection() {
    var sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.15
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  window.addEventListener('DOMContentLoaded', initViewportDetection);

  /* --- Viewport detection for homepage content sections --- */
  function initHpSectionDetection() {
    var wrappers = document.querySelectorAll('.hp-scroll-wrap');
    if (!wrappers.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Toggle in-view on the sticky .hp-section inside the wrapper
        var section = entry.target.querySelector('.hp-section');
        if (!section) return;
        if (entry.isIntersecting) {
          section.classList.add('in-view');
        } else {
          section.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.05
    });

    wrappers.forEach(function (wrap) {
      observer.observe(wrap);
    });
  }

  window.addEventListener('DOMContentLoaded', initHpSectionDetection);

  /* --- Fade-in for homepage content elements --- */
  function initHomepageFadeIn() {
    var elements = document.querySelectorAll('.hp-fade');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  window.addEventListener('DOMContentLoaded', initHomepageFadeIn);
})();
