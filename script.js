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

//Two instances of Player created
const playerOne = Player('Player1', Gameboard.symbolX, 'nature')
const playerTwo = Player('Player2', Gameboard.symbolO, 'nature')



//Module to control the game flow
const GameFlow = (function(){
    const getGameType = () => {
        let gameType = document.getElementById('gameType').value
        return gameType
    }

    //setup and launch the game
    const startGame = function() {
        //names
        (document.getElementById('playerOneName').value !== '') ? playerOne.name = document.getElementById('playerOneName').value : playerOne.name = 'Player1';
        if (getGameType() === 'humanVsHuman') {
            (document.getElementById('playerTwoName').value !== '') ? playerTwo.name = document.getElementById('playerTwoName').value : playerTwo.name = 'Player2';
        } else if (getGameType() === 'humanVsComputer') {
            playerTwo.name = 'Dumb Computer'
        } else if (getGameType() === 'humanVsSmartComputer') {
            playerTwo.name = 'Smart Computer'
        }
        document.getElementById('displayPlayerOneName').innerHTML = playerOne.name
        document.getElementById('displayPlayerTwoName').innerHTML = playerTwo.name
        //symbols
        if (document.getElementById('selectSymbol').value === 'x') {
            playerOne.symbol = Gameboard.symbolX
            playerTwo.symbol = Gameboard.symbolO
        } else {
            playerOne.symbol = Gameboard.symbolO
            playerTwo.symbol = Gameboard.symbolX
        }

        humanTurnStart() //because it always starts with a human...
    }


    let playerCounter = 0
    let currentPlayer = playerOne
    let winner = '' 

    //mark human player's choice on the board
    const addPlayerSymbol = function(event) {
        if (playerCounter%2 === 0) {currentPlayer = playerOne}
        else {currentPlayer = playerTwo}
        
        //checks if tile is open or closed; creates child with current player symbol and appends it
        if (!event.target.classList.value.includes('clicked')) {

            let i = document.createElement("i");
            i.setAttribute("class", currentPlayer.symbol[0]);
            i.classList.add('clicked')
            event.target.dataset.symbol = currentPlayer.symbol[1]
            event.target.classList.add('clicked', 'tileClicked')
            event.target.appendChild(i);
            playerCounter++

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
        //removes eventListeners
        Gameboard.tileList.forEach(element => {
            element.removeEventListener('click', addPlayerSymbol)
        })
        //launches the next player turn depending on which type of player is Player2
        if (getGameType() === 'humanVsHuman' && gameStatus === 'gameOn') {
            humanTurnStart()
        } else if (getGameType() === 'humanVsComputer' && gameStatus === 'gameOn'){
            computerTurn(dumbComputerTurn())
        } else if (getGameType() === 'humanVsSmartComputer' && gameStatus === 'gameOn'){
            computerTurn(smartComputerTurn())
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

    const dumbComputerTurn = function(){
        //check for available tiles and play random
        let availableTilesID = Gameboard.tileList.filter(function(element) {return (element.dataset.symbol === '')})
                                                 .map(function(element) {return (element.id)})
        let randomIndex = Math.floor(Math.random()*(availableTilesID.length))
        return availableTilesID[randomIndex]
    }

    const smartComputerTurn = function(){
        //check for available tiles
        let availableTilesID = Gameboard.tileList.filter(function(element) {return (element.dataset.symbol === '')})
                                                 .map(function(element) {return (element.id)})
        //identify corners, tops, center
        let tileToPlay = ''
        let r0c0Content = document.getElementById('r0c0').dataset.symbol
        let r0c2Content = document.getElementById('r0c2').dataset.symbol
        let r2c0Content = document.getElementById('r2c0').dataset.symbol
        let r2c2Content = document.getElementById('r2c2').dataset.symbol
        let r1c1Content = document.getElementById('r1c1').dataset.symbol


        //exception
    if((r2c0Content==='x'&&r1c1Content==='o'&&r0c2Content==='x')||(r0c0Content==='x'&&r1c1Content==='o'&&r2c2Content==='x') && (availableTilesID.length===6)) {
        let availableTops = Gameboard.tileList.filter(function(element) {return (element.dataset.symbol === '')}).filter(function(element) {return (element.dataset.position === 'top')})
                                             .map(function(element) {return (element.id)})
        if (availableTops.length !== 0) {
            tileToPlay = availableTops[0]
        }

    } else {

        //PC completes row
        for (let row = 0; row < 3; row++) {
            let rowArray = []
            let empty = 0
            let compCount = 0
            let playerCount = 0
            for (let c = 0; c < 3; c++) {
                let tile = document.getElementById(`r${row}c${c}`).dataset.symbol
                rowArray.push(tile)
                if (tile === '') {empty++}
                else if (tile === playerTwo.symbol[1]) {compCount++}
                else if (tile === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 2 && playerCount === 0) {
                let rowToPlay = row
                let columnToPlay = rowArray.indexOf('')
                tileToPlay = `r${rowToPlay}c${columnToPlay}`
                console.log(tileToPlay)
                break;
            }
        }
        //PC completes column
        if (tileToPlay === '') {
            for (let column = 0; column < 3; column++) {
                let columnArray = []
                let empty = 0
                let compCount = 0
                let playerCount = 0
                for (let r = 0; r < 3; r++) {
                    let tile = document.getElementById(`r${r}c${column}`).dataset.symbol
                    columnArray.push(tile)
                    if (tile === '') {empty++}
                    else if (tile === playerTwo.symbol[1]) {compCount++}
                    else if (tile === playerOne.symbol[1]) {playerCount++}
                }
                if (compCount === 2 && playerCount === 0) {
                    let columnToPlay = column
                    let rowToPlay = columnArray.indexOf('')
                    tileToPlay = `r${rowToPlay}c${columnToPlay}`
                    console.log(tileToPlay)
                    break;
                }
            }
        }
        //PC completes diagonal
        if (tileToPlay === '') {
            let diagonalArray = [document.getElementById('r2c0').dataset.symbol,document.getElementById('r1c1').dataset.symbol, document.getElementById('r0c2').dataset.symbol]
            let empty = 0
            let compCount = 0
            let playerCount = 0

            for (let i = 0; i < 3; i++) {
                if (diagonalArray[i] === '') {empty++}
                else if (diagonalArray[i]=== playerTwo.symbol[1]) {compCount++}
                else if (diagonalArray[i] === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 2 && playerCount === 0) {
                let index = diagonalArray.indexOf('')
                if (index === 0) {tileToPlay = 'r2c0'}
                else if (index === 1) {tileToPlay = 'r1c1'}
                else if (index === 2) {tileToPlay = 'r0c2'}
            }
        }
        //PC completes backDiagonal
        if (tileToPlay === '') {
            let backDiagonalArray = [document.getElementById('r0c0').dataset.symbol,document.getElementById('r1c1').dataset.symbol, document.getElementById('r2c2').dataset.symbol]
            let empty = 0
            let compCount = 0
            let playerCount = 0
            for (let i = 0; i < 3; i++) {
                if (backDiagonalArray[i] === '') {empty++}
                else if (backDiagonalArray[i]=== playerTwo.symbol[1]) {compCount++}
                else if (backDiagonalArray[i] === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 2 && playerCount === 0) {
                let index = backDiagonalArray.indexOf('')
                if (index === 0) {tileToPlay = 'r0c0'}
                else if (index === 1) {tileToPlay = 'r1c1'}
                else if (index === 2) {tileToPlay = 'r2c2'}
            }
        }

        //PC stop row
        for (let row = 0; row < 3; row++) {
            let rowArray = []
            let empty = 0
            let compCount = 0
            let playerCount = 0
            for (let c = 0; c < 3; c++) {
                let tile = document.getElementById(`r${row}c${c}`).dataset.symbol
                rowArray.push(tile)
                if (tile === '') {empty++}
                else if (tile === playerTwo.symbol[1]) {compCount++}
                else if (tile === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 0 && playerCount === 2) {
                let rowToPlay = row
                let columnToPlay = rowArray.indexOf('')
                tileToPlay = `r${rowToPlay}c${columnToPlay}`
                console.log(tileToPlay)
                break;
            }
        }
        //PC stop columns
        if (tileToPlay === '') {
            for (let column = 0; column < 3; column++) {
                let columnArray = []
                let empty = 0
                let compCount = 0
                let playerCount = 0
                for (let r = 0; r < 3; r++) {
                    let tile = document.getElementById(`r${r}c${column}`).dataset.symbol
                    columnArray.push(tile)
                    if (tile === '') {empty++}
                    else if (tile === playerTwo.symbol[1]) {compCount++}
                    else if (tile === playerOne.symbol[1]) {playerCount++}
                }
                if (compCount === 0 && playerCount === 2) {
                    let columnToPlay = column
                    let rowToPlay = columnArray.indexOf('')
                    tileToPlay = `r${rowToPlay}c${columnToPlay}`
                    console.log(tileToPlay)
                    break;
                }
            }
        }
        //PC stop diagonal
        if (tileToPlay === '') {
            let diagonalArray = [document.getElementById('r2c0').dataset.symbol,document.getElementById('r1c1').dataset.symbol, document.getElementById('r0c2').dataset.symbol]
            let empty = 0
            let compCount = 0
            let playerCount = 0

            for (let i = 0; i < 3; i++) {
                if (diagonalArray[i] === '') {empty++}
                else if (diagonalArray[i]=== playerTwo.symbol[1]) {compCount++}
                else if (diagonalArray[i] === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 0 && playerCount === 2) {
                let index = diagonalArray.indexOf('')
                if (index === 0) {tileToPlay = 'r2c0'}
                else if (index === 1) {tileToPlay = 'r1c1'}
                else if (index === 2) {tileToPlay = 'r0c2'}
            }
        }
        //PC stop backDiagonal
        if (tileToPlay === '') {
            let backDiagonalArray = [document.getElementById('r0c0').dataset.symbol,document.getElementById('r1c1').dataset.symbol, document.getElementById('r2c2').dataset.symbol]
            let empty = 0
            let compCount = 0
            let playerCount = 0
            for (let i = 0; i < 3; i++) {
                if (backDiagonalArray[i] === '') {empty++}
                else if (backDiagonalArray[i]=== playerTwo.symbol[1]) {compCount++}
                else if (backDiagonalArray[i] === playerOne.symbol[1]) {playerCount++}
            }
            if (compCount === 0 && playerCount === 2) {
                let index = backDiagonalArray.indexOf('')
                if (index === 0) {tileToPlay = 'r0c0'}
                else if (index === 1) {tileToPlay = 'r1c1'}
                else if (index === 2) {tileToPlay = 'r2c2'}
            }
        }

        //Play on the center
        if (document.getElementById('r1c1').dataset.symbol === '') {
            tileToPlay = 'r1c1'
        }

        //Play on first available corner
        if (tileToPlay === '') {
            let availableCorners = Gameboard.tileList.filter(function(element) {return (element.dataset.symbol === '')}).filter(function(element) {return (element.dataset.position === 'corner')})
                                                    .map(function(element) {return (element.id)})
            if (availableCorners.length !== 0) {
                tileToPlay = availableCorners[0]
            }
        }

        //Play on first available top
        if (tileToPlay === '') {
            let availableTops = Gameboard.tileList.filter(function(element) {return (element.dataset.symbol === '')}).filter(function(element) {return (element.dataset.position === 'top')})
                                                    .map(function(element) {return (element.id)})
            if (availableTops.length !== 0) {
                tileToPlay = availableTops[0]
            }        
        } 
    }
    return tileToPlay
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
            console.log('Winner!')
            gameStatus = 'winner'
            //if we have a winner: message, ...
            if (currentPlayer === playerOne) {
                document.getElementById('displayPlayerOneName').style.color = 'green';
                document.getElementById('displayPlayerOneName').style.fontWeight = 'bold'
            }
            else {
                document.getElementById('displayPlayerTwoName').style.color = 'green';
                document.getElementById('displayPlayerTwoName').style.fontWeight = 'bold'
            }
        } else if (turnCount === 9){
            console.log('Draw!')
            gameStatus = 'draw'
        } else {
            console.log('GameOn!')
            gameStatus = 'gameOn'
        }
        turnCount++
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
        gameStatus ='gameOn'
        turnCount = 1
        document.getElementById('displayPlayerOneName').style.color = 'black';
        document.getElementById('displayPlayerOneName').style.fontWeight = 'normal'
        document.getElementById('displayPlayerTwoName').style.color = 'black';
        document.getElementById('displayPlayerTwoName').style.fontWeight = 'normal'
        
        startGame()
   }

    return {
        resetBoard,
        startGame,
        smartComputerTurn,
    }
})();

   
document.getElementById('resetButton').onclick = function() {GameFlow.resetBoard()}
document.getElementById('startButton').onclick = function() {GameFlow.startGame()}
