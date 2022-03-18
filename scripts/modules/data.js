export const getData = async () => {
    const result = await fetch('db.json');
    const data = await result.json();
    return data;
}
const dbDate = await getData();
const tourDate = document.querySelector('#tour__date');
const tourPeople = document.querySelector('#tour__people');
const reservationForm = document.querySelector('.reservation__form');
const reservationDate = document.querySelector('#reservation__date');
const reservationPeople = document.querySelector('#reservation__people');
const reservationPrice = document.querySelector('.reservation__price')
const dateOfReservation = document.querySelector('.reservation__data');
export const getInfoOfTour = (date, people, arr, total, time) => {
    dbDate.forEach(el => {
        const optionDate = document.createElement('option');
        optionDate.setAttribute('value', `${el['date']}`);
            optionDate.classList.add(...arr);
        optionDate.textContent = `${el['date']}`;
        date.append(optionDate);
    })
    date.addEventListener('change', () => {
        Array.from(people.querySelectorAll('option')).forEach((item, index) => {
            if (index !== 0) {
                item.remove();
            }
        });
        let tourDateValue = date.value;
        if (total) {
            total.textContent = '';
        }
        if (time) {
            time.textContent = tourDateValue;
        }
        dbDate.forEach(obj => {
            if (obj['date'] === tourDateValue) {
                const price = obj["price"];
                const optionValueStart = obj['min-people'];
                const optionValueEnd = obj['max-people'];
                for (let i = optionValueStart; i <= optionValueEnd; i++) {
                    const optionPeople = document.createElement('option');
                        optionPeople.classList.add(...arr);
                    optionPeople.setAttribute('value', `${i}`);
                    optionPeople.textContent = `${i}`;
                    people.append(optionPeople);
                }
                people.addEventListener('change', () => {
                    const totalPrice = people.value * price;
                    if (total) {
                        total.textContent = totalPrice;
                    }
                })
            }
        })
    });

}
export const reservationToTour = () => {
    dateOfReservation.textContent = '';
    reservationPrice.textContent = '';
    getInfoOfTour(reservationDate, reservationPeople, ['tour__option', 'reservation__option'],
        reservationPrice, dateOfReservation);
}

getInfoOfTour(tourDate, tourPeople, ['tour__option']);
reservationToTour();



