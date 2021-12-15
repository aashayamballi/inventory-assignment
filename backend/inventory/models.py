from django.db import models

from user.models import User

class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return self.category_name


class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, 
                                                related_name="product_category")
    description = models.TextField()
    units = models.PositiveIntegerField(default=0)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, 
                                                related_name="product_creator")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name