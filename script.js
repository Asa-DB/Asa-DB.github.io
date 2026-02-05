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
    let imageCount = 0;

    function createAndMoveImage() {
       
        const image = document.createElement('img');
        image.src = 'assets/bird.webp';
        image.alt = 'Flying Picture';
        image.style.position = 'absolute';
        image.style.width = '100px';
        image.style.height = '100px';
        image.style.left = '50%';
        image.style.top = '50%';
        image.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(image);

       
        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 100);
        let dx = Math.random() * 6 - 3;
        let dy = Math.random() * 6 - 3;

        function moveImage() {
           
            x += dx;
            y += dy;

           
            if (x + image.offsetWidth >= window.innerWidth || x <= 0) {
                dx = -dx;
            }
            if (y + image.offsetHeight >= window.innerHeight || y <= 0) {
                dy = -dy;
            }

           
            image.style.left = x + 'px';
            image.style.top = y + 'px';

           
            const frame = requestAnimationFrame(moveImage);
            animationFrames.push(frame);
        }

        moveImage();
    }

   
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            createAndMoveImage();
        }
    });