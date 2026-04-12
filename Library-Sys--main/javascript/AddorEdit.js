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
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach(function (value, key) {
        params[key] = value;
    });
    return params;
}

function initManagePage() {
    var params = getQueryParams();

    if (params.ID) {
        var books = loadBooks();
        var isEdit = params._edit === "true";

        if (isEdit) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].ID === params.ID) {
                    books[i].bookName    = params.bookName    || "";
                    books[i].author      = params.author      || "";
                    books[i].category    = params.category    || "";
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

function initEditPage() {
    var params = getQueryParams();
    if (!params.ID) return;

    var textFields = ["ID", "bookName", "author", "description"];
    textFields.forEach(function (name) {
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
