(function(){

    let gameboard = ["","","","","","","","",""]

const GameBoard = (function(){
    
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
        return gameboard
    };
  
   const restartGameBoard = ()=>{
        gameboard = ["","","","","","","","",""]
    };

    const setGameBoardValue = (i,value)=>{
        gameboard[i] = value
        console.log(gameboard)
    };

    const winner = (container,value)=>{
        return WINNING_COMBINATIONS.some(combination=>{
            return combination.every(index=>{
                return container[index].classList.contains(value)
            })
        })
    };

    const draw = (container, cell, Xvalue, Ovalue) =>{
        return [...container].every(cell=>{
            return cell.classList.contains(Xvalue) || cell.classList.contains(Ovalue)
        })
    };
    
    return{getGameBoard,restartGameBoard,setGameBoardValue, winner, draw};
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
  

        //check for winner or draw and display message in the popup text
        const dialogPopUp = document.getElementById('popUp')
        const popUpText = document.querySelector('[data-winner-mssg]')

        const endGame = ()=>{
            if(GameBoard.winner(cellElements,currentClass)){
                dialogPopUp.showModal()
                popUpText.textContent = `${circleTurn ? "O" : "X"} wins!` 
            } else if(GameBoard.draw(cellElements, cell, X_Class, O_Class)){
                dialogPopUp.showModal()
                popUpText.textContent = `Draw!`
            } else{
                switchClass()
            }
        }
        endGame()


        //restart game once a button is clicked either if there is a winner or a draw
        //remove classlists and event listener and add the event listener once again
        //so its set up to default value
        const restartBtn = document.getElementById('restartBtn')

        const restartGame = () =>{
            cell.classList.remove(X_Class)
            cell.classList.remove(O_Class)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once:true })
            GameBoard.restartGameBoard()
        dialogPopUp.close()

        }
        restartBtn.addEventListener('click', restartGame)
    }

    cellElements.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))

})();

const Player = (function(){

})();


const AI = (function(){

    const bestMove = ()=>{

    }
})();


})();

