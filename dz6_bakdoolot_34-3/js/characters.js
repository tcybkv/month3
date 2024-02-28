const cardsContainer = document.getElementById('cards-container');
const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/characters.json', true);

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const characters = JSON.parse(xhr.responseText);
        characters.forEach(character => {
            const { name, age, character_photo } = character;

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = character_photo;
            img.alt = `${name} photo`;

            const nameElem = document.createElement('p');
            nameElem.textContent = name;

            const ageElem = document.createElement('p');
            ageElem.textContent = `Age: ${age}`;

            card.appendChild(img);
            card.appendChild(nameElem);
            card.appendChild(ageElem);

            cardsContainer.appendChild(card);
        });
    } else {
        console.error('Request failed with status:', xhr.status);
    }
};

xhr.onerror = function () {
    console.error('Error fetching characters');
};

xhr.send();
