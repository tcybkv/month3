// TAB SLIDER

const tabContentItems = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabItemsParent = document.querySelector('.tab_content_items');

let currentTab = 0;

const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentItems[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

const switchTab = () => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabItems.length
    showTabContent(currentTab)
}

hideTabContent()
showTabContent()
setInterval(switchTab, 3000)

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                currentTab = tabIndex
                showTabContent(currentTab)
            }
        })
    }
}


//MOVE BLOCK
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
const mainWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const mainHeight = parentBlock.offsetHeight - childBlock.offsetHeight;
const centerX = parentBlock.offsetWidth / 2 - childBlock.offsetWidth / 2;
const centerY = parentBlock.offsetHeight / 2 - childBlock.offsetHeight / 2;
const radiusX = parentBlock.offsetWidth / 2 - childBlock.offsetWidth / 2;
const radiusY = parentBlock.offsetHeight / 2 - childBlock.offsetHeight / 2;
let angle = 0;

const moveBlock = () => {
    const x = centerX + Math.cos(angle) * radiusX;
    const y = centerY + Math.sin(angle) * radiusY;
    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;
    angle += 0.01; // adjust speed by changing increment value
    if (angle >= Math.PI * 2) angle = 0; // reset angle for continuous motion
    requestAnimationFrame(moveBlock);
};

moveBlock();


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

// CONVERTER
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')


const converter = (sourceElement, targetElement, targetElement2, current) => {
    sourceElement.oninput = async () => {
        try {
            const responce = await fetch("../data/converter.json")
            const  data = await responce.json()
            switch (current) {
                case 'som':
                    targetElement.value = (sourceElement.value / data.usd).toFixed(2)
                    targetElement2.value = (sourceElement.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (sourceElement.value * data.eur).toFixed(2)
                    targetElement2.value = (sourceElement.value * (data.usd / data.eur)).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (sourceElement.value * data.usd).toFixed(2)
                    targetElement2.value = (sourceElement.value * data.eur / data.usd).toFixed(2)
                    break
                default:
                    break
            }
            sourceElement.value === '' && (targetElement.value = "")
            sourceElement.value === '' && (targetElement2.value = "")
        }catch (e){
            console.error(e)
        }

    }
}
converter(somInput, usdInput, eurInput, "som")
converter(usdInput, somInput, eurInput, "usd")
converter(eurInput, somInput, usdInput, "eur")

// CARD SWITCHER

const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const cardBlock = document.querySelector('.card');
let countCard = 0;

const fetchData = async (count) => {
    try {
        const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${countCard}`)
        const data = await responce.json()
         cardBlock.innerHTML = `
         <p>${data.title}</p>
         <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
         <span>${data.id}</span>
         `
    } catch (e) {
        console.log(e)
    }
}

// const displayData = (data) => {
//     cardBlock.innerHTML = `
//         <p>${data.title}</p>
//         <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
//         <span>${data.id}</span>
//     `;
// }

const getNextCard = () => {
    countCard = countCard === 200 ? 1 : countCard + 1;
    fetchData(countCard)
}

const getPrevCard = () => {
    countCard = countCard === 1 ? 200 : countCard - 1;
    fetchData(countCard)
}

btnPrev.addEventListener('click', getPrevCard);
btnNext.addEventListener('click', getNextCard);

getNextCard();

// WEATHER

const cityInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

const citySearch = () => {
    cityInput.oninput = async (event) => {
        try {
            const reponce = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`)
            const data = await reponce.json()
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '...'
        }catch (e) {
            console.error(e)
        }
    }
}
citySearch()


