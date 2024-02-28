//GMAIL BLOCK
document.getElementById('gmail_button').addEventListener('click', function() {
    const emailInput = document.getElementById('gmail_input').value;
    const emailRegex = /^[a-zA-Z0-9.]{3,}@(?!.*?\.\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(emailInput);

    const resultElement = document.getElementById('gmail_result');
    resultElement.innerText = isValid ? 'OK' : 'NOT OK';
    resultElement.style.color = isValid ? 'green' : 'red';

    const buttonElement = document.getElementById('gmail_button');
});

//MOVE BLOCK
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')
const mainWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const mainHeight = parentBlock.offsetHeight - childBlock.offsetHeight

let positionY = 0
let positionX = 0

const moveBlock = () => {
    if (positionX < mainWidth && positionY === 0) {
        positionX++
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 0.1)
    } else if (positionX === mainWidth && positionY < mainHeight ) {
        positionY++
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 0.1)
    } else if (positionY === mainHeight && positionX > 0 ) {
        positionX--
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 0.1)
    } else if (positionX === 0 && positionY > 0 ) {
        positionY--
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 0.1)
    }
}
moveBlock()


//STOPWATCH
const counterDisplay = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let count = 0;
let intervalId;
let flags = false;

const timer = () => {
    count++;
    counterDisplay.textContent = count;
}
const startCounter = () => {
    if (flags !== true) {
        intervalId = setInterval(timer, 1000)
        flags = true
    }
}

const stopCounter = () => {
    clearInterval(intervalId);
    flags = false
}

const resetCounter = () => {
    clearInterval(intervalId);
    count = 0;
    counterDisplay.textContent = count;
    flags = false
}
startBtn.addEventListener('click', startCounter);
stopBtn.addEventListener('click', stopCounter);
resetBtn.addEventListener('click', resetCounter);