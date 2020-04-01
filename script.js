//Module for Gameboard
const Gameboard = (function(){
    const symbolX = ['fas fa-times', 'x']
    const symbolO = ['far fa-circle', 'o']
    const tileList = [...document.querySelectorAll('.tile')];

    return {
        symbolX,
        symbolO,
        tileList,
    }
})();

//Factory for players
const Player = (name, symbol, nature) => {
    return {name, symbol, nature}
}

//Temporary
const playerOne = Player('John', Gameboard.symbolX, 'human') //get this info from form
const playerTwo = Player('Doe', Gameboard.symbolO, 'human')

const GameFlow = (function(){
    const getGameType = () => {
        let gameType = document.getElementById('gameType').value
        return gameType
    }

    let playerCounter = 0
    let currentPlayer = playerOne
    let winner = '' 

    const addPlayerSymbol = function(event) {
        if (playerCounter%2 === 0) {currentPlayer = playerOne}
        else {currentPlayer = playerTwo}
        playerCounter++

        //checks if tile is open or closed
        if (!event.target.classList.value.includes('clicked')) {

            let i = document.createElement("i");
            i.setAttribute("class", currentPlayer.symbol[0]);
            event.target.dataset.symbol = currentPlayer.symbol[1]
            i.classList.add('clicked')
            event.target.classList.add('clicked')
            event.target.classList.add('tileClicked')
            event.target.appendChild(i);
            checkWinner()
            humanTurnEnd()
        }
    }

    const humanTurnStart = function(humanPlayer) {
        if (gameStatus === 'gameOn') {
            Gameboard.tileList.forEach(element => {
                element.addEventListener('click', addPlayerSymbol)
            });
        } else {
            //winner function
        }
    }

    const humanTurnEnd = function() {
        Gameboard.tileList.forEach(element => {
            element.removeEventListener('click', addPlayerSymbol)
        })
        if (getGameType() === 'humanVsHuman' && gameStatus === 'gameOn') {
            humanTurnStart()
        } else if (getGameType() === 'humanVsComputer' && gameStatus === 'gameOn'){
            computerTurn()
        }
    }

    const computerTurn = (tileID) => {
        if (playerCounter%2 === 0) {currentPlayer = playerOne}
        else {currentPlayer = playerTwo}
        playerCounter++
        //look for available tiles: filter Gameboard.tileList
        //GameboardFiltered
        let tile = document.getElementById(tileID)
        let i = document.createElement("i");
        i.setAttribute("class", currentPlayer.symbol[0]);
        tile.dataset.symbol = currentPlayer.symbol[1]
        i.classList.add('clicked')
        tile.classList.add('clicked')
        tile.classList.add('tileClicked')
        tile.appendChild(i);

        
        checkWinner()        
        humanTurnStart()
    }

    let turnCount = 1;
    let gameStatus ='gameOn'
    const checkWinner = function(tileList = Gameboard.tileList) {
        let tiles = Gameboard.tileList
        if (tiles[0].dataset.symbol === 'x' && tiles[1].dataset.symbol === 'x' && tiles[2].dataset.symbol === 'x' || tiles[0].dataset.symbol === 'o' && tiles[1].dataset.symbol === 'o' && tiles[2].dataset.symbol === 'o' ||
            tiles[3].dataset.symbol === 'x' && tiles[4].dataset.symbol === 'x' && tiles[5].dataset.symbol === 'x' || tiles[3].dataset.symbol === 'o' && tiles[4].dataset.symbol === 'o' && tiles[5].dataset.symbol === 'o' ||
            tiles[6].dataset.symbol === 'x' && tiles[7].dataset.symbol === 'x' && tiles[8].dataset.symbol === 'x' || tiles[6].dataset.symbol === 'o' && tiles[7].dataset.symbol === 'o' && tiles[8].dataset.symbol === 'o' ||
            tiles[0].dataset.symbol === 'x' && tiles[3].dataset.symbol === 'x' && tiles[6].dataset.symbol === 'x' || tiles[0].dataset.symbol === 'o' && tiles[3].dataset.symbol === 'o' && tiles[6].dataset.symbol === 'o' ||
            tiles[1].dataset.symbol === 'x' && tiles[4].dataset.symbol === 'x' && tiles[7].dataset.symbol === 'x' || tiles[1].dataset.symbol === 'o' && tiles[4].dataset.symbol === 'o' && tiles[7].dataset.symbol === 'o' ||
            tiles[2].dataset.symbol === 'x' && tiles[5].dataset.symbol === 'x' && tiles[8].dataset.symbol === 'x' || tiles[2].dataset.symbol === 'o' && tiles[5].dataset.symbol === 'o' && tiles[8].dataset.symbol === 'o' ||
            tiles[0].dataset.symbol === 'x' && tiles[4].dataset.symbol === 'x' && tiles[8].dataset.symbol === 'x' || tiles[0].dataset.symbol === 'o' && tiles[4].dataset.symbol === 'o' && tiles[8].dataset.symbol === 'o' ||
            tiles[6].dataset.symbol === 'x' && tiles[4].dataset.symbol === 'x' && tiles[2].dataset.symbol === 'x' || tiles[6].dataset.symbol === 'o' && tiles[4].dataset.symbol === 'o' && tiles[2].dataset.symbol === 'o')
        {
            //remove event listener
            console.log('Winner!')
            gameStatus = 'winner'
        } else if (turnCount === 9){
            console.log('Draw!')
            gameStatus = 'draw'
        } else {
            console.log('GameOn!')
            gameStatus = 'gameOn'
        }
        turnCount++
        //if we have a winner: reset board, message, ...
    }

    const resetBoard = function() {
        Gameboard.tileList.forEach(element => {
            while (element.childElementCount !== 0) {
            element.removeChild(element.firstChild)
            }
            element.classList.remove('clicked', 'tileClicked')
            element.dataset.symbol = ''
        })
        playerCounter = 0;
   }

    return {
        getGameType,
        addPlayerSymbol,
        humanTurnStart,
        humanTurnEnd,
        computerTurn,
        checkWinner,
        resetBoard,
    }
})();

if (GameFlow.getGameType() === 'humanVsHuman') {
    GameFlow.humanTurnStart()
} else if (GameFlow.getGameType() === 'ComputerVsHuman') {

}




//preference: Make 3; block 3; center; corners
//exceptions: center traped in corners;



//ISSUES: Clicking 2 times on a filed tile, skips change of symbol