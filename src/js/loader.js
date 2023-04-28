const loader = document.querySelector('.loader_page');

let timerId = null;

function hidenItem() {
    console.log('hello')
    timerId = setInterval(() => {
        loader.classList.add('loadhide');
    },2400);
}

hidenItem();