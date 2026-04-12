function renderTable() {
    var books = loadBooks();
    var grid = document.getElementById('booksGrid');
    var countEl = document.getElementById('booksCount');

    grid.innerHTML = '';
    countEl.textContent = books.length + ' book' + (books.length !== 1 ? 's' : '') + ' in library';

    if (books.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = '<p>No books in the library yet.</p><a href="Add Book.html">+ Add First Book</a>';
        grid.appendChild(empty);
        return;
    }

    books.forEach(function (book) {
        grid.appendChild(buildCard(book));
    });
}

function buildCard(book) {
    var card = document.createElement('div');
    card.className = 'book-card';

    var editParams = new URLSearchParams({
        ID:          book.ID,
        bookName:    book.bookName,
        author:      book.author,
        category:    book.category,
        description: book.description || ''
    });

    card.innerHTML =
        '<span class="category-tag">' + (book.category || 'General') + '</span>' +
        '<span class="book-id">ID: ' + book.ID + '</span>' +
        '<h3>' + book.bookName + '</h3>' +
        '<p class="book-author">by ' + book.author + '</p>' +
        (book.description ? '<p class="book-desc">' + book.description + '</p>' : '') +
        '<div class="card-actions">' +
            '<a class="btn-edit" href="Edit Book.html?' + editParams.toString() + '">Edit</a>' +
            '<button class="btn-delete" data-id="' + book.ID + '">Delete</button>' +
        '</div>';

    card.querySelector('.btn-delete').addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        if (confirm('Delete "' + book.bookName + '" from the library?')) {
            var books = loadBooks();
            books = books.filter(function (b) { return b.ID !== id; });
            saveBooks(books);
            renderTable();
        }
    });

    return card;
}
