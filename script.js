const gameBoard = (function(){
    let gameboard = [];
})();

const displayController = (function(){
    //listen to every click event on every cell of the grid conatiner
    const containerEl = document.querySelectorAll('.item'); //this is a node list (similar to array)
    const handleClick = ()=>{
        console.log('cell clicked')
    }
    containerEl.forEach(cell => cell.addEventListener('click', handleClick, { once:true }))
})();

const Player = (playerName)=>{
    const getName = () => console.log(playerName);
    const playerTurn = () => console.log(`It's ${playerName}s' turn`)
    return{playerTurn}
};