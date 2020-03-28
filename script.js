//module for the gameboard
const Gameboard = (function(){

    const getGameType = () => {
        let gameType = document.getElementById('gameType').value
        return gameType
    }
    
    let counter = 0

    const symbolX = 'fas fa-times'
    const symbolO = 'far fa-circle'

    let tileList = [...document.querySelectorAll('.tile')];

    const addSymbol = function(event) {
            //checks if tile is open or closed
            if (!event.target.classList.value.includes('clicked')) {

                let i = document.createElement("i");
                //add X or O based on counter; increments counter
                if (counter%2 === 0) {
                    i.setAttribute("class","fas fa-times");
                    event.target.dataset.symbol = 'x'
                } else {
                    i.setAttribute("class","far fa-circle")
                    event.target.dataset.symbol = 'o'
                }
                i.classList.add('clicked')
                event.target.classList.add('clicked')
                event.target.classList.add('tileClicked')
                event.target.appendChild(i);
                counter += 1;
            }
    }





    //when the computer makes choice:
    const computerPlays = (symbol, tile) => {

       let i = document.createElement("i");



       return {}
    }


    //when a human clicks:

    const humanPlays = function() {

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

    const reset = function() {
         //function that resets the board
         //clear tiles
         //set counter to 0
         counter = 0;
    }

    const returnCounter = function(){return counter}

    return {
        // r0c0,r0c1,r0c2,
        // r1c0,r1c1,r1c2,
        // r2c0,r2c1,r2c2,
        //gameboardContainer,

        returnCounter,
        reset,
        getGameType,
        checkWinner,
        humanPlays,
        humanEndsRound,

    }
})();

//Factory for players
const Player = () => {
    let playerName = '';
    let playerSymbol = ''

    return {}
}
