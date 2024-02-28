const cardsContainer = document.getElementById('cards-container');

fetch('../json/characters.json')
    .then(response => response.json())
    .then(characters => {
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
    })
    .catch(error => console.error('Error fetching characters:', error));