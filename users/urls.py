from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('profile/', views.profile_view, name='profile_update'),
    path('logout/', views.logout_view, name='logout'),
    path('book/', views.books_list_view, name='books_list'),
    

    path('manage-books/', views.manage_books, name='manage_books'),
    path('add-book/', views.add_book_view, name='add_book'),
    path('edit-book/<int:book_id>/', views.edit_book_view, name='edit_book'),
    path('delete-book/<int:book_id>/', views.delete_book, name='delete_book'),
    
    path('manage-users/', views.manage_users, name='manage_users'),
    path('delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
]