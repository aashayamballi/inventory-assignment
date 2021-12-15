from django.http import JsonResponse

from .custom_exceptions import (
    InvalidRequestBody, MethodNotAllowed, NotAcceptable, NotFound, 
    PermissionDenied
)
def general_exception(view):
    def wrapper(request, *args, **kwargs):
        try:
            return view(request, *args, **kwargs)
        except InvalidRequestBody as e:
            raise e
        except MethodNotAllowed as e:
            raise e
        except NotAcceptable as e:
            raise e
        except NotFound as e:
            raise e
        except PermissionDenied as e:
            raise e
        except Exception as e:
            err_data = {
                "message": "Server error",
                "description": "Something went wrong, we're working on fixing it ASAP"
            }
            return JsonResponse(err_data, safe=False, status=500)

    
    return wrapper
            