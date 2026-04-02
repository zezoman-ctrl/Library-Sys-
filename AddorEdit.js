
var STORAGE_KEY = "library_books";

var DEFAULT_BOOKS = [
    { ID: "1", bookName: "Clean Code",    author: "Robert Martin", category: "Programming",      description: "" },
    { ID: "2", bookName: "Atomic Habits", author: "James Clear",   category: "Self Development", description: "" },
    { ID: "3", bookName: "Harry Potter",  author: "J.K Rowling",   category: "Fantasy",          description: "" }
];

function loadBooks() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    saveBooks(DEFAULT_BOOKS);
    return DEFAULT_BOOKS;
}

function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}


function getQueryParams() {
    var params = {};
    var search = window.location.search.slice(1);
    if (!search) return params;
    search.split("&").forEach(function (pair) {
        var parts = pair.split("=");
        var key   = decodeURIComponent(parts[0]);
        var value = parts.slice(1).map(decodeURIComponent).join("=");
        params[key] = value;
    });
    return params;
}


function initManagePage() {

    var allLinks = document.querySelectorAll("a");
    allLinks.forEach(function (link) {
        if (link.textContent.trim() === "Add Book") {
            link.href = "Add Book.html";
        }
    });

    var params = getQueryParams();
    if (params.ID) {
        var books = loadBooks();
        var isEdit = params._edit === "true";

        if (isEdit) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].ID === params.ID) {
                    books[i].bookName    = params.bookName   || "";
                    books[i].author      = params.author     || "";
                    books[i].category    = params.category   || "";
                    books[i].description = params.description || "";
                    break;
                }
            }
        } else {
            var duplicate = books.some(function (b) { return b.ID === params.ID; });
            if (duplicate) {
                alert('A book with ID "' + params.ID + '" already exists.');
            } else {
                books.push({
                    ID:          params.ID,
                    bookName:    params.bookName    || "",
                    author:      params.author      || "",
                    category:    params.category    || "",
                    description: params.description || ""
                });
            }
        }

        saveBooks(books);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    renderTable();
}

function renderTable() {
    var books = loadBooks();

    var tables = document.querySelectorAll("table");
    var booksTable = tables[1];
    if (!booksTable) return;

    var rows = booksTable.querySelectorAll("tr");
    rows.forEach(function (row, index) {
        if (index > 0) row.remove();
    });

    books.forEach(function (book) {
        booksTable.appendChild(buildRow(book));
    });
}

function buildRow(book) {
    var tr = document.createElement("tr");

    function td(text) {
        var cell = document.createElement("td");
        cell.textContent = text || "";
        return cell;
    }

    tr.appendChild(td(book.ID));
    tr.appendChild(td(book.bookName));
    tr.appendChild(td(book.author));
    tr.appendChild(td(book.category));

    var editTd = document.createElement("td");
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        var params = new URLSearchParams({
            ID:          book.ID,
            bookName:    book.bookName,
            author:      book.author,
            category:    book.category,
            description: book.description || ""
        });
        window.location.href = "Edit Book.html?" + params.toString();
    });
    editTd.appendChild(editBtn);
    tr.appendChild(editTd);

    var deleteTd = document.createElement("td");
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        var books = loadBooks();
        books = books.filter(function (b) { return b.ID !== book.ID; });
        saveBooks(books);
        tr.remove();
    });
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);

    return tr;
}


function initEditPage() {
    var params = getQueryParams();
    if (!params.ID) return;

    var fields = ["ID", "bookName", "author", "category", "description"];
    fields.forEach(function (name) {
        var el = document.querySelector("[name='" + name + "']");
        if (!el) return;
        if (el.tagName === "TEXTAREA") {
            el.textContent = params[name] || "";
        } else {
            el.value = params[name] || "";
        }
    });

    var form = document.querySelector("form");
    if (form) {
        var hidden = document.createElement("input");
        hidden.type  = "hidden";
        hidden.name  = "_edit";
        hidden.value = "true";
        form.appendChild(hidden);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname.toLowerCase();

    if (path.includes("manage")) {
        initManagePage();
    } else if (path.includes("edit")) {
        initEditPage();
    }
});