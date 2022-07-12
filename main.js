
import deck from "./deck.js"
import playerHand from "./hand.js"

const container = document.querySelector(".viewport__playerHand")
const button = document.querySelector(".button")

console.log(container)

let randCard = () => {
    let randId = Math.random() * deck.length;
    randId = Math.round(randId)
    return randId
}

let drawCard = () => {
    let cardId = randCard();

    let chosenCard = deck.filter(card => card.id == cardId)
    console.table(chosenCard)

    chosenCard.forEach(card => {
        container.innerHTML = `<div class="card">
        <img src="${card.sprite}" class="card__image">
        <div class="card__content">
        <h2 class="card__heading">${card.name.charAt(0).toUpperCase()}${card.name.slice(1)}</h2>
        <p class="card__text"> Attack:${card.attack}  Defence:${card.defence} .</p>
        </div>
        <div>`
        
    })

}

button.addEventListener("click", drawCard)
