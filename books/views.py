from django.contrib import messages
from django.db.models import Q
from django.shortcuts import redirect, render, get_object_or_404
from django.utils import timezone
from .models import Book, Borrow
from users.models import Signup


def manage_books(request):
    if not request.session.get('is_admin', False):
        return redirect('welcome')
    books = Book.objects.all()
    return render(request, 'Manage Books.html', {'books': books})


def add_book_view(request):
    if not request.session.get('is_admin', False):
        return redirect('welcome')
    if request.method == 'POST':
        Book.objects.create(
            title=request.POST.get('bookName'),
            author=request.POST.get('author'),
            category=request.POST.get('category'),
            published_date=request.POST.get('published_date'),
            description=request.POST.get('description'),
            image=request.FILES.get('image'),
            borrow_price_per_day=request.POST.get('borrow_price_per_day', 0)
        )
        messages.success(request, "Book added successfully!")
        return redirect('manage_books')
    return render(request, 'Add Book.html')


def edit_book_view(request, book_id):
    if not request.session.get('is_admin', False):
        return redirect('welcome')
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        book.title = request.POST.get('bookName')
        book.author = request.POST.get('author')
        book.category = request.POST.get('category')
        book.description = request.POST.get('description')
        book.borrow_price_per_day = request.POST.get('borrow_price_per_day', 0)
        if request.FILES.get('image'):
            book.image = request.FILES.get('image')
        book.save()
        messages.success(request, "Book updated!")
        return redirect('manage_books')
    return render(request, 'Edit Book.html', {'book': book})


def delete_book(request, book_id):
    if not request.session.get('is_admin', False):
        return redirect('welcome')
    get_object_or_404(Book, id=book_id).delete()
    return redirect('manage_books')


def books_list_view(request):
    if request.session.get('is_admin', False):
        return redirect('welcome')
    if not request.session.get('user_id'):
        return redirect('login')
    books = Book.objects.all()
    query = request.GET.get('query', '').strip()
    if query:
        books = books.filter(Q(title__icontains=query) | Q(author__icontains=query))
    borrowed_count = Borrow.objects.filter(is_returned=False).count()
    available_count = Book.objects.count() - borrowed_count
    return render(request, 'books_pages.html', {
        'books': books,
        'available_count': available_count,
        'borrowed_count': borrowed_count
    })


def book_detail_view(request, book_id):
    if request.session.get('is_admin', False):
        return redirect('welcome')
    if not request.session.get('user_id'):
        return redirect('login')
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'book.html', {'book': book})


def borrow_book(request, book_id):
    if request.session.get('is_admin', False):
        return redirect('welcome')
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = get_object_or_404(Signup, id=user_id)
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        days = int(request.POST.get('days', 0))
        if days <= 0:
            messages.error(request, "Invalid number of days.")
            return redirect('books_list')
        total_price = book.borrow_price_per_day * days
        from datetime import timedelta
        return_date = timezone.now() + timedelta(days=days)
        Borrow.objects.create(
            user=user,
            book=book,
            days=days,
            total_price=total_price,
            return_date=return_date
        )
        messages.success(request, f"Book borrowed successfully for {days} days. Total price: ${total_price}")
        return redirect('books_list')
    else:
        return render(request, 'borrow_modal.html', {'book': book})


def borrowed_books(request):
    if not request.session.get('is_admin', False):
        return redirect('welcome')
    if request.method == 'POST':
        borrow_id = request.POST.get('borrow_id')
        return_date = request.POST.get('return_date')
        borrow = get_object_or_404(Borrow, id=borrow_id)
        if return_date:
            borrow.return_date = return_date
            borrow.is_returned = True
            borrow.save()
            messages.success(request, "Return date updated.")
        return redirect('borrowed_books')
    borrowed_items = Borrow.objects.select_related('user', 'book').all()
    total_borrowed = borrowed_items.count()
    overdue_count = Borrow.objects.filter(return_date__lt=timezone.now(), is_returned=False).count()
    return render(request, 'borrowed.html', {
        'borrowed_books': borrowed_items,
        'total_borrowed': total_borrowed,
        'overdue_count': overdue_count
    })
