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

// thanks ryan for the fly stuff
let animationFrames = [];
const MAX_BIRDS = 10;
const birds = [];

function createAndMoveImage() {
    if (birds.length >= MAX_BIRDS) {
        showLimitMessage();
        return;
    }

    const image = document.createElement('img');
    image.src = 'assets/bird.webp';
    image.alt = 'Flying Picture';
    image.style.position = 'absolute';
    const size = 50 + Math.random() * 70;
    image.style.width = size + 'px';
    image.style.height = size + 'px';
    image.style.left = '0px';
    image.style.top = '0px';
    image.style.zIndex = 1000;
    image.style.pointerEvents = 'auto';
    image.style.transition = 'transform 0.12s linear';
    document.body.appendChild(image);

    const bird = {
        el: image,
        x: Math.random() * (window.innerWidth - size),
        y: Math.random() * (window.innerHeight - size),
        dx: (Math.random() * 3 + 1) * (Math.random() < 0.5 ? 1 : -1),
        dy: (Math.random() * 3 + 1) * (Math.random() < 0.5 ? 1 : -1),
        size,
        frameId: null,
        tOffset: Math.random() * 1000
    };

    birds.push(bird);

    image.addEventListener('click', () => removeBird(bird));

    function moveImage(timestamp) {
        bird.x += bird.dx;
        bird.y += bird.dy;

        if (bird.x + bird.size >= window.innerWidth || bird.x <= 0) {
            bird.dx = -bird.dx;
        }
        if (bird.y + bird.size >= window.innerHeight || bird.y <= 0) {
            bird.dy = -bird.dy;
        }

        bird.el.style.left = bird.x + 'px';
        bird.el.style.top = bird.y + 'px';

        const angle = Math.atan2(bird.dy, bird.dx) * 180 / Math.PI;
        const scale = 1 + 0.08 * Math.sin((timestamp + bird.tOffset) / 100);
        bird.el.style.transform = `rotate(${angle}deg) scale(${scale})`;

        bird.frameId = requestAnimationFrame(moveImage);
        animationFrames.push(bird.frameId);
    }

    bird.frameId = requestAnimationFrame(moveImage);
}

function removeBird(bird) {
    if (!bird) return;
    cancelAnimationFrame(bird.frameId);
    const idx = birds.indexOf(bird);
    if (idx !== -1) birds.splice(idx, 1);
    if (bird.el && bird.el.parentNode) bird.el.parentNode.removeChild(bird.el);
}

function showLimitMessage() {
    if (document.getElementById('bird-limit-msg')) return;
    const msg = document.createElement('div');
    msg.id = 'bird-limit-msg';
    msg.textContent = `Max birds (${MAX_BIRDS})`;
    Object.assign(msg.style, {
        position: 'fixed',
        left: '50%',
        top: '20px',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.75)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '6px',
        zIndex: 9999
    });
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.style.transition = 'opacity 400ms';
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500);
    }, 900);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        createAndMoveImage();
    }
    // Backspace removes all birds (quick cleanup)
    if (event.code === 'Backspace') {
        birds.slice().forEach(removeBird);
    }
});

// cleanup animation frames on unload
window.addEventListener('beforeunload', () => {
    animationFrames.forEach(id => cancelAnimationFrame(id));
});