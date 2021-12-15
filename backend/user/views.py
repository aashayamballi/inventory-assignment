from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .backend import JWTAuthentication
from .serializer import UserSerializer
from .models import User

class UserAPIView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_name = request.user.user_name
        user_data = User.objects.get(user_name=user_name)
        user_serialized_data = UserSerializer(user_data).data
        return Response(user_serialized_data, status=status.HTTP_200_OK)
    