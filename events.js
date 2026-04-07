/*
 * Bella — Events Page
 * ====================
 * Scroll-triggered fade-in for each section's content.
 */

(function () {
  'use strict';

  function initFadeIn() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  window.addEventListener('DOMContentLoaded', initFadeIn);
})();
