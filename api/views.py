from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def status(request):
    return Response({'message': 'Django + React + Tailwind stack is working!', 'status': 'ok'})


@api_view(['GET', 'POST'])
def items(request):
    if request.method == 'GET':
        return Response({'items': ['Item 1', 'Item 2', 'Item 3']})
    name = request.data.get('name', '').strip()
    if not name:
        return Response({'error': 'name is required'}, status=400)
    return Response({'created': name}, status=201)
