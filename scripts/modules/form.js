const form = document.querySelector('.reservation__form');
const reservationButton = document.querySelector('.reservation__button');
const URL = 'https://jsonplaceholder.typicode.com/posts';
const name = form.querySelector('#reservation__name');
const phone = form.querySelector('#reservation__phone');

const httpRequest = (url, {
    method = 'GET',
    body = {},
    callback,
    headers,
}) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }
        }
        xhr.addEventListener('load', () => {
            if (xhr.status < 200 || xhr.status >= 300) {
                callback(new Error(xhr.status), xhr.response);
                return;
            }
            const data = JSON.parse(xhr.response);
            if (callback) callback(null, data);
        })

        xhr.addEventListener('error', () => {
            callback(new Error(xhr.status), xhr.response);
        })

        xhr.send(JSON.stringify(body));
    } catch (err) {
        callback(new Error(err));
    }
}

// const sendData = (body, cb) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', url);
//     xhr.setRequestHeader('Content-Type', 'application/json')
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse(xhr.response);
//         cb(data);
//     })
//
//     xhr.addEventListener('error', () => {
//         console.log('error');
//     })
//
//     xhr.send(JSON.stringify(body));
// }

form.addEventListener('submit', (e) => {
    e.preventDefault();
        httpRequest(URL, {
            method: 'POST',
            body: {
                dates: form.dates.value,
                people: form.people.value,
                name: name.value,
                phone: phone.value
            },
            callback(err, data) {
                const p = document.createElement('p');
                if (err) {
                    console.warn(err, data);
                    p.style.cssText = 'font-style:italic;font-size:24px;color:red;'
                    p.textContent = `Что-то пошло не так...`;
                    form.append(p);
                    setTimeout(() => {
                        p.remove();
                    }, 2000)
                    return;
                }
                form.reset();
                document.querySelector('.reservation__data').textContent = '';
                document.querySelector('.reservation__price').textContent = '';
                p.style.cssText = 'font-style:italic;font-size:24px;color:blue;'
                p.textContent = `Заявка на бронирование успешно отправлена. Номер заявки ${data.id}`;
                form.append(p);
                setTimeout(() => {
                    p.remove();
                }, 2000)
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
})

// 2 task

const footerForm = document.querySelector('.footer__form');
const modalWrapper = document.querySelector('.overlay-modal__wrapper');
const modalSuccess = document.querySelector('.modal-success');
const modalError = document.querySelector('.modal-error');
const modalBtn = document.querySelectorAll('.modal-btn');

footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    httpRequest(URL, {
       method: 'POST',
       body: {
         email: footerForm.querySelector('input').value,
       },
        callback(err, data) {
            //const p = document.createElement('p');
            modalWrapper.style.display = 'flex';
            modalBtn.forEach(item => {
                item.addEventListener('click', () => {
                    console.log('modalBtn')
                    modalWrapper.style.display = 'none';
                })
            })
            if (err) {
                console.warn(err, data);
                modalSuccess.style.display = 'none';
                modalError.style.display = 'block';
                // p.style.cssText = 'font-style:italic;font-size:24px;color:red;'
                // p.textContent = `Что-то пошло не так...`;
                // footerForm.append(p);
                // setTimeout(() => {
                //     p.remove();
                // }, 2000)
                footerForm.reset();
                return;
            }
            footerForm.reset();
            document.querySelector('.reservation__data').textContent = '';
            document.querySelector('.reservation__price').textContent = '';
            modalSuccess.style.display = 'block';
            modalError.style.display = 'error';
            // p.style.cssText = 'font-style:italic;font-size:24px;color:blue;'
            // p.textContent = `Заявка на бронирование успешно отправлена. Номер заявки ${data.id}`;
            // footerForm.append(p);
            // setTimeout(() => {
            //     p.remove();
            // }, 2000)
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })
})


document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.overlay-modal')) {
        modalWrapper.style.display = 'none';
    }
})
