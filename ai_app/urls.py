from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),              # Landing page (index.html)
    path('symptom-checker/', views.ai_search, name='ai_search'),  # Symptom checker page (AISearch.html)
    path('process-files/', views.process_files, name='process_files'),  # API endpoint for AI processing
]