document.addEventListener('DOMContentLoaded', () => {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.4s ease forwards';
        row.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 100);
    });
});