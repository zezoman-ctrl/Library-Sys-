document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const tableBody = document.getElementById('borrowedTableBody');
    const totalCount = document.getElementById('totalCount');
    const overdueCount = document.getElementById('overdueCount');

    const allRows = Array.from(tableBody.querySelectorAll('tr[data-book]'));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    allRows.forEach(row => {
        const dueDateStr = row.dataset.due;
        if (!dueDateStr) return;
        const due = new Date(dueDateStr);
        due.setHours(0, 0, 0, 0);

        if (due < today) {
            row.dataset.overdue = 'true';
            const dueTd = row.querySelector('.due-date');
            if (dueTd) dueTd.classList.add('date-overdue');
            const badge = row.querySelector('.badge');
            if (badge) {
                badge.className = 'badge badge-overdue';
                badge.innerHTML = '<span>&#9679;</span> Overdue';
            }
            showToast(`"${row.dataset.title}" is overdue!`, 'error');
        }
    });

    function updateStats(visibleRows) {
        totalCount.textContent = visibleRows.length;
        overdueCount.textContent = visibleRows.filter(r => r.dataset.overdue === 'true').length;
    }

    function filterRows() {
        const query = searchInput.value.toLowerCase().trim();
        const statusVal = statusFilter.value;
        const visible = [];

        allRows.forEach(row => {
            const title = (row.dataset.title || '').toLowerCase();
            const author = (row.dataset.author || '').toLowerCase();
            const isOverdue = row.dataset.overdue === 'true';

            const matchSearch = !query || title.includes(query) || author.includes(query);
            const matchStatus =
                statusVal === '' ||
                (statusVal === 'borrowed' && !isOverdue) ||
                (statusVal === 'overdue' && isOverdue);

            if (matchSearch && matchStatus) {
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

    searchInput.addEventListener('input', filterRows);
    statusFilter.addEventListener('change', filterRows);

    filterRows();
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
