from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),   
    path('symptom-checker/', views.ai_search, name='ai_search'),  
    path('process-files/', views.process_files, name='process_files'),  
]