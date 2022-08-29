(function(){

const GameBoard = (function(){
    let gameboard = ["","","","","","","","",""]
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
    

    return{getGameBoard,restartGameBoard,setGameBoardValue}
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


    }
  
    cellElements.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (function(){

})();

})();

