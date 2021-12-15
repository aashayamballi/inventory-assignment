from django.urls import path

from .views import InventoryAPIView, CategoryAPIView

urlpatterns = [
    path("product/", InventoryAPIView.as_view(), name="inventory"),
    path("category/", CategoryAPIView.as_view(), name="category")
]