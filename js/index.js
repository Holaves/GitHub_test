// timer

let seconds = {el: document.getElementById('seconds'), count: 0}
let minuts = {el: document.getElementById('minuts'), count: 0}
let hours = {el:document.getElementById('hours'), count:0}

const timeChange = (callback) => {
    seconds.count++
    if(seconds.count === 60){
        seconds.count = 0
        minuts.count ++
        if(minuts.count === 60){
            minuts.count = 0
            hours.count ++
            if(hours.count === 24){
                hours.count === 0
            }
        }
    }
    callback()
}
const appendTimeText = (time) => {
    time.el.innerText = String(time.count).length < 2 ? '0' + String(time.count) : String(time.count)
}
const appendTime = () => {
    appendTimeText(seconds)
    appendTimeText(minuts)
    appendTimeText(hours)
}
setInterval(() => {
    timeChange(appendTime)
}, 1000)

// game

const winCombination = [
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7]
]
const PlayerOne = {name:'PlayerOne',arr: [], score: 0, ElScore: document.getElementById('score1')}
const PlayerTwo = {name:'PlayerTwo', arr: [], score: 0, ElScore: document.getElementById('score2')}
let PlayerState = false
const field = document.getElementById('field')

field.addEventListener('click', (e) => {
    if(!PlayerState){
        PlayerOne.arr.push(e.target.id)
        e.target.innerText = 'X'
        cheakCombination(PlayerOne)
        PlayerState = true
    }
    else{
        PlayerTwo.arr.push(e.target.id)
        e.target.innerText = 'O'
        cheakCombination(PlayerTwo)
        PlayerState = false
    }
    
    fieldCheak()
})

const cheakCombination = (arg) => {
    console.log(arg.arr)
    let win = 0
    let counter = 0

    winCombination.forEach((cv,index) => {
        for(let i = 0; i< arg.arr.length; i++){
            cv.forEach((cv2,i2) => {
                if(Number(arg.arr[i]) === cv2){
                    win++
                }
            })
        }
        if(win === 3){
            console.log(arg.name)
            if(arg.name == 'PlayerOne'){
                endGame(PlayerOne, true)
                endGame(PlayerTwo, false)
            }
            else if(arg.name == 'PlayerTwo'){
                endGame(PlayerOne, false)
                endGame(PlayerTwo, true)
            }
            win = 0
        }
        else{win = 0}
    })
    
}
function endGame(arg, gameState){
    if(gameState){
        arg.score ++
        arg.ElScore.innerText = String(arg.score)
    }
    arg.arr = []
        document.querySelectorAll('.cell').forEach(cv => {
            cv.innerText = ''
        })
    
    
}
function fieldCheak(){
    let count = 0
    document.querySelectorAll('.cell').forEach(cv => {
        if(cv.textContent){
            count ++
        }
    })
    if(count >= 9){
        endGame(PlayerOne, false)
        endGame(PlayerTwo, false)
    }
}
document.getElementById('btn').addEventListener('click', () => {
    PlayerOne.score = 0
    PlayerTwo.score = 0
    PlayerOne.ElScore.innerText = '0'
    PlayerTwo.ElScore.innerText = '0'

})


console.log('Hello!, what are you doing here?')