const gameBoard = (function(){
    let gameboard = [];
    return {
        gameboard,
    }
})();

const displayController = (function(){
    //listen to every click event on every cell of the grid conatiner
    const cellEl = document.querySelectorAll('.item'); //this is a node list (similar to array)
    const X_Marker = 'x';
    const O_Marker = 'circle';
    let circleTurn = false;

    let WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
     
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
        const checkWinner = ()=>{
           return WINNING_COMBINATIONS.some(combination =>{
               return combination.every(index=>{
                    return cellEl[index].classList.contains(currentClass)
                })
            })
        }
        if(checkWinner()){console.log('winner')}



        //Check for Draw
    }
    cellEl.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (playerName)=>{
    const getName = () => console.log(playerName);
    const playerTurn = () => console.log(`It's ${playerName}s' turn`)
    return{playerTurn}
};







