from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "is_active", "is_admin", "is_staff"]
    search_fields = ["email", "username"]
    list_filter = ["is_active", "is_admin", "is_staff"]
    ordering = ["email"]

    class Meta:
        model = User


admin.site.register(User,UserAdmin)
