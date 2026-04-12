document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('borrowedTableBody');
    const totalCount = document.getElementById('totalCount');
    const overdueCount = document.getElementById('overdueCount');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
function getBorrowedBooks() {
        return JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    }

    function getBookDetails(id) {
        const books = JSON.parse(localStorage.getItem('library_books')) || [];
        return books.find(b => String(b.ID || b.id) === String(id)) || {};
    }

    function renderBorrowed() {
        const borrowed = getBorrowedBooks();
        const query = searchInput.value.toLowerCase().trim();
        const statusVal = statusFilter.value;

        tableBody.innerHTML = '';
        let total = 0, overdue = 0;

        borrowed.forEach(entry => {
            const id = String(entry.ID || entry.id || entry.bookId || '');
            const details = getBookDetails(id);
            const title = String(entry.bookName || details.bookName || details.title || '');
            const author = String(entry.author || details.author || '');
            const category = String(entry.category || details.category || '');
            const borrowDate = String(entry.borrowDate || entry.BorrowDate || '');
            const dueDate = String(entry.dueDate || entry.DueDate || entry.returnDate || '');

            const due = new Date(dueDate);
            due.setHours(0, 0, 0, 0);
            const isOverdue = dueDate && due < today;

            const matchSearch = !query ||
                title.toLowerCase().includes(query) ||
                author.toLowerCase().includes(query);
            const matchStatus =
                statusVal === '' ||
                (statusVal === 'borrowed' && !isOverdue) ||
                (statusVal === 'overdue' && isOverdue);

            if (!matchSearch || !matchStatus) return;

            total++;
            if (isOverdue) {
                overdue++;
                showToast(`"${title}" is overdue!`, 'error');
            }

            const statusBadge = isOverdue
                ? `<span class="badge badge-overdue"><span>&#9679;</span> Overdue</span>`
                : `<span class="badge badge-borrowed"><span>&#9679;</span> Borrowed</span>`;

            const dueTdClass = isOverdue ? 'date-cell due-date date-overdue' : 'date-cell due-date';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="book-id">${id.padStart(3, '0')}</td>
                <td class="book-title">${title}</td>
                <td class="book-author">${author}</td>
                <td><span class="badge badge-category">${category}</span></td>
                <td class="date-cell">${borrowDate}</td>
                <td class="${dueTdClass}">${dueDate}</td>
                <td>${statusBadge}</td>
            `;
            tableBody.appendChild(tr);
        });

        totalCount.textContent = total;
        overdueCount.textContent = overdue;

        const emptyState = document.getElementById('emptyState');
        if (emptyState) emptyState.style.display = total === 0 ? '' : 'none';
    }

    searchInput.addEventListener('input', renderBorrowed);
    statusFilter.addEventListener('change', renderBorrowed);

    renderBorrowed();
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