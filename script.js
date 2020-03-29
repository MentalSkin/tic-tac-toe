const symbolX = ['fas fa-times', 'x']
const symbolO = ['far fa-circle', 'o']

//module for the gameboard
const Gameboard = (function(){

    const getGameType = () => {
        let gameType = document.getElementById('gameType').value
        return gameType
    }

    let tileList = [...document.querySelectorAll('.tile')];

    const addSymbol = function(event) {
            //checks if tile is open or closed
            if (!event.target.classList.value.includes('clicked')) {

                let i = document.createElement("i");
                i.setAttribute("class", currentPlayer.symbol[0]);
                event.target.dataset.symbol = currentPlayer.symbol[1]

                i.classList.add('clicked')
                event.target.classList.add('clicked')
                event.target.classList.add('tileClicked')
                event.target.appendChild(i);
            }
    }

    //when the computer makes choice:
    const computerPlays = (symbol, tile) => {

        //look for available tiles
        let i = document.createElement("i");

       return {}
    }


    //when a human clicks:

    const humanPlays = function(humanPlayer) {
        
        tileList.forEach(element => {
            element.addEventListener('click', addSymbol)
        });
        
        

    }
    const humanEndsRound = function() {
        tileList.forEach(element => {
            element.removeEventListener('click', addSymbol)
        })
    }

    

    const checkWinner = function() {

    }

    const resetBoard = function() {
         //function that resets the board
         //clear tiles
         //set counter to 0
         counter = 0;
    }

    return {
        resetBoard,
        getGameType,
        checkWinner,
        humanPlays,
        humanEndsRound,
        computerPlays,
    }
})();

//Factory for players
const Player = (name, symbol, nature) => {

    return {name, symbol, nature}
}

const playerOne = Player('John', symbolX, 'human') //get this info from form
const playerTwo = Player('Doe', symbolO, 'computer')

let currentPlayer = playerOne
