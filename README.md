# 🌟 StarLibrary - Library Management System

Welcome to **StarLibrary**, a full-stack, web-based Library Management System built with **Django**. This platform allows users to browse a collection of books, borrow their favorites, and track their reading list. It also features a secure Admin Control Panel for librarians to manage the book inventory, upload book covers, and track borrowed items.

The application boasts a sleek, modern UI with a unique, animated starry background and glassmorphism design elements.

## ✨ Features

### 👤 User Features
* **Custom Authentication**: Secure Login and Sign-up functionality mapped to custom user profiles.
* **Profile Management**: Users can view and update their profile details and passwords securely.
* **Browse Library**: View a catalog of all available books, complete with cover images and details.
* **Search & Filter**: Search for books by Name, ID, Author, or Category.
* **Advanced Borrowing System**: 
  * View detailed information about a specific book.
  * Borrow books for a specified number of days, with automatic calculation of the total borrow price.
  * Dedicated "My Borrowed Books" page to track active reading materials.
  * "Unborrow" functionality for active checkouts.

### 🛡️ Admin Features (Control Panel)
* **Role-Based Access**: Specialized views protected by `is_admin` session checks.
* **Manage Inventory**: View and oversee all books currently in the library system.
* **Add New Books**: Upload new books with details like Title, Author, Category, Description, Publish Date, Borrow Price, and Cover Image.
* **Edit/Delete Books**: Modify existing book details or securely remove them from the database.
* **Track Borrowed Books**: An overview dashboard to see all books currently borrowed by users, including due dates, overdue statuses, and the ability to manually update return dates.

### 🎨 UI/UX Highlights
* **Dynamic Starry Background**: A custom animated background using vanilla JavaScript (`star.js`).
* **Toast Notifications**: Interactive popup messages utilizing Django's message framework paired with custom JS/CSS.
* **Glassmorphism UI**: Beautiful, semi-transparent frosted glass panels using advanced CSS backdrop-filters.

## 🛠️ Tech Stack

* **Backend**: Python, Django (MVT Architecture)
* **Database**: SQLite (Default) / Django ORM
* **Frontend**: HTML5 (Django Templates), CSS3, Vanilla JavaScript
* **Media Handling**: Django `ImageField` for book cover uploads

## 📂 Project Structure

* **`core/`**: Handles the main landing pages and global routing.
* **`users/`**: Manages custom user authentication, registration, profiles, and session handling.
* **`books/`**: The heart of the library logic. Contains the `Book` and `Borrow` models, and handles CRUD operations for the inventory and borrowing system.
* **`templates/`**: Global HTML templates including `manage-books.html`, `book.html`, and `profile.html`.
* **`static/`**: Contains all static assets categorized by:
  * `style/` (CSS stylesheets)
  * `javascript/` (Frontend logic, animations, and DOM manipulation)
  * `assets/` (Static images and icons)
* **`media/`**: Directory where user-uploaded book covers are securely stored.

## 🚀 Setup and Installation

### Prerequisites
* [Python 3.x](https://www.python.org/) installed on your machine.

### Running the Project Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/StarLibrary.git](https://github.com/yourusername/StarLibrary.git)
   cd StarLibrary
