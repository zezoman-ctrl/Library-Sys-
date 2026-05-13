from django.contrib import messages
from django.contrib.auth.hashers import check_password, make_password
from django.shortcuts import redirect, render, get_object_or_404
from .models import Signup
from books.models import Book, Borrow


def is_admin(request):
    return request.session.get('is_admin', False)

def welcome(request):
    return render(request, 'Welcome.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')
        user = Signup.objects.filter(email__iexact=email).first()
        if user and check_password(password, user.password):
            request.session['user_id'] = user.id
            request.session['user_name'] = user.name
            request.session['is_admin'] = user.is_admin 
            return redirect('welcome')
        messages.error(request, 'Invalid email or password.')
    return render(request, 'login.html')

def signup_view(request):
    if request.session.get('user_id'):
        return redirect('welcome')

    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm', '') 

        if password != confirm_password:
            messages.error(request, 'Passwords do not match!')
            return render(request, 'signup.html')

        if Signup.objects.filter(email=email).exists():
            messages.error(request, 'This email is already registered!')
            return render(request, 'signup.html')

        try:
            hashed_password = make_password(password)
            Signup.objects.create(name=name, email=email, password=hashed_password)
            messages.success(request, 'Account created! Please login.')
            return redirect('login')
        except Exception as e:
            messages.error(request, 'An error occurred. Please try again.')

    return render(request, 'signup.html')

def logout_view(request):
    request.session.flush()
    return redirect('welcome')

def profile_view(request):
    user_id = request.session.get('user_id')
    user = get_object_or_404(Signup, id=user_id)
    if request.method == 'POST':
        full_name = request.POST.get('full_name', '').strip()
        current_password = request.POST.get('current_password', '')
        new_password = request.POST.get('new_password', '').strip()

        if not check_password(current_password, user.password):
            messages.error(request, 'Current password is incorrect!')
            return render(request, 'profile.html', {'user': user})

        user.name = full_name
        request.session['user_name'] = full_name
        if new_password:
            user.password = make_password(new_password)
        user.save()
        messages.success(request, 'Profile updated successfully.')
        return redirect('profile_update')
    return render(request, 'profile.html', {'user': user})

def my_borrowed_books(request):
    if request.session.get('is_admin', False):
        return redirect('welcome')
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    borrowed = Borrow.objects.select_related('book').filter(user_id=user_id)
    return render(request, 'my_borrowed.html', {
        'borrowed_books': borrowed
    })

def manage_books(request):
    if not is_admin(request): return redirect('welcome')
    books = Book.objects.all()
    return render(request, 'Manage.html', {'books': books})

def add_book_view(request):
    if not is_admin(request): return redirect('welcome')
    if request.method == 'POST':
        Book.objects.create(
        title=request.POST.get('bookName'),
        author=request.POST.get('author'),
        category=request.POST.get('category'),
        published_date=request.POST.get('published_date'),
        description=request.POST.get('description'),
        image=request.FILES.get('image')
)
        messages.success(request, "Book added successfully!")
        return redirect('manage_books')
    return render(request, 'Add Book.html')

def edit_book_view(request, book_id):
    if not is_admin(request): return redirect('welcome')
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        book.title = request.POST.get('bookName')
        book.author = request.POST.get('author')
        book.category = request.POST.get('category')
        book.description = request.POST.get('description')
        book.save()
        messages.success(request, "Book updated!")
        return redirect('manage_books')
    return render(request, 'Edit Book.html', {'book': book})

def delete_book(request, book_id):
    if is_admin(request):
        get_object_or_404(Book, id=book_id).delete()
    return redirect('manage_books')


def manage_users(request):
    if not is_admin(request): return redirect('welcome')

    all_users = Signup.objects.all().exclude(id=request.session.get('user_id'))
    return render(request, 'users.html', {'users': all_users})

def delete_user(request, user_id):
    if request.session.get('is_admin'):
        user = get_object_or_404(Signup, id=user_id)
        user.delete()

        messages.success(request, f'User {user.name} has been deleted from database.')
    else:
        messages.error(request, 'Unauthorized action.')
    return redirect('manage_users')

def books_list_view(request):

    books = Book.objects.all()

    available_count = Book.objects.filter(available=True).count()

    borrowed_count = Book.objects.filter(available=False).count()

    return render(request,'books_pages.html',
                  {
                      'books': books,
                      'available_count': available_count,
                      'borrowed_count': borrowed_count
                  })

def borrow_book(request, book_id):

    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('login')

    user = get_object_or_404(Signup, id=user_id)

    book = get_object_or_404(Book, id=book_id)

    if not book.available:
        messages.error(request, "This book is not available.")
        return redirect('books_list')

    Borrow.objects.create(
        user=user,
        book=book
    )

    book.available = False
    book.save()

    messages.success(request, "Book borrowed successfully!")

    return redirect('books_list')

def borrowed_books(request):

    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('login')

    user = get_object_or_404(Signup, id=user_id)

    borrowed = Borrow.objects.filter(user=user)

    return render(request, 'borrowed.html', {
        'borrowed_books': borrowed
    })