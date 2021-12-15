from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated


from user.backend import JWTAuthentication
from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer

class InventoryAPIView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_list_of_products(self, search_param):
        if search_param:
            products_qs = Product.objects.filter(
                category__category_name__icontains=search_param).select_related(
                    "category","created_by")
        else:
            products_qs = Product.objects.all().select_related("category",
            "created_by")

        return ProductSerializer(products_qs, many=True).data
    
    def get_single_product(self, product_id):
        single_product_obj = get_object_or_404(Product, id=product_id)
        return ProductSerializer(single_product_obj).data
    
    def get(self, request):
        search_param = request.query_params.get("search")
        single_product_id = request.query_params.get("product_id")

        if single_product_id:
            serialized_data = self.get_single_product(single_product_id)
        else:
            serialized_data = self.get_list_of_products(search_param)

        return Response(serialized_data)
    
    def post(self, request):
        create_data = request.data.get("create_product")
        serializer = ProductSerializer(data=create_data, context={
                                                            'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request):
        updated_data = request.data.get("edit_product_data")
        product_id = request.data.get("product_id")

        product_obj = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product_obj, data=updated_data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        product_id = request.data.get("product_id")
        product_obj = get_object_or_404(Product, id=product_id)
        product_obj.delete()

        return Response(f"{product_id} deleted successfully")


class CategoryAPIView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, _):
        category_qs = Category.objects.all()
        serialized_data = CategorySerializer(category_qs, many=True).data
        return Response(serialized_data)
