const borrowbtn = document.querySelector(".borrow_btn");
const toast = document.getElementById("toast");
const availability = document.querySelector("#status p");
const backToLoginDiv = document.querySelector(".backtologin");
const backToLoginBtn = document.querySelector(".backtologin button");
let STORAGE_KEY = "library_books";

function getIdParam() {
	let params = new URLSearchParams(window.location.search);
	let id = params.get("id");
	return id;
}

function checkIfBookBorrowed(bookId) {
	const borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
	return borrowed.some(b => String(b.id) === String(bookId));
}

function loadBook() {
	let id = getIdParam();
	let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
	let book = books.find((b) => b["ID"] === id);
	console.log(book);
	let container = document.querySelector(".book_info");
	if (book) {
		container.querySelector(".book_category").textContent = book.category + "/";
		container.querySelector(".book_name").textContent =
			book.bookName.toUpperCase() || "Unknown Title";
		container.querySelector(".book_author").textContent =
			"Author: " + (book.author || "Unknown Author");
		container.querySelector(".book_meta p:nth-child(1) span").textContent =(book.category || "Unknown Category");
		document.querySelector(".book_description").textContent =
			book.description && book.description.length > 2
				? book.description
				: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto \
					repudiandae obcaecati consequuntur mollitia neque ea, beatae vero\
					dolorem voluptates harum amet hic error quia iure sint magnam a\
					molestias.";
	}
}

function checkUserLoggedIn() {
	let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
	return !!currentUser;
}

function updateUI(){
	let bookId = getIdParam();
	let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
	let borrowedBook = borrowedBooks.find(b => String(b.id) === String(bookId));
	let container = document.querySelector(".book_info");
	container.querySelector(".book_meta p:nth-child(2)").style.display = "block";
	container.querySelector(".book_meta p:nth-child(3)").style.display = "block	"; 
	const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 2);
	container.querySelector(".book_meta p:nth-child(2) span").textContent = today.toISOString().split('T')[0];
	container.querySelector(".book_meta p:nth-child(3) span").textContent = due.toISOString().split('T')[0];
	let x = container.querySelector("#borrowed-books-link");
	x.style.display = "block";
}

function removeBorrowedBook(bookId) {
	let borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
	borrowed = borrowed.filter(b => String(b.id) !== String(bookId));
	localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
}

borrowbtn.onclick = () => {
	if (!checkUserLoggedIn()) {
		backToLoginDiv.style.display = "block";
		return;
	}

	if (checkIfBookBorrowed(getIdParam())) {
			borrowbtn.textContent = "Borrow";
			borrowbtn.style.cursor = "pointer";
			borrowbtn.disabled = false;
			availability.innerHTML = "Available";
			availability.style.color = "#00E676";
			delete removeBorrowedBook(getIdParam());
					let container = document.querySelector(".book_info");
		container.querySelector(".book_meta p:nth-child(2)").style.display = "none";
		container.querySelector(".book_meta p:nth-child(3)").style.display = "none"; 
			let x = container.querySelector("#borrowed-books-link");
			x.style.display = "none";
			return;	
	}

	borrowbtn.textContent = "unBorrow";

	availability.innerHTML = "Borrowed";
	availability.style.color = "#00D2FF";


		toast.classList.add("show");

	setTimeout(() => {
		toast.classList.remove("show");
	}, 3000);
	borrowBook(getIdParam());
		updateUI();

};
backToLoginBtn.onclick = () => {
	backToLoginDiv.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
	loadBook(); 
	let bookId = getIdParam();
	if (checkIfBookBorrowed(bookId)) {
		borrowbtn.textContent = "Borrowed";
		borrowbtn.style.cursor = "not-allowed";
		borrowbtn.disabled = true;
		availability.innerHTML = "Borrowed";
		availability.style.color = "#00D2FF";
		updateUI();
	}else{
		let container = document.querySelector(".book_info");
		container.querySelector(".book_meta p:nth-child(2)").style.display = "none";
		container.querySelector(".book_meta p:nth-child(3)").style.display = "none"; 
	}
		if (checkIfBookBorrowed(getIdParam())) {
			borrowbtn.textContent = "unBorrow";
			borrowbtn.style.cursor = "pointer";
			borrowbtn.disabled = false;
	}
});

function borrowBook(bookId) {
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const books = JSON.parse(localStorage.getItem('library_books')) || [];

    const book = books.find(b => String(b.ID || b.id) === String(bookId));

    if (!book) return;

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 2);

    const newBorrow = {
        id: bookId,
        bookName: book.bookName,
        author: book.author,
        category: book.category,
        borrowDate: today.toISOString().split('T')[0],
        dueDate: due.toISOString().split('T')[0]
    };

    borrowed.push(newBorrow);

    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
}