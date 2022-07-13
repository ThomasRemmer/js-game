
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
// Random number between 0 and deck length
let randCard = () => {
    let randId = Math.floor(Math.random() * deck.length);
    return randId
}
// draws player's monster from pool of monsters, saving their monster's stats into an array
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
// draws AI's monster from pool of monsters, saving their monster's stats into an array
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
// displays player's health on the webpage and works out who goes first 
const battleStart = (pS, aS) => {

    playerHealthContainer.innerHTML = `<p>Player Health: ${pS[4]}</p>`
    enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aS[4]}</p>`
    if (pS[5] >= aS[5]) {
        playerTurn = true
        normalActionButton.innerText = "Normal Attack"
        specialActionButton.innerText = "Special Attack"
    }
    else {
        playerTurn = false
        normalActionButton.innerText = "Normal Defence"
        specialActionButton.innerText = "Special Defence"
    }

}

const aiAction = () => {
    return Math.floor(Math.random() * 2);
}

const checkWin = () => {
    if (playerStats[4] <= 0) {
        alert("you lose :(")
        nextRound()
    }
    if (aiStats[4] <= 0) {
        alert("you win :)")
        nextRound()
    }
}

const normalAction = () => {

    let damage = 0
    let aiMove = aiAction()
    if (playerTurn == true) {
        if (aiMove == 0) {
            damage = playerStats[0] - aiStats[1]
            aiStats[4] -= damage
            enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aiStats[4]}</p>`
            playerTurn = false
            normalActionButton.innerText = "Normal Defence"
            specialActionButton.innerText = "Special Defence"

        }
        else {
            aiStats[4] -= playerStats[0]
            enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aiStats[4]}</p>`
            playerTurn = false
            normalActionButton.innerText = "Normal Defence"
            specialActionButton.innerText = "Special Defence"

        }
    }
    else {
        if (aiMove == 1) {
            damage = aiStats[0] - playerStats[1]
            playerStats[4] -= damage
            playerHealthContainer.innerHTML = `<p>Enemy Health: ${playerStats[4]}</p>`
            playerTurn = true
            normalActionButton.innerText = "Normal Attack"
            specialActionButton.innerText = "Special Attack"
        }
        else {
            playerStats[4] -= aiStats[0]
            playerTurn = true
            playerHealthContainer.innerHTML = `<p>Enemy Health: ${playerStats[4]}</p>`
            normalActionButton.innerText = "Normal Attack"
            specialActionButton.innerText = "Special Attack"
        }
    }
    checkWin()
}

const specialAction = () => {

    let damage = 0
    let aiMove = aiAction()
    if (playerTurn == true) {
        if (aiMove == 0) {
            damage = playerStats[2] - aiStats[3]
            aiStats[4] -= damage
            enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aiStats[4]}</p>`
            playerTurn = false
            normalActionButton.innerText = "Normal Defence"
            specialActionButton.innerText = "Special Defence"

        }
        else {
            aiStats[4] -= playerStats[2]
            enemyHealthContainer.innerHTML = `<p>Enemy Health: ${aiStats[4]}</p>`
            playerTurn = false
            normalActionButton.innerText = "Normal Defence"
            specialActionButton.innerText = "Special Defence"

        }
    }
    else {
        if (aiMove == 1) {
            damage = aiStats[2] - playerStats[3]
            playerStats[4] -= damage
            playerHealthContainer.innerHTML = `<p>Enemy Health: ${playerStats[4]}</p>`
            playerTurn = true
            normalActionButton.innerText = "Normal Attack"
            specialActionButton.innerText = "Special Attack"
        }
        else {
            playerStats[4] -= aiStats[2]
            playerTurn = true
            playerHealthContainer.innerHTML = `<p>Enemy Health: ${playerStats[4]}</p>`
            normalActionButton.innerText = "Normal Attack"
            specialActionButton.innerText = "Special Attack"
        }
    }
    checkWin()
}

//calls functions to draw both players cards and passes both stat arrays to function that starts the battle
let nextRound = () => {
    playerDrawCard()
    enemyDrawCard()
    battleStart(playerStats, aiStats)
}
// removes start button and starts the first round
let gameStart = () => {
    button.innerText = "Restart"
    start.remove()
    nextRound()
}


specialActionButton.addEventListener("click", specialAction)
normalActionButton.addEventListener("click", normalAction)
start.addEventListener("click", gameStart)
button.addEventListener("click", nextRound)






