import loadStyle from "./loadStyle.js";

const form = document.querySelector('.reservation__form');
const totalPrice = document.querySelector('.reservation__price');

const showModal =  async (cb) => {
    await loadStyle('css/modal.css');
    const overlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const dataTour = document.createElement('p');
    const price = document.createElement('p');
    const modalButton = document.createElement('div');
    const confirm = document.createElement('button');
    const update = document.createElement('button');

    overlay.classList.add('overlay', 'overlay_confirm');
    modalWindow.classList.add('modal');
    title.classList.add('modal__title');
    title.textContent = 'Подтверждение заявки';
    description.classList.add('modal__text');
    description.textContent = `Бронирование путешествия в Индию на ${form.people.value} человек`;
    dataTour.classList.add('modal__text');
    dataTour.textContent = `В даты: ${form.dates.value}`;
    price.classList.add('modal__text');
    price.textContent = `Стоимость тура ${totalPrice.textContent}Р`
    confirm.classList.add('modal__btn', 'modal__btn_confirm');
    confirm.textContent = 'Подтверждаю';
    update.classList.add('modal__btn', 'modal__btn_edit');
    update.textContent = 'Изменить данные';
    modalButton.classList.add('modal__button');
    modalButton.append(confirm, update);
    overlay.append(modalWindow);
    modalWindow.append(title, description, dataTour, price, modalButton);
    document.body.append(overlay);
    return new Promise(resolve => {
        update.addEventListener('click', () => {
            overlay.remove();
        })
        confirm.addEventListener('click', () => {
                overlay.remove();
                cb();
        })
    })

}

export default showModal;

