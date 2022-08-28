const introToWeapon = (function(){
    const startBtn = document.getElementById('startBtn')

    const _displayWeaponContainer = ()=>{
        const introSection = document.getElementById('introPage')
        introSection.style.cssText=`
        opacity:0;
        z-index:-1;
        `

    }
    startBtn.addEventListener('click', _displayWeaponContainer)
})();

const weaponToContainer = (function(){
    const weaponContainer = document.getElementById('chooseWeapon')
    const OorX = document.querySelectorAll('.weapon')

    const _displayTicTacToe = ()=>{
        weaponContainer.style.cssText=`
        opacity:0;
        z-index:-2;
        `  
    }

    OorX.forEach(element=>{
        element.addEventListener('click', _displayTicTacToe)
    })
})();
