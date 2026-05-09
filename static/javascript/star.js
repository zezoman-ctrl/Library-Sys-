const starsContainer = document.getElementById('stars');
if(starsContainer){ 
    starsContainer.innerHTML = ''; 
    
    for(let i=0; i<150; i++){
        let star = document.createElement('span');
        let size = Math.random() * 2 + 1;
        star.style.position = 'absolute';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        star.style.opacity = Math.random();
        starsContainer.appendChild(star);
    }
}