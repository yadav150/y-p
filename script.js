/* global script.js – Yadav Subba Portfolio */

(function() {
    'use strict';

    // ===== HAMBURGER NAV =====
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('primary-nav');

    if (hamburger && nav) {
        const closeNav = function(e) {
            if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        };

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', closeNav);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== BUTTON RIPPLE =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.addEventListener('click', function(e) {
        if (prefersReducedMotion.matches) return;

        const btn = e.target.closest('.btn');
        if (!btn) return;
        if (btn.disabled) return;

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.6;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        btn.appendChild(ripple);

        ripple.addEventListener('animationend', function() {
            ripple.remove();
        });
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        if (prefersReducedMotion.matches) {
            revealElements.forEach(function(el) {
                el.classList.add('visible');
            });
        } else {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -20px 0px'
            });

            revealElements.forEach(function(el) {
                observer.observe(el);
            });
        }
    } else {
        revealElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

})();
