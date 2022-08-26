
//Everything to do win playing, winning or losing in the game.

const GameFlowController = (function(){
    const cellEl = document.querySelectorAll('.item')
    const X_Marker = "x"
    const O_Marker = "circle"
    let circleTurn = false
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
    const winnerPopUp = document.getElementById('winnerDialog')
    let isPlaying = true

    const handleClick = (e)=>{
        const cell = e.target
        const currentClass = circleTurn ? O_Marker : X_Marker

        //Add a class when clicking
        const _addAClass = ()=>{
            cell.classList.add(currentClass)
        }
        _addAClass()

        //Switch the Turn
        const _switchTurn = ()=>{
            circleTurn = !circleTurn
        }
        _switchTurn()

        //Display the content 
        /*
        const _displayContent = ()=>{
          cell.textContent =  circleTurn ? 'X' : 'O'
        }
        _displayContent()
        */

        //Check for win
        const _winner= () =>{
            return WINNING_COMBINATIONS.some(combination =>{
                return combination.every(index => {
                    return cellEl[index].classList.contains(currentClass)
                })
            })
        }
        _winner()
        
        //Check for a winner and finish whenever there is a winner
        const _checkWinner = ()=>{
            isPlaying = _winner() ? false : true
            if(isPlaying===false){
                winnerPopUp.showModal()
                console.log('game over')
            }
        }
        _checkWinner()

        //Restart the game
        let closeWinningModal = document.getElementById('playAgain')
            closeWinningModal.addEventListener('click', ()=>{
                winnerPopUp.close()
                isPlaying = true
               
            })
    };
    cellEl.forEach(cell=> cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (playerName)=>{
    const sayName = ()=> console.log(`The name of the player is ${playerName}`)
    return {sayName}
};





