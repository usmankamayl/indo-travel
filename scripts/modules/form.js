import showModal from "./modal.js";

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

const fetchRequest = async (url, {
    method = 'GET',
    body,
    callback,
    headers,
}) => {
    try {
        const options = {
            method,
        };

        if (body) options.body = JSON.stringify(body);

        if (headers) options.headers = headers;

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            if (callback) return callback(null, data);
            return
        }

        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

    } catch (err) {
        return callback(err);
    }
};


const submitForm = () => {
        fetchRequest(URL, {
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
        });
}


// let flag;
    name.addEventListener('input',() => {
        name.value = name.value.replace(/[a-z0-9]/gi,'');
    });
    //
    // name.addEventListener('blur',() => {
    //     flag = name.value.trim().match(/\s+/g).length;
    // });

    // reservationButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //         showModal(submitForm);
    // })



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
                footerForm.reset();
                return;
            }
            footerForm.reset();
            document.querySelector('.reservation__data').textContent = '';
            document.querySelector('.reservation__price').textContent = '';
            modalSuccess.style.display = 'block';
            modalError.style.display = 'error';
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

//12 lesson
const inputMask = new Inputmask('+7 (999)-999-99-99');
inputMask.mask(phone);

const justValidate = new JustValidate('.reservation__form', {
    errorFieldCssClass: 'just-validate-error-label',
    errorLabelStyle: {
        paddingTop: '32px',
        width: '100%',
        textAlign: 'center',
        color: 'red',
        textDecoration: 'underlined',
    },
});

justValidate
    .addField('.reservation__input_name', [
        {
            validator(value) {
                countWordsString(value);
              return Number(countWordsString(value)) > 2;
            },
            errorMessage: 'Введите полностью инициалы',
        },
        {
            rule: 'required',
            errorMessage: 'Введите ваше имя',
        },
    ])
    .addField('#reservation__phone', [
        {
            rule: 'required',
            errorMessage: 'Введите телефон',
        },
    ])
    .onSuccess(event => {
        showModal(submitForm);
    })

function countWordsString(string){

    let counter = 1;

    // Change multiple spaces for one space
    string=string.replace(/[\s]+/gim, ' ');

    // Lets loop through the string and count the words
    string.replace(/(\s+)/g, function (a) {
        // For each word found increase the counter value by 1
        counter++;
    });

    return counter;
}
