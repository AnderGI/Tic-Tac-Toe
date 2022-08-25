const gameBoard = (function(){
    let gameboard = [];
})();

const displayController = (function(){
    //listen to every click event on every cell of the grid conatiner
    const containerEl = document.querySelectorAll('.item'); //this is a node list (similar to array)
    const X_Marker = 'x';
    const O_Marker = 'circle';
    let circleTurn = false;
     
    const handleClick = (e)=>{
        console.log('cell clicked')
        const cell = e.target;
        let currentClass = circleTurn ? O_Marker : X_Marker;
        
        //add a class
        const addAClass = (cell, currentClass)=>{
            cell.classList.add(currentClass)
        };
        addAClass(cell,currentClass);

        //On every click switch class
        const switchClass = ()=>{
            circleTurn = !circleTurn
        };
        switchClass();

        //Display Content on Each Cell
        const displayCellContent = ()=>{
            cell.textContent = circleTurn ? "X" : "O"
        };
        displayCellContent();
       
        //Check for Win


        //Check for Draw
    }
    containerEl.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (playerName)=>{
    const getName = () => console.log(playerName);
    const playerTurn = () => console.log(`It's ${playerName}s' turn`)
    return{playerTurn}
};