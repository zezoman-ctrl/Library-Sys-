# StarLibrary - Online Library Management System

StarLibrary is a fully functional, vanilla frontend web application designed to simulate an online library. Users can browse a catalog of books, register for an account, borrow books, and manage their profiles. It also includes library management features for adding, editing, and deleting books. All data is handled locally using the browser's `localStorage`.

## 🚀 Features

* **User Authentication:** * Sign up with a new account or log in as an existing user.
  * Secure guest viewing vs. authenticated user access.
* **Book Catalog & Search:** * Browse the complete library catalog.
  * Real-time search bar to find books by title or author.
  * Filter books by category (e.g., Programming, Fantasy) and availability status.
* **Borrowing System:**
  * View detailed book pages before borrowing.
  * Borrow books and track them in a dedicated "Borrowed" dashboard.
  * Automatic due date calculation and overdue status tracking.
* **Library Management (CRUD):** * **Create:** Add new books with custom categories and descriptions.
  * **Read:** View total library statistics (Total, Available, Borrowed).
  * **Update:** Edit existing book details.
  * **Delete:** Remove books from the library.
* **User Profile:** * View and update user details (Full Name, Password).
  * Dynamic avatar with user initials.
* **Dynamic UI:** * Animated starry background.
  * Custom toast notifications for user actions (success/error).
  * Responsive navigation bar that updates based on login status.

## 🛠️ Technologies Used

* **HTML5:** Semantic structuring of all application pages.
* **CSS3:** Custom styling, flexbox/grid layouts, glassmorphism UI effects, and CSS animations.
* **JavaScript (Vanilla):** DOM manipulation, event handling, and logic.
* **LocalStorage API:** Client-side database for persisting user accounts, book inventory, and borrowing history without needing a backend server.

## 📂 Project Structure

### HTML Pages
* `login.html` & `signup.html` - User authentication pages.
* `books_pages.html` - The main catalog displaying all books.
* `book.html` - Detailed view of a single book with borrowing functionality.
* `borrowed.html` - User dashboard showing currently borrowed books and due dates.
* `Manage Books.html` - Admin view displaying a grid of all books with edit/delete actions.
* `Add Book.html` & `Edit Book.html` - Forms for managing the library's inventory.
* `profile.html` - User profile management page.

### CSS Styles (`/style/`)
* `style.css` & `style2.css` - Global layout, typography, and background animations.
* `auth.css` - Styling for login and signup forms.
* `book_style.css`, `add-book.css`, `edit-book.css`, `manage-books.css` - Modular stylesheets for specific library features.
* `profile.css` - User profile UI styling.

### JavaScript Scripts (`/javascript/`)
* `auth.js` - Handles user registration, login validation, and session creation.
* `books.js` & `book.js` - Renders the catalog, handles filtering, and manages the borrowing logic.
* `borrowed.js` - Calculates and renders borrowed book statuses (on-time vs. overdue).
* `manage-books.js` & `AddorEdit.js` - Handles the logic for creating, updating, and deleting books in LocalStorage.
* `navbar.js` - Dynamically renders navigation links based on user authentication.
* `profile.js` - Manages user profile updates.
* `search.js` - Real-time predictive search logic.

## 💻 How to Run Locally

1. Clone or download this repository to your local machine.
2. No backend server, Node.js, or database installation is required!
3. Simply open the main entry file (usually `Welcome.html` or `index.html`) in your preferred web browser.
4. *Tip:* To test the borrowing features, create a test account via the **Sign Up** page first.

## 🧹 Clearing Data
Since the application uses `localStorage`, all data will persist between browser sessions. If you want to reset the library to its default state, you can clear your browser's site data, or open your browser's Developer Tools (F12) -> Application -> Local Storage -> Right-click and "Clear".
