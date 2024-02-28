//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
})

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

// CONVERTER
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')


const converter = (sourceElement, targetElement, targetElement2, current) => {
    sourceElement.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)

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
        }
    }
}
converter(somInput, usdInput, eurInput, "som")
converter(usdInput, somInput, eurInput, "usd")
converter(eurInput, somInput, usdInput, "eur")
