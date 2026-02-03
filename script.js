document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
    }

    // highlight active link
    const links = document.querySelectorAll('nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (href === 'index.html' && path === '')) {
            a.classList.add('active');
        }
        // small keyboard focus affordance
        a.addEventListener('focus', () => a.classList.add('focus'));
        a.addEventListener('blur', () => a.classList.remove('focus'));
    });

});