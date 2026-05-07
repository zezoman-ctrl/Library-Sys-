const nav = document.querySelector('nav');

// Check Local Storage for the user
let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
let isLoggedIn = currentUser !== null;

const guestNav = [
    {text: 'Home', href: '/'},
    {text: 'Books', href: '/books/'},
    {text: 'Log In', href: '/login/'},
    {text: 'Sign Up', href: '/signup/'}
];

const userNav = [
    {text: 'Home', href: '/'},
    {text: 'Books', href: '/books/'},
    {text: 'Borrowed', href: '/borrowed/'},
    {text: 'Profile', href: '/profile/'},
    {text: 'Log Out', href: '#', action: (e) => { 
        e.preventDefault(); 
        localStorage.removeItem('loggedInUser'); 
        isLoggedIn = false; 
        currentUser = null;
        updateNavbar(); 
        window.location.href = '/';
    }}
];

function updateNavbar() {
    nav.innerHTML = '';
    const links = isLoggedIn ? userNav : guestNav;

    links.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item.text;
        a.setAttribute('href', item.href);
        if (item.action) {
            a.addEventListener('click', item.action);
        } else {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = item.href;
            });
        }
        nav.appendChild(a);
    });

    if (isLoggedIn && currentUser) {
        const greeting = document.createElement('span');

        const firstName = currentUser.name.split(' '); 
        
        greeting.textContent = `Hello, ${firstName}!`;
        
        greeting.style.color = '#00d2ff';
        greeting.style.fontWeight = '600';
        greeting.style.padding = '10px 20px';
        greeting.style.letterSpacing = '1px';
        greeting.style.textShadow = '0 0 10px rgba(0, 210, 255, 0.5)';
        
        nav.appendChild(greeting);
    }
}

updateNavbar();