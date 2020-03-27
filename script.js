//module for the gameboard
const Gameboard = (function(){
    //board tiles
    let r0c0 = ''; let r0c1 = ''; let r0c2 = '';
    let r1c0 = ''; let r1c1 = ''; let r1c2 = '';
    let r2c0 = ''; let r2c1 = ''; let r2c2 = '';

    let gameboardContainer = document.getElementById('gameboardContainer')
    
    let tileList = [...document.querySelectorAll('.tile')];

    let counter = 0

    tileList.forEach(element => {
        element.addEventListener('click', function(event) {
            //event.target.setAttribute("style", "background-color: red; border-radius: 20px");

            event.target.setAttribute("style", "background-color: rgba(18, 18, 248, 0.50); scale: 80%");

            if (!event.target.classList.value.includes('closed')) {

                let i = document.createElement("i");
                
                if (counter%2 === 0) {
                    i.classList.add('fas')
                    i.classList.add('fa-times')
                } else {
                    i.classList.add('far')
                    i.classList.add('fa-circle')
                }
                i.classList.add('closed')
                event.target.classList.add('closed')
                event.target.appendChild(i);

                counter += 1;
            }
        })
    });

    const reset = function() {
         //function that resets the board
         //clear tiles
         //set counter to 0
         counter = 0;
    }

    const returnCounter = function(){return counter}

    return {
        r0c0,r0c1,r0c2,
        r1c0,r1c1,r1c2,
        r2c0,r2c1,r2c2,
        
        gameboardContainer,
        returnCounter,
        reset

    }
})();


