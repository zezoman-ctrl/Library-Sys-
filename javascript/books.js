document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('booksTableBody');
    const totalCount = document.getElementById('totalCount');
    const availableCount = document.getElementById('availableCount');
    const borrowedCount = document.getElementById('borrowedCount');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    function getBooks() {
        return JSON.parse(localStorage.getItem('library_books')) || [];
    }

    function getBorrowedIds() {
        const borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        return borrowed.map(b => String(b.ID || b.id || b.bookId));
    }

    function renderBooks() {
        const books = getBooks();
        const borrowedIds = getBorrowedIds();
        const query = searchInput.value.toLowerCase().trim();
        const cat = categoryFilter.value.toLowerCase();
        const status = statusFilter.value.toLowerCase();

        tableBody.innerHTML = '';
        let total = 0, available = 0, borrowed = 0;

        books.forEach(book => {
            const id = String(book.ID || book.id || '');
            const title = String(book.bookName || book.title || '');
            const author = String(book.author || '');
            const category = String(book.category || '');
            const desc = String(book.description || '');
            const isBorrowed = borrowedIds.includes(id);
            const bookStatus = isBorrowed ? 'borrowed' : 'available';

            const matchSearch = !query || title.toLowerCase().includes(query) || author.toLowerCase().includes(query);
            const matchCat = !cat || category.toLowerCase() === cat;
            const matchStatus = !status || bookStatus === status;
            if (!matchSearch || !matchCat || !matchStatus) return;

            total++;
            if (isBorrowed) borrowed++; else available++;

            const statusBadge = isBorrowed
                ? `<span class="badge badge-borrowed"><span>&#9679;</span> Borrowed</span>`
                : `<span class="badge badge-available"><span>&#9679;</span> Available</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="book-id">${id.padStart(3, '0')}</td>
                <td class="book-title">${title}</td>
                <td class="book-author">${author}</td>
                <td><span class="badge badge-category">${category}</span></td>
                <td class="book-desc">${desc}</td>
                <td>${statusBadge}</td>
            `;
            tableBody.appendChild(tr);
        });

        totalCount.textContent = total;
        availableCount.textContent = available;
        borrowedCount.textContent = borrowed;

        const emptyState = document.getElementById('emptyState');
        if (emptyState) emptyState.style.display = total === 0 ? '' : 'none';

        populateCategories(books);
    }

    function populateCategories(books) {
        const existing = Array.from(categoryFilter.options).map(o => o.value);
        const cats = [...new Set(books.map(b => b.category).filter(Boolean))];
        cats.forEach(cat => {
            if (!existing.includes(cat.toLowerCase())) {
                const opt = document.createElement('option');
                opt.value = cat.toLowerCase();
                opt.textContent = cat;
                categoryFilter.appendChild(opt);
            }
        });
    }

    searchInput.addEventListener('input', renderBooks);
    categoryFilter.addEventListener('change', renderBooks);
    statusFilter.addEventListener('change', renderBooks);

    renderBooks();
});

function showToast(message, type = 'success') {
    let toastBox = document.getElementById('toastBox');
    if (!toastBox) {
        toastBox = document.createElement('div');
        toastBox.id = 'toastBox';
        document.body.appendChild(toastBox);
    }
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'error') toast.classList.add('error');
    toast.innerHTML = message;
    toastBox.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}