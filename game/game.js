(function(){

const GameBoard = (function(){
    let gameboard = ["","","","","","","","",""]
    const WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    const getGameBoard = ()=>{
        //return gameBoard
        console.log(gameboard)
    };
    getGameBoard()

   const restartGameBoard = ()=>{
        gameboard = ["","","","","","","","",""]
    };

    const setGameBoardValue = (i,value)=>{
        gameboard[i] = value
        console.log(gameboard[i])
    };

    const winner = (container,value)=>{
        return WINNING_COMBINATIONS.some(combination=>{
            return combination.every(index=>{
                return container[index].classList.contains(value)
            })
        })
    }
    

    return{getGameBoard,restartGameBoard,setGameBoardValue, winner}
})();

const controllGameFlow = (function(){
    const cellElements = document.querySelectorAll('.cell')
    const X_Class = 'x'
    const O_Class = 'circle'
    let circleTurn = false
    const handleClick = (e)=>{
    const cell = e.target
    let currentClass = circleTurn ? O_Class : X_Class
   
        //add a class to cell and to its value in gameboard array every time one of the cells is clicked
        const addClassToCell = () => {
            cell.classList.add(currentClass)
            //until.cell it convert the NodeList Obj to array the it searches the index of the clicked cell

            GameBoard.setGameBoardValue(Array.prototype.slice.call(cellElements).indexOf(cell), currentClass)
            GameBoard.getGameBoard()
        }
        addClassToCell()

        //switch class on every click
        const switchClass = () => {
            circleTurn = !circleTurn
        }
        switchClass()

        //check for winner
       const displayWin = ()=>{
        if(GameBoard.winner(cellElements,currentClass)){
            console.log('winner!')
        }
       }
       displayWin()

    }
  
    cellElements.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (function(){

})();

})();

