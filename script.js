(function(){

    let gameboard = ["","","","","","","","",""]
    let secondPlayer;
    let firstPlayer;
    const start = document.getElementById('start')

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

    const draw = (container, cell, first, second) =>{
        return [...container].every(cell=>{
            return cell.classList.contains(first) || cell.classList.contains(second)
        })
    };
    
    return{getGameBoard,restartGameBoard,setGameBoardValue, winner, draw};
})();

//Player One

const PlayeOne = (function(){
    const playerOneCharacter = document.querySelectorAll('.character.playerOne')
    const selectFirstCharacter = (e)=>{
        const character = e.target
        firstPlayer = character.id
        const playerOneBtn = document.getElementById('playerOneBtn')
        playerOneBtn.addEventListener('click', ()=>{ 
            start.textContent =`Waiting for Player Two...`
            playerOneBtn.textContent = firstPlayer
        },)
    };

    playerOneCharacter.forEach(item=> item.addEventListener('click', selectFirstCharacter))
})();


//PLayer Two

const Playertwo = (function(){
    const playerTwoCharacter = document.querySelectorAll('.character.playerTwo')      
    const setSecondCharacter = (e) => {
        const character = e.target 
        secondPlayer = character.id
        const playerTwoBtn = document.getElementById('playerTwoBtn')
        playerTwoBtn.addEventListener('click', ()=>{
            start.textContent =`Start the Fight!`
            playerTwoBtn.textContent = secondPlayer
        },)
    }

    playerTwoCharacter.forEach(item=> item.addEventListener('click', setSecondCharacter))

})();



const controllGameFlow = (function(){
    
    const cellElements = document.querySelectorAll('.cell')
   
    let secondPlayerTurn = false
    const handleClick = (e)=>{
    const cell = e.target
    let currentClass = secondPlayerTurn ? secondPlayer : firstPlayer
   
        //add a class to cell and to its value in gameboard array every time one of the cells is clicked
        const addClassToCell = () => {
            cell.classList.add(currentClass)
            //until.call it convert the NodeList Obj to array the it searches the index of the clicked cell
            GameBoard.setGameBoardValue(Array.prototype.slice.call(cellElements).indexOf(cell), currentClass)
            GameBoard.getGameBoard()
            
        }
        addClassToCell()

        //switch class on every click
        const switchClass = () => {
            secondPlayerTurn = !secondPlayerTurn
        }
  

        //check for winner or draw and display message in the popup text
        const dialogPopUp = document.getElementById('popUp')
        const popUpText = document.querySelector('[data-winner-mssg]')

        const endGame = ()=>{
            if(GameBoard.winner(cellElements,currentClass)){
                dialogPopUp.showModal()
                popUpText.textContent = `${secondPlayerTurn ? secondPlayer : firstPlayer} wins!` 
            } else if(GameBoard.draw(cellElements, cell, firstPlayer, secondPlayer)){
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
            cell.classList.remove(firstPlayer)
            cell.classList.remove(secondPlayer)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once:true })
            GameBoard.restartGameBoard()
        dialogPopUp.close()

        }
        restartBtn.addEventListener('click', restartGame)
    }

    cellElements.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))

})();

/*set tic tac toe viible (from the intro page to the game)*/
const setTicTacVisible = (function(){
    const start = document.getElementById('start')
    const visible = ()=>{
        const intro = document.getElementById('introPage')
        intro.style.cssText = `
        opacity:0;
        z-index:-1;
        `
    }

    start.addEventListener('click',visible)
})();





})();

