from django.contrib import admin

from .models import Signup


@admin.register(Signup)
class SignupAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')
    ordering = ('-created_at',)
