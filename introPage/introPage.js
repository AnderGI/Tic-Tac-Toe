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
