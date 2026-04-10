const nav = document.querySelector('nav');

// Check Local Storage for the user
let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
let isLoggedIn = currentUser !== null;

const guestNav = [
    {text: 'Home', href: 'Welcome.html'},
    {text: 'Books', href: 'books_pages.html'},
    {text: 'Book Details', href: 'book.html'},
    {text: 'Log In', href: 'login.html'},
    {text: 'Sign Up', href: 'signup.html'}
];

const userNav = [
    {text: 'Home', href: 'Welcome.html'},
    {text: 'Books', href: 'books_pages.html'},
    {text: 'Book Details', href: 'book.html'},
    {text: 'Borrowed', href: 'borrowed.html'},
    {text: 'Profile', href: 'profile.html'},
    {text: 'Log Out', href: '#', action: (e) => { 
        e.preventDefault(); 
        localStorage.removeItem('loggedInUser'); 
        isLoggedIn = false; 
        currentUser = null;
        updateNavbar(); 
        window.location.href = 'Welcome.html';
    }}
];

function updateNavbar() {
    nav.innerHTML = '';
    const links = isLoggedIn ? userNav : guestNav;

    links.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        if(item.action) a.addEventListener('click', item.action);
        nav.appendChild(a);
    });

    if (isLoggedIn && currentUser) {
        const greeting = document.createElement('span');

        const firstName = currentUser.name.split(' '); 
        
        greeting.textContent = `Hello, ${firstName}!`;
        
        greeting.style.color = '#00d2ff';
        greeting.style.fontWeight = '600';
        greeting.style.marginLeft = 'auto';
        greeting.style.padding = '10px 20px';
        greeting.style.letterSpacing = '1px';
        greeting.style.textShadow = '0 0 10px rgba(0, 210, 255, 0.5)';
        
        nav.appendChild(greeting);
    }
}

updateNavbar();