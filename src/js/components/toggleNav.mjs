/**
 * Function for nav toggler.
 * Function will toggle classes to add/remove display: none, and change z-index.
 */

export const toggleBtn = document.querySelector('#toggleBtn');
export const menu = document.querySelector('.collapse-nav');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    menu.classList.toggle('z-10');
})