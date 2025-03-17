from django.shortcuts import render
from rest_framework import generics
from .models import MovieUpload
from .serializers import MovieUploadSerializer


class MovieUploadList(generics.ListCreateAPIView):
    serializer_class = MovieUploadSerializer
    queryset = MovieUpload.objects.all()


class MovieUploadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MovieUploadSerializer
    queryset = MovieUpload.objects.all()

    # def put(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(self.get_object(), data=request.data, partial=True)

    #     if serializer.is_valid():
    #         instance = serializer.save()
    #         payload = jwt_payload_handler(instance)
    #         token = jwt.encode(payload, site_config.SECRET_KEY)
    #         response = JsonResponse({'token': token.decode('unicode_escape')})
    #         response.status = 200
    #         return response
    #     else:
    #         response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         return response

