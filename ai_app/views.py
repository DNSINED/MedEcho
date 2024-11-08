import csv
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.shortcuts import render
import os
import json

def index(request):
    return render(request, 'index.html')

def ai_search(request):
    return render(request, 'AISearch.html')

@csrf_exempt
def process_files(request):
    if request.method == 'POST':
        # Check if symptoms are sent directly in the request body
        if 'symptoms' in request.body.decode('utf-8'):
            data_symptoms = request.body.decode('utf-8')
            symptoms_data = json.loads(data_symptoms)
            input_symptoms = symptoms_data['symptoms'].split(',')
        elif 'symptoms_file' in request.FILES:
            # Handle file upload (if this path is needed for CSV uploads in the future)
            file = request.FILES['symptoms_file']
            temp_file_path = default_storage.save(f'temp/{file.name}', file)
            input_symptoms = []
            with default_storage.open(temp_file_path, mode='r') as f:
                reader = csv.reader(f)
                next(reader)  # Skip header
                for row in reader:
                    input_symptoms.append(row[0])
            default_storage.delete(temp_file_path)  # Clean up
        else:
            return JsonResponse({'error': 'No symptoms data provided'}, status=400)

        # Load common symptoms from a text file
        common_symptoms_path = os.path.join('ai_app', 'static', 'data', 'common.txt')
        with open(common_symptoms_path, 'r') as common_file:
            common_symptoms = [line.strip() for line in common_file]

        # Process input symptoms against common symptoms
        results = [{'symptom': symptom, 'present': symptom in input_symptoms} for symptom in common_symptoms]

        # Return JSON response with matched symptoms
        return JsonResponse({'status': 'success', 'results': results})

    return JsonResponse({'error': 'Invalid request method'}, status=400)
