from django.shortcuts import render

def manage_books(request):
    return render(request, 'Manage Books.html')

def add_book_view(request):
    return render(request, 'Add Book.html')

def edit_book_view(request):
    return render(request, 'Edit Book.html')

def book_details_view(request):
    return render(request, 'book.html')

def books_pages_view(request):
    return render(request, 'books_pages.html')

def search_view(request):
    return render(request, 'Welcome.html')

def borrowed_view(request):
    return render(request, 'borrowed.html')
