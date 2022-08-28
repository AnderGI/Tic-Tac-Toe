const controllGameFlow = (function(){
    const cellEl = document.querySelectorAll('.cell');
    const X_Marker = 'x'
    const O_Marker = 'circle'
    let circleTurn = false
    const dialog = document.getElementById('popUp')
    const dialogMssg = document.querySelector('[data-winner-mssg]')
    const restartBtn = document.getElementById('restartBtn')
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

    const weaponContainer = document.getElementById('chooseWeapon')
    const OorX = document.querySelectorAll('.weapon')

    //User choose x or o


    //Choose weapon O or X

    OorX.forEach(element=>{
        element.addEventListener('click',()=>{
            if(element.classList.contains(X_Marker)){
                console.log('x marker')
            } else if (element.classList.contains(O_Marker)){
                console.log('o marker')
            }
        } )
    })
    
    //close modal
    const _restartGame = ()=>{
            dialog.close()
            cellEl.forEach(cell=>{
                cell.classList.remove(X_Marker)
                cell.classList.remove(O_Marker)
                cell.removeEventListener('click', handleClick)
                cell.addEventListener('click', handleClick, { once:true })
            })
    }

    restartBtn.addEventListener('click', _restartGame)
    
    const handleClick = (e)=>{
        let cell = e.target ;
        const currentClass = circleTurn ? O_Marker : X_Marker ;
        //add class
        const _addAClass = ()=>{
            cell.classList.add(currentClass)
        }
        _addAClass()

        //switch class everytime a cell is clicked
        const _switchClass = ()=>{
            circleTurn = !circleTurn
        }

    
        //check for winning combinations
        const _winningCombinations = ()=>{
            return WINNING_COMBINATIONS.some(combination=>{
                return combination.every(index=>{
                    return cellEl[index].classList.contains(currentClass)
                })
            })
        }
        _winningCombinations()

        //check for draw
        const _draw = ()=>{
            return [...cellEl].every(cell =>{
                return cell.classList.contains(X_Marker) || cell.classList.contains(O_Marker)
            })
        }
        _draw()

        //function that checks and displays win, draw or continue playing
        const _endGame = ()=>{
            if(_winningCombinations()){
                dialog.showModal()
                dialogMssg.innerHTML = `${circleTurn ? `O's` : `X's`} wins!`
            }else if(_draw()){
                dialog.showModal()
                dialogMssg.innerHTML = 'DRAW!'
            }else{
                _switchClass()
            }
        }
        _endGame()

    }

    cellEl.forEach(cell => cell.addEventListener('click', handleClick, { once:true }));
})();



