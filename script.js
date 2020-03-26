//module for the gameboard
const Gameboard = (function(){
    //board tiles
    let r0c0 = ''; let r0c1 = ''; let r0c2 = '';
    let r1c0 = ''; let r1c1 = ''; let r1c2 = '';
    let r2c0 = ''; let r2c1 = ''; let r2c2 = '';

    let gameboardContainer = document.getElementById('gameboardContainer')
    
    let tileList = [...document.querySelectorAll('.tile')];

    tileList.forEach(element => {
        element.addEventListener('click', function( event ) {
            event.target.setAttribute("style", "background-color: red;")})});



    return {
        r0c0,r0c1,r0c2,
        r1c0,r1c1,r1c2,
        r2c0,r2c1,r2c2,
        
        gameboardContainer

    }
})();


