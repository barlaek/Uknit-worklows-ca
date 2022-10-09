/**
 * Function for nav toggler.
 * Function will toggle classes to add/remove display: none, and change z-index.
 */
export function toggleNav() {
    const toggleBtn = document.querySelector('#toggleBtn');
    const menu = document.querySelector('.collapse-nav');

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('show');
        menu.classList.toggle('z-10');
    })
}