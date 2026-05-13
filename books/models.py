from django.conf import settings
from users.models import Signup
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    published_date = models.DateField()
    description = models.TextField()
    image = models.ImageField(upload_to='books/')
    borrow_price_per_day = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    @property
    def is_borrowed(self):
        return self.borrow_set.filter(is_returned=False).exists()

    def __str__(self):
        return self.title


class Borrow(models.Model):
    user = models.ForeignKey(Signup, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    days = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.email} - {self.book.title}"