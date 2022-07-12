
import deck from "./deck.js"

const container = document.querySelector(".viewport__playerHand")
console.log(container)

let randCard = () => {
    let randId = Math.random() * deck.length;
    return randId
}

let drawCard = () => {
    let chosenCard = randCard();
    
    
    
    deck.find(card => {
        container.innerHTML += `<div class="card">
        <img src="${card.sprite}" class="card__image">
        <div class="card__content">
        <h2 class="card__heading">${card.name.charAt(0).toUpperCase()}${card.name.slice(1)}</h2>
        <p class="card__text"> ${card.attack}  ${card.defence} .</p>
        </div>
        <div>`
    })
}
randCard();
drawCard();