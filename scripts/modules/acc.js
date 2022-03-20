const items = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');
let heightWrapper = 0;

textWrapper.forEach(el => {
    if (heightWrapper < el.scrollHeight) {
        heightWrapper = el.scrollHeight;
    }
})

items.forEach(el => {
    if (el.classList.contains('travel__item_active')) {
        el.classList.remove('travel__item_active');
    }
})

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        for (let i = 0; i < items.length; i++) {
            if (i === index) {
                items[i].classList.toggle('travel__item_active');
                textWrapper[i].style.height =
                    textWrapper[i].closest('.travel__item_active') ? `${heightWrapper}px` :
                       '' ;
            } else {
                items[i].classList.remove('travel__item_active');
                textWrapper[i].style.height = '';
            }
        }
    });
})

