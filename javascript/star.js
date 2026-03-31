const starsContainer = document.getElementById('stars');
if(starsContainer){ 
    for(let i=0; i<200; i++){
        let star = document.createElement('span');
        let size = Math.random()*3;
        star.style.width = size+'px';
        star.style.height = size+'px';
        star.style.left = Math.random()*100+'%';
        star.style.top = Math.random()*100+'%';
        star.style.animationDuration = (Math.random()*5+5)+'s';
        starsContainer.appendChild(star);
    }
}