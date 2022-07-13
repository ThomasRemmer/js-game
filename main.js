
import deck from "./deck.js"
import enemyHand from "./hand.js"

const playerContainer = document.querySelector(".viewport__playerMonsterContainer")
const enemyContainer = document.querySelector(".viewport__playspace")
const button = document.querySelector("#restartButton")
const start = document.querySelector("#startButton")
const playerHealthContainer = document.querySelector("#playerHealth")
const enemyHealthContainer = document.querySelector("#enemyHealth")
const normalActionButton = document.querySelector("#normalAction")
const specialActionButton = document.querySelector("#specialAction")



let playerStats = []
let aiStats = []
let playerTurn = true;

let randCard = () => {
    let randId = Math.floor(Math.random() * deck.length);

    return randId
}

let playerDrawCard = () => {
    let cardId = randCard();

    let chosenCard = deck.filter(card => card.id == cardId)
    chosenCard.forEach(card => {
        playerContainer.innerHTML = `<div class="card">
        <img src="${card.sprite}" class="card__image">
        <div class="card__content">
        <h2 class="card__heading">${card.name.charAt(0).toUpperCase()}${card.name.slice(1)}</h2>
        <p class="card__text"> Attack:${card.attack}  Defence:${card.defence}</p>
        <p class="card__text"> S Attack:${card.speicalAttack}  S Defence:${card.specialDefence}</p>
        </div>
        <div>` 
        playerStats = [card.attack, card.defence, card.speicalAttack, card.specialDefence, card.health, card.speed]
    })

}

let enemyDrawCard = () => {
    let cardId = randCard();

    let chosenCard = enemyHand.filter(card => card.id == cardId)
    chosenCard.forEach(card => {
        enemyContainer.innerHTML = `<div class="card">
        <img src="${card.sprite}" class="card__image">
        <div class="card__content">
        <h2 class="card__heading">${card.name.charAt(0).toUpperCase()}${card.name.slice(1)}</h2>
        <p class="card__text"> Attack:${card.attack}  Defence:${card.defence}</p>
        <p class="card__text"> S Attack:${card.speicalAttack} S Defence:${card.specialDefence}</p>
        </div>
        <div>` 
        aiStats = [card.attack, card.defence, card.speicalAttack, card.specialDefence, card.health, card.speed]
    })

}

const battleStart = (pS, aS) => {

    playerHealthContainer.innerHTML = `<p>Player Health: ${pS[4]}</p>`
    enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aS[4]}</p>`
    if (pS[5] >= aS[5]) {
        console.log("player is faster")
        playerTurn = true
    }
    else {
        console.log("enemy is faster")
        playerTurn = false
    }

}

let nextRound = () => {
    playerDrawCard()
    enemyDrawCard()
    battleStart(playerStats, aiStats)
}

let gameStart = () => {
    button.innerText = "Restart"
    start.remove()
    nextRound()
}




start.addEventListener("click", gameStart)
button.addEventListener("click", nextRound)






