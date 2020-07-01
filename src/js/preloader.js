const imagesLoaded = require('imagesloaded');

const body = document.body;
export const preloader = selector => {
    return new Promise(resolve => {

        const imgwrap = document.createElement('div');
        imgwrap.style.visibility = 'hidden';
        body.appendChild(imgwrap);
        
        [...document.querySelectorAll(selector)].forEach(el => {
            const imgEl = document.createElement('img');
            imgEl.style.width = 0;
            imgEl.src = el.dataset.img;
            imgEl.className = 'preload';
            imgwrap.appendChild(imgEl);
        });

        imagesLoaded(document.querySelectorAll('.preload'), () => {
            imgwrap.parentNode.removeChild(imgwrap);
            body.classList.remove('loading');
            resolve();
        });

    });
};