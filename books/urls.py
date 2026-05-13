from django.urls import path
from . import views

urlpatterns = [
    path('manage-books/', views.manage_books, name='manage_books'),
    path('add-book/', views.add_book_view, name='add_book'),
    path('edit-book/<int:book_id>/', views.edit_book_view, name='edit_book'),
    path('delete-book/<int:book_id>/', views.delete_book, name='delete_book'),
    path('book/', views.books_list_view, name='books_list'),
    path('book/<int:book_id>/', views.book_detail_view, name='book_details'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('borrowed/', views.borrowed_books, name='borrowed_books'),
]