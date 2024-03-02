const cardsBlock= document.querySelector('.cards')
const url = 'https://jsonplaceholder.typicode.com/posts'
const url_photo= 'https://uwanime.files.wordpress.com/2017/04/initial-d.jpg'
const getCards=async () =>{
    try {
        const response= await fetch(url)
        const data =await response.json()
        data.forEach((person) =>{
            const card= document.createElement('div')
            card.setAttribute('class', 'cardPerson')
            card.innerHTML=`
            <div><img src="${url_photo}" alt="${person.title}"></div>
            <h4 class="cardTitle">${person.title}</h2>
            <span class="cardBody">${person.body}</span>
        `
            cardsBlock.append(card)
        })
    }catch (e){
        console.error(e)
    }

}
getCards()