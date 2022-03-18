const btnMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const headerItem = document.querySelectorAll('.header__item');
const headerMenuActive = document.querySelector('.header__menu_active');

if (headerMenuActive) {
    headerMenuActive.style.transform = 'rotate(360deg)';
}


headerItem.forEach(item => {
    item.addEventListener('click', (e) => {``
        e.preventDefault();
    })
})



btnMenu.addEventListener('click', (e) => {
    const target = e.target;
    headerMenu.classList.toggle('header__menu_active');
})

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target !== btnMenu && !target.closest('.header__menu') || target.closest('.header__item')) {
        headerMenu.classList.remove('header__menu_active');
    }
})
