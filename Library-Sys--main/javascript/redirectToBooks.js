    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

if (!id) {
    window.location.href = "books_pages.html";
}

