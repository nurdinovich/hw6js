const startEl = document.getElementById("start")
const gameEl = document.getElementById('game')
const timeEl = document.getElementById('time')
const timeHeaderEl = document.getElementById('time-header')
const resultHeaderEl = document.getElementById('result-header')
const resultEl = document.getElementById('result')
const gameTimeEl = document.getElementById('game-time')

let score = 0

startEl.addEventListener("click", startGame)
gameEl.addEventListener("click", handleBox)
gameTimeEl.addEventListener("input", setGameTime)

function startGame() {
    setGameTime()
    score = 0

    startEl.classList.toggle('hide')
    gameEl.style.background = 'red'
    gameTimeEl.setAttribute("disabled", true)

    let gameTime = 0

    let interval = setInterval(function () {
        gameTime = +timeEl.innerText

        if (gameTime <= 0) {
            endGame()
            clearInterval(interval)
        } else {

            timeEl.innerText = (gameTime - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()
}
function endGame() {
    startEl.classList.toggle('hide')
    gameEl.style.background = "#ccc"
    gameTimeEl.removeAttribute("disabled")
    gameEl.innerHTML = ''
    resultEl.innerText = score
    resultHeaderEl.classList.toggle('hide')
    timeHeaderEl.classList.toggle('hide')
}

function renderBox() {
    gameEl.innerHTML = ''
    let box = document.createElement("div")
    let boxSize = getRandom(30, 200)
    let gameZone = gameEl.getBoundingClientRect()

    let maxLeft = gameZone.width - boxSize
    let maxTop = gameZone.height - boxSize

    let randomColor = getRandomColor();
    box.style.background = randomColor;
    let isCircle = getRandom(0, 2) === 0 ;
    if(isCircle){
        box.style.borderRadius = '50%';
    }





    box.style.width = box.style.height = boxSize + "px"
    box.style.cursor = 'pointer'
    box.style.position = 'absolute'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.top = getRandom(0, maxTop) + 'px'



    box.id = 'check'

    gameEl.appendChild(box)
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleBox(event) {
    if (event.target.id === 'check') {
        console.log('check');
        score++
        renderBox()
    }

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


function setGameTime() {
    let timeGame = +gameTimeEl.value
    timeEl.innerText = timeGame.toFixed(1)

    resultHeaderEl.classList.add('hide')
    timeHeaderEl.classList.remove("hide")

}