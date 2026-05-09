from django.conf import settings
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    published_date = models.DateField()
    description = models.TextField()
    image = models.ImageField(upload_to='books/')
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Borrow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.book.title}"

    class Meta:
        unique_together = ['user', 'book']