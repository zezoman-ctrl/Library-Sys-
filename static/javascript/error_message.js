setTimeout(() => {
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(t => {
            t.style.transform = 'translateX(120%)';
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 500);
        });
    }, 4000);