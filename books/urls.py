from django.urls import path
from . import views

urlpatterns = [
    path('manage/', views.manage_books, name='manage_books'),
    path('add-book/', views.add_book_view, name='add_book_view'),
    path('edit-book/', views.edit_book_view, name='edit_book'),
    path('book-details/', views.book_details_view, name='book_details'),
    path('books/', views.books_pages_view, name='books_list'),
    path('search/', views.search_view, name='search_books'),
    path('borrowed/', views.borrowed_view, name='borrowed_books'),
]