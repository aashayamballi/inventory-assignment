from django.conf import settings
from datetime import datetime, timedelta


import jwt
from django.contrib.auth.models import (PermissionsMixin,
                                        AbstractBaseUser,
                                        BaseUserManager)
from django.db import models

class UserManager(BaseUserManager):
    """
        custom user manager class for creating super user and a normal user
    """
    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        return self.create_user(email, user_name, first_name, password,
         **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    """
        This is a custom user class and django recommends to create a custom user
        class instead of having the default user model.
    """
    user_name = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    is_staff = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self) -> str:
        return self.user_name
    
    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().

        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        """
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        """
        Generates a JSON Web Token that stores this user's user_id and has
        an expiry date set to 2 days into the future.
        """
        token_expiry_date = datetime.utcnow() + timedelta(days=2)

        token = jwt.encode({
            'id': self.user_name,
            'exp': token_expiry_date,
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')