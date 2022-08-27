const startGame = (function(){
    const startBtn = document.getElementById('startBtn')
    const weaponContainer = document.getElementById('chooseWeapon')

    const _displayTicTacToe = ()=>{
        const introSection = document.getElementById('introPage')
        introSection.style.cssText=`
        opacity:0;
        z-index:-1;
        `

    }
    startBtn.addEventListener('click', _displayTicTacToe)
})();