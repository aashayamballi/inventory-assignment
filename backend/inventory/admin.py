from django.contrib import admin

from .models import Product, Category

all_inventory_apps = [Product, Category]

admin.site.register(all_inventory_apps)
