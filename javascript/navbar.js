const nav = document.querySelector('nav');

let isLoggedIn = false;

const guestNav = [
    {text: 'Home', href: 'Welcome.html'},
    {text: 'Books', href: 'book.html'},
    {text: 'Book Details', href: 'books_pages.html'},
    {text: 'Log In', href: 'login.html'},
    {text: 'Sign Up', href: 'signup.html'}
];

const userNav = [
    {text: 'Home', href: 'Welcome.html'},
    {text: 'Books', href: 'book.html'},
    {text: 'Book Details', href: 'books_pages.html'},
    {text: 'Borrowed', href: 'borrowed.html'},
    {text: 'Profile', href: 'profile.html'},
    {text: 'Log Out', href: '#', action: () => { 
        isLoggedIn = false; 
        updateNavbar();
        alert('Logged Out!');
    }}
];

function updateNavbar(){
    nav.innerHTML = '';
    const links = isLoggedIn ? userNav : guestNav;

    links.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        if(item.action) a.addEventListener('click', item.action);
        nav.appendChild(a);
    });
}

updateNavbar();