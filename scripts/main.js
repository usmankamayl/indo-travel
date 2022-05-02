import {timer} from "./modules/timer.js";
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import {getInfoOfTour, reservationToTour} from "./modules/data.js";
import './modules/form.js';
timer('2022/04/15');


const mask = event => {
    const {target, keyCode, type} = event;

    const pos = target.selectionStart;
    if (pos < 3) event.preventDefault();
    const matrix = '+7 (___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    const val = target.value.replace(/\D/g, '');
    let newValue = matrix.replace(/[_\d]/g,
        a => (i < val.length ? val[i++] || def[i] : a));
    i = newValue.indexOf('_');
    if (i !== -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
    }
    let reg = matrix.substring(0, target.value.length).replace(/_+/g,
        (a) => `\\d{1,${a.length}}`).replace(/[+()]/g, '\\$&');
    reg = new RegExp(`^${reg}$`);
    if (!reg.test(target.value) || target.value.length < 5 ||
        keyCode > 47 && keyCode < 58) {
        target.value = newValue;
    }
    if (type === 'blur' && target.value.length < 5) target.value = '';
};

const inputPhone = document.getElementById('reservation__phone');
inputPhone.type = 'tel';
if (inputPhone.type === 'tel') {
    inputPhone.addEventListener('input', mask);
    inputPhone.addEventListener('focus', mask);
    inputPhone.addEventListener('blur', mask);
    inputPhone.addEventListener('keydown', mask);
}


