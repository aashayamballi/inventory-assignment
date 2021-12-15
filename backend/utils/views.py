from django.http import JsonResponse

def error_500(request):
    response = {
        "message": "Something went wrong",
        "description": "We're working on fixing the issue as soon as possible"
    }
    return JsonResponse(data=response)