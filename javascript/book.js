const btn = document.querySelector(".borrow_btn");
const toast = document.getElementById("toast");
const availability = document.querySelector("#status p");

btn.onclick = () => {
	toast.classList.add("show");

	setTimeout(() => {
		toast.classList.remove("show");
	}, 3000);

	btn.textContent = "Borrowed";
	btn.disabled = true;

	availability.innerHTML = "Borrowed";
	availability.style.color = "#f44336";
};
