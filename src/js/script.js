const toggleBtn = document.querySelector('#toggleBtn');
const menu = document.querySelector('.collapse-nav');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    menu.classList.toggle('z-10');
})