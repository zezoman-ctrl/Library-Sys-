document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const tableBody = document.getElementById('booksTableBody');
    const totalCount = document.getElementById('totalCount');
    const availableCount = document.getElementById('availableCount');
    const borrowedCount = document.getElementById('borrowedCount');

    const allRows = Array.from(tableBody.querySelectorAll('tr[data-book]'));
    function updateStats(visibleRows) {
        totalCount.textContent = visibleRows.length;
        availableCount.textContent = visibleRows.filter(r => r.dataset.status === 'available').length;
        borrowedCount.textContent = visibleRows.filter(r => r.dataset.status === 'borrowed').length;
    }

    function filterBooks() {
        const query = searchInput.value.toLowerCase().trim();
        const cat = categoryFilter.value.toLowerCase();
        const status = statusFilter.value.toLowerCase();
        const visible = [];

        allRows.forEach(row => {
            const title = (row.dataset.title || '').toLowerCase();
            const author = (row.dataset.author || '').toLowerCase();
            const rowCat = (row.dataset.category || '').toLowerCase();
            const rowStatus = (row.dataset.status || '').toLowerCase();

            const matchSearch = !query || title.includes(query) || author.includes(query);
            const matchCat = !cat || rowCat === cat;
            const matchStatus = !status || rowStatus === status;

            if (matchSearch && matchCat && matchStatus) {
                row.style.display = '';
                visible.push(row);
            } else {
                row.style.display = 'none';
            }
        });

        const emptyState = document.getElementById('emptyState');
        if (emptyState) emptyState.style.display = visible.length === 0 ? '' : 'none';

        updateStats(visible);
    }

    searchInput.addEventListener('input', filterBooks);
    categoryFilter.addEventListener('change', filterBooks);
    statusFilter.addEventListener('change', filterBooks);

    updateStats(allRows);
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
