const fly = document.createElement('div');
const docEl = document.documentElement;

fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
right: 0;
bottom: 0;
pointer-events: none;
background: url('img/airplane.svg') center/contain no-repeat ;
`;

document.body.append(fly);

const calcPositionFly = () => {
    const maxBottom = docEl.clientHeight - fly.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = window.pageYOffset * 100 / maxScroll;
    const bottom = maxBottom * (percentScroll / 100);
    fly.style.transform = `translateY(-${bottom}px)`;
    if (percentScroll > 99) {
        fly.style.transform = `translateY(-${bottom}px) rotate(-135deg)`;
    }
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionFly);
});
//calcPositionFly();
