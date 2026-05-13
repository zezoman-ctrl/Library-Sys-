const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const categoryFilter = document.getElementById('categoryFilter');
const tableBody = document.getElementById('booksTableBody');

function filterBooks() {
    if (!tableBody) return;
    const query = searchInput.value.toLowerCase().trim();
    const type = searchType ? searchType.value : 'name';
    const category = categoryFilter ? categoryFilter.value : '';
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const id = row.getAttribute('data-id') || '';
        const name = row.getAttribute('data-name') || '';
        const author = row.getAttribute('data-author') || '';
        const cat = row.getAttribute('data-category') || '';

        let matchesQuery = false;
        if (query) {
            switch (type) {
                case 'id':
                    matchesQuery = id.includes(query);
                    break;
                case 'name':
                    matchesQuery = name.toLowerCase().includes(query);
                    break;
                case 'author':
                    matchesQuery = author.toLowerCase().includes(query);
                    break;
                case 'category':
                    matchesQuery = cat.toLowerCase().includes(query);
                    break;
            }
        } else {
            matchesQuery = true;
        }

        const matchesCategory = category === '' || cat === category;

        if (matchesQuery && matchesCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterBooks);
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterBooks();
        }
    });
}
if (searchType) {
    searchType.addEventListener('change', filterBooks);
}
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterBooks);
}
