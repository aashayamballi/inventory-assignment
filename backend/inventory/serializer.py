from rest_framework import serializers

from .models import Product, Category
from user.serializer import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", 
                                                required=False, read_only=True)
    updated_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", 
                                                required=False, read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category'] = CategorySerializer(instance.category).data
        return response
    
    def create(self, validated_data):
        request = self.context['request']
        user = request.user

        created_obj = Product.objects.create(**validated_data, created_by=user)
        return created_obj
    
    def update(self, instance_obj, validated_data):
        instance_obj.name = validated_data.get("name")
        instance_obj.description = validated_data.get("description")
        instance_obj.category = validated_data.get("category")
        instance_obj.units = validated_data.get("units")
        instance_obj.save()

        return instance_obj