document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun');
    const moonIcon = document.getElementById('moon');
    const symptomInput = document.getElementById('symptom-input');
    const dropdownContent = document.getElementById('dropdown-content');
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const sendRequestBtn = document.getElementById('send-request');

    // Массив симптомов для отображения в выпадающем списке
    const commonSymptoms = [
        "High Fever", "Headache", "Cough", "Sore Throat", "Fatigue", "Dizziness", "Nausea", "Chest Pain", "Vomiting", "Muscle Pain"
    ];
    let symptoms = []; // Массив для хранения выбранных симптомов

    // Смена темы
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        }
    });

    // Функция отображения выпадающего списка симптомов
    function toggleDropdown() {
        dropdownContent.classList.toggle('hidden');
        if (!dropdownContent.classList.contains('hidden')) {
            dropdownContent.innerHTML = ''; 
            commonSymptoms.forEach(symptom => {
                const div = document.createElement('div');
                div.classList.add('dropdown-item');
                div.textContent = symptom;
                div.onclick = () => addSymptom(symptom);
                dropdownContent.appendChild(div);
            });
        }
    }

    // Функция добавления симптома в выбранный список
    function addSymptom(symptom) {
        if (!symptoms.includes(symptom)) {
            symptoms.push(symptom);
            updateSelectedSymptoms();
        }
        dropdownContent.classList.add('hidden');
        symptomInput.value = ''; // Очищаем поле ввода после выбора
    }

    // Обновление списка выбранных симптомов
    function updateSelectedSymptoms() {
        selectedSymptomsContainer.innerHTML = '';
        symptoms.forEach(symptom => {
            const div = document.createElement('div');
            div.className = 'selected-item';
            div.textContent = symptom;
            selectedSymptomsContainer.appendChild(div);
        });
    }

    // Показ выпадающего списка при фокусе на поле ввода
    symptomInput.addEventListener('focus', toggleDropdown);

    // Скрытие списка, если клик вне поля ввода и списка
    document.addEventListener('click', (event) => {
        if (!dropdownContent.contains(event.target) && event.target !== symptomInput) {
            dropdownContent.classList.add('hidden');
        }
    });

    // Отправка симптомов как CSV на сервер
    sendRequestBtn.addEventListener('click', async () => {
        if (symptoms.length === 0) {
            alert('Please add at least one symptom.');
            return;
        }

        try {
            const response = await fetch('/process-files/', {  // Replace with your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    symptoms: symptoms.join(', ')
                })
            });

            if (!response.ok) throw new Error('Failed to send data to backend');

            const result = await response.json();
            console.log(result);  // Log the response from backend or handle accordingly

        } catch (error) {
            alert('There was an error processing your request.');
            console.error('Error:', error);
        }
    });
    
    symptomInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSymptom(symptomInput.value);
        }
    });
});
