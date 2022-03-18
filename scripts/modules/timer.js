
export const timer = deadline => {
    const timerItemDays = document.querySelector('.timer__count_days');
    const timerItemHours = document.querySelector('.timer__count_hours');
    const timerItemMinutes = document.querySelector('.timer__count_minutes');
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();
        const timeRemaining = dateStop - dateNow;

        const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
        const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
        const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);

        return {timeRemaining, days, minutes, hours};
    }
    let intervalId;
    const start = () => {
        const  timer = getTimeRemaining();
        if (timer.days > 0) {
            timerItemDays.textContent = timer.days;
            timerItemHours.textContent = addZero(timer.hours);
            timerItemMinutes.textContent = addZero(timer.minutes);
            intervalId = setInterval(start, 60000);
        }

        if (timer.days === 0) {
            const hour = document.querySelector('.timer__units_days');
            const minute = document.querySelector('.timer__units_hours');
            const second = document.querySelector('.timer__units_minutes');
            timerItemDays.textContent = addZero(timer.hours);
            timerItemHours.textContent = addZero(timer.minutes);
            timerItemMinutes.textContent = addZero(Math.floor(timer.timeRemaining / 1000 % 60));
            hour.textContent = 'часа';

            if (addZero(timer.hours) === 1) {
                hour.textContent = 'час';
            }

            if (addZero(timer.hours) === 0 || addZero(timer.hours) > 4) {
                hour.textContent = 'часов';
            }

            if (addZero(timer.minutes) === 1) {
                minute.textContent = 'минута';
            }

            if (addZero(timer.minutes) > 4) {
                minute.textContent = 'минут';
            }

            minute.textContent = 'минуты';

            if (addZero(Math.floor(timer.timeRemaining / 1000 % 60)) === 1) {
                second.textContent = 'секунда';
            }

            if (addZero(Math.floor(timer.timeRemaining / 1000 % 60)) === 0 ||
                addZero(Math.floor(timer.timeRemaining / 1000 % 60)) > 4) {
                second.textContent = 'секунд'
            }
            //second.textContent = 'секунды';
            intervalId = setInterval(start, 1000);
        }

        if (timer.timeRemaining <= 0) {
            clearTimeout(intervalId);
            timerItemDays.textContent = '0';
            timerItemHours.textContent = '00';
            timerItemMinutes.textContent = '00';
        }
    }
    start();
}



