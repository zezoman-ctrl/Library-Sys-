const searchInput = document.querySelector('.search-bar input');
const searchResults = document.createElement('div');
searchResults.classList.add('search-results');
document.querySelector('.search-bar').appendChild(searchResults);

const books = [
    'Harry Potter',
    'The Shining',
    'Sapiens',
    'The Hobbit',
    '1984',
    'Pride and Prejudice'
];

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';

    if(query.length > 0){
        const filtered = books.filter(book => 
            book.toLowerCase().startsWith(query)
        );

        filtered.forEach(book => {
            const div = document.createElement('div');
            div.textContent = book;
            div.classList.add('search-item');
            searchResults.appendChild(div);
        });

        searchResults.classList.add('show');
    } else {
        searchResults.classList.remove('show');
    }
});

document.addEventListener('click', (e) => {
    if(!searchInput.contains(e.target) && !searchResults.contains(e.target)){
        searchResults.classList.remove('show');
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){
        searchResults.classList.remove('show');
    }
});

searchResults.addEventListener('click', (e) => {
    if(e.target.classList.contains('search-item')){
        searchInput.value = e.target.textContent;
        searchResults.classList.remove('show');
    }
});
