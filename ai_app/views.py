import csv
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.shortcuts import render
import pandas as pd
from .ai import process_files_with_ai
import os
import json

def index(request):
    return render(request, 'index.html')

def ai_search(request):
    return render(request, 'AISearch.html')

def save_csv_without_trailing_newline(df, file_path):
    # Save the CSV file
    df.to_csv(file_path, index=False)
    
    # Open the file in binary read-write mode
    with open(file_path, 'rb+') as file:
        file.seek(0, 2)  # Move to the end of the file
        pos = file.tell() - 1
        file.seek(pos)
        
        # Check for a newline at the end and remove it if present
        if file.read(1) == b'\n':
            file.seek(pos)
            file.truncate()

@csrf_exempt
def process_files(request):
    if request.method == 'POST':
        # Check if symptoms are sent directly in the request body
        if 'symptoms' in request.body.decode('utf-8'):
            data_symptoms = request.body.decode('utf-8')
            symptoms_data = json.loads(data_symptoms)
            data0 = symptoms_data['symptoms']['csv0']
            data1 = symptoms_data['symptoms']['csv1']
            data2 = symptoms_data['symptoms']['csv2']

            # Convert to DataFrame
            df0 = pd.DataFrame([data0])
            df1 = pd.DataFrame([data1])
            df2 = pd.DataFrame([data2])
            # Save DataFrames as CSVs
            temp_path = os.path.join(os.path.dirname(__file__), 'temp_storage')  # Define the temporary storage path
            if not os.path.exists(temp_path):
                os.makedirs(temp_path)
            data0_path = os.path.join(temp_path, 'data0.csv')
            data1_path = os.path.join(temp_path, 'data1.csv')
            data2_path = os.path.join(temp_path, 'data2.csv')
            
            save_csv_without_trailing_newline(df0, data0_path)
            save_csv_without_trailing_newline(df1, data1_path)
            save_csv_without_trailing_newline(df2, data2_path)

            # Call AI processing function
            ai_output = process_files_with_ai([data0_path, data1_path, data2_path])

            return JsonResponse(ai_output)
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
