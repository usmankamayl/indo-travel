const btnMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const menu = document.querySelector('.header__list');
const headerMenuActive = document.querySelector('.header__menu_active');

if (headerMenuActive) {
    headerMenuActive.style.transform = 'rotate(360deg)';
}


menu.addEventListener('click', function(e) {
    if(e.target.classList.contains('header__link')){
        e.preventDefault();

        let link = e.target;
        scrollToId(link.hash);
    }
})


function scrollToId(id){
    let target = document.querySelector(id);
    let styles = window.getComputedStyle(target);

    if(target !== null){
        let pos = elemOffsetTop(target) - menu.clientHeight - parseFloat(styles.marginTop);
        scrollToY(pos);
    }
}

function scrollToY(pos){
    window.scrollTo({
        top: pos,
        behavior: "smooth"
    });
}

function elemOffsetTop(node){
    let coords = node.getBoundingClientRect();
    return coords.top + window.pageYOffset;
}


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
