# academy/views.py
from rest_framework import generics
from .models import Course, Lesson
from .serializers import CourseSerializer

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer