document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun');
    const moonIcon = document.getElementById('moon');
    const userIcon = document.getElementById('user');
    const userWhite = document.getElementById('userwhite');
    const symptomInput = document.getElementById('symptom-input');
    const dropdownContent = document.getElementById('dropdown-content');
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const sendRequestBtn = document.getElementById('send-request');
    const sympSection = document.getElementById('symp');
    let resultContainer;

    const grammaticalSymptoms = [
        "Abdominal Pain",
        "Abnormal Menstruation",
        "Altered Sensorium",
        "Back Pain",
        "Blackheads",
        "Bladder Discomfort",
        "Bloody Stool",
        "Brittle Nails",
        "Chest Pain",
        "Chills",
        "Coma",
        "Congestion",
        "Constipation",
        "Continuous Feeling of Urine",
        "Cough",
        "Dark Urine",
        "Diarrhea",
        "Dizziness",
        "Distention of Abdomen",
        "Family History",
        "Fatigue",
        "Headache",
        "High Fever",
        "Hip Joint Pain",
        "Increased Appetite",
        "Indigestion",
        "Internal Itching",
        "Irritability",
        "Itching",
        "Joint Pain",
        "Knee Pain",
        "Lack of Concentration",
        "Loss of Balance",
        "Malaise",
        "Mild Fever",
        "Movement Stiffness",
        "Mucoid Sputum",
        "Muscle Pain",
        "Muscle Wasting",
        "Nausea",
        "Nodal Skin Eruptions",
        "Obesity",
        "Pain Behind the Eyes",
        "Pain in Anal Region",
        "Painful Walking",
        "Palpitations",
        "Passage of Gases",
        "Phlegm",
        "Pus-filled Pimples",
        "Receiving Blood Transfusion",
        "Red Sore Around Nose",
        "Red Spots Over Body",
        "Restlessness",
        "Runny Nose",
        "Skin Peeling",
        "Slurred Speech",
        "Spotting on Urination",
        "Stomach Pain",
        "Sunken Eyes",
        "Sweating",
        "Unsteadiness",
        "Vomiting",
        "Weight Loss",
        "Yellowing of Eyes"
    ];
    
    const commonSymptoms = [
        "abdominal_pain",
        "abnormal_menstruation",
        "altered_sensorium",
        "back_pain",
        "blackheads",
        "bladder_discomfort",
        "bloody_stool",
        "brittle_nails",
        "chest_pain",
        "chills",
        "coma",
        "congestion",
        "constipation",
        "continuous_feel_of_urine",
        "cough",
        "dark_urine",
        "diarrhoea",
        "dizziness",
        "distention_of_abdomen",
        "family_history",
        "fatigue",
        "headache",
        "high_fever",
        "hip_joint_pain",
        "increased_appetite",
        "indigestion",
        "internal_itching",
        "irritability",
        "itching",
        "joint_pain",
        "knee_pain",
        "lack_of_concentration",
        "loss_of_balance",
        "malaise",
        "mild_fever",
        "movement_stiffness",
        "mucoid_sputum",
        "muscle_pain",
        "muscle_wasting",
        "nausea",
        "nodal_skin_eruptions",
        "obesity",
        "pain_behind_the_eyes",
        "pain_in_anal_region",
        "painful_walking",
        "palpitations",
        "passage_of_gases",
        "phlegm",
        "pus_filled_pimples",
        "receiving_blood_transfusion",
        "red_sore_around_nose",
        "red_spots_over_body",
        "restlessness",
        "runny_nose",
        "skin_peeling",
        "slurred_speech",
        "spotting_urination",
        "stomach_pain",
        "sunken_eyes",
        "sweating",
        "unsteadiness",
        "vomiting",
        "weight_loss",
        "yellowing_of_eyes"
    ];
    
    const rndforest_symptoms = [
        "muscle_pain",
        "itching",
        "chest_pain",
        "mild_fever",
        "high_fever",
        "family_history",
        "dark_urine",
        "fatigue",
        "yellowing_of_eyes",
        "altered_sensorium",
        "nausea",
        "vomiting",
        "abnormal_menstruation",
        "mucoid_sputum",
        "diarrhoea",
        "joint_pain",
        "lack_of_concentration",
        "abdominal_pain",
        "stomach_pain",
        "increased_appetite",
        "headache",
        "continuous_feel_of_urine",
        "loss_of_balance",
        "passage_of_gases",
        "sweating",
        "unsteadiness",
        "pain_behind_the_eyes",
        "red_spots_over_body",
        "weight_loss"
    ];
    const dcstree_symptoms = [
        "high_fever",
        "fast_heart_rate",
        "malaise",
        "runny_nose",
        "palpitations",
        "abnormal_menstruation",
        "coma",
        "receiving_blood_transfusion",
        "phlegm",
        "pain_behind_the_eyes",
        "mild_fever",
        "brittle_nails",
        "muscle_pain",
        "increased_appetite",
        "chills",
        "obesity",
        "distention_of_abdomen",
        "unsteadiness",
        "knee_pain",
        "internal_itching",
        "weight_loss",
        "bladder_discomfort",
        "skin_peeling",
        "lack_of_concentration",
        "red_sore_around_nose",
        "movement_stiffness",
        "irritability",
        "pain_in_anal_region",
        "mucoid_sputum",
        "altered_sensorium",
        "diarrhoea",
        "dizziness",
        "chest_pain",
        "stomach_pain",
        "family_history",
        "dark_urine",
        "spotting_ urination",
        "dischromic _patches"
    ];
    const mlp_symptoms = [
        "muscle_wasting",
        "blackheads",
        "spotting_ urination",
        "itching",
        "indigestion",
        "nausea",
        "congestion",
        "bladder_discomfort",
        "cough",
        "painful_walking",
        "palpitations",
        "hip_joint_pain",
        "back_pain",
        "dark_urine",
        "bloody_stool",
        "fast_heart_rate",
        "abdominal_pain",
        "constipation",
        "vomiting",
        "sunken_eyes",
        "breathlessness",
        "slurred_speech",
        "nodal_skin_eruptions",
        "pus_filled_pimples",
        "restlessness",
        "high_fever"
    ];
    
    let symptoms = [];

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
            userWhite.style.display = 'inline';
            userIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
            userWhite.style.display = 'none';
            userIcon.style.display = 'inline';
        }
    });

    function toggleDropdown() {
        if (dropdownContent.classList.contains('hidden')) {
            dropdownContent.classList.remove('hidden')
            dropdownContent.innerHTML = ''; 
            commonSymptoms.forEach(symptom => {
                if(!symptoms.includes(symptom)){
                    const div = document.createElement('div');
                    div.classList.add('dropdown-item');
                    div.textContent = grammaticalSymptoms[commonSymptoms.indexOf(symptom)];
                    div.onclick = () => {
                        addSymptom(symptom);
                        div.style.display = "none";
                        if(symptoms.length == commonSymptoms.length) toggleDropdown();
                    }
                    dropdownContent.appendChild(div);
                }
            });
        } else {
            dropdownContent.classList.add('hidden')
        }
    }

    function addSymptom(symptom) {
        if (!symptoms.includes(symptom)) {
            symptoms.push(symptom);
            updateSelectedSymptoms();
        }
        symptomInput.value = '';
    }

    function updateSelectedSymptoms() {
        selectedSymptomsContainer.innerHTML = '';
        symptoms.forEach(symptom => {
            const div = document.createElement('div');
            div.className = 'selected-item';
            div.textContent = grammaticalSymptoms[commonSymptoms.indexOf(symptom)];
            div.onclick = () => {
                symptoms.splice(symptoms.indexOf(symptom), 1);
                updateSelectedSymptoms();
            }
            selectedSymptomsContainer.appendChild(div);
        });
        if(symptoms.length > 2){
            const clearAll = document.createElement('div');
            clearAll.classList.add('selected-item');
            clearAll.id = "clear-all";
            clearAll.textContent = "clear";
            clearAll.onclick = () => {
                symptoms = [];
                selectedSymptomsContainer.innerHTML = '';
            }
            selectedSymptomsContainer.appendChild(clearAll);
        }
    }

    symptomInput.addEventListener('focus', toggleDropdown);

    document.addEventListener('click', (event) => {
        if (!dropdownContent.contains(event.target) && event.target !== symptomInput) {
            dropdownContent.classList.add('hidden');
        }
    });

    sendRequestBtn.addEventListener('click', async () => {
        if (symptoms.length === 0) {
            alert('Please add at least one symptom.');
            return;
        }

        try {
            let data0 = {};
            let data1 = {};
            let data2 = {};

            rndforest_symptoms.forEach(s => {
                data0[s] = symptoms.includes(s) ? "1" : "0";
            });
            dcstree_symptoms.forEach(s => {
                data1[s] = symptoms.includes(s) ? "1" : "0";
            });
            mlp_symptoms.forEach(s => {
                data2[s] = symptoms.includes(s) ? "1" : "0";
            });

            const response = await fetch('/process-files/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "symptoms": {
                        "csv0": data0,
                        "csv1": data1,
                        "csv2": data2
                    }
                })
            });

            if (!response.ok) throw new Error('Failed to send data to backend');

            const result = await response.json();
            showResult(result);
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

    function showResult(result) {
        if(resultContainer != null) sympSection.removeChild(resultContainer);
        resultContainer = document.createElement("div");
        resultContainer.className = "result-container";
    
        const sortedResults = Object.entries(result)
        .map(([model, data]) => ({
            model,
            prediction: data.Predictions[0],
            confidence: data.Confidence[0]
        }))
        .sort((a, b) => b.confidence - a.confidence); 
        sortedResults.forEach(({ model, prediction, confidence }) => {
            const modelContainer = document.createElement("div");
            modelContainer.className = "model-container";

            const title = document.createElement("h3");
            title.className = "model-title";
            title.textContent = `${prediction}`;
            modelContainer.appendChild(title);

            const confidenceText = document.createElement("p");
            confidenceText.className = "confidence";
            confidenceText.textContent = `Accuracy: ${confidence.toFixed(2)}%`;
            modelContainer.appendChild(confidenceText);

            resultContainer.appendChild(modelContainer);
        }); 
    
        
        sympSection.appendChild(resultContainer);
    }

    function filterSymptoms() {
        const query = symptomInput.value.toLowerCase();
        dropdownContent.innerHTML = '';
        
        commonSymptoms.forEach((symptom, index) => {
            const displayName = grammaticalSymptoms[index];
            if (displayName.toLowerCase().includes(query) && !symptoms.includes(symptom)) {
                const div = document.createElement('div');
                div.classList.add('dropdown-item');
                div.textContent = displayName;
                div.onclick = () => {
                    addSymptom(symptom);
                    div.style.display = "none";
                };
                dropdownContent.appendChild(div);
            }
        });
        
        if (dropdownContent.children.length > 0) {
            dropdownContent.classList.remove('hidden');
        } else {
            dropdownContent.classList.add('hidden');
        }
    }

    symptomInput.addEventListener('input', filterSymptoms);

symptomInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        
        const firstVisibleSymptom = dropdownContent.querySelector('.dropdown-item');
        if (firstVisibleSymptom) {
            const symptomText = firstVisibleSymptom.textContent;
            const symptomIndex = grammaticalSymptoms.indexOf(symptomText);
            if (symptomIndex !== -1) {
                const symptomCode = commonSymptoms[symptomIndex];
                addSymptom(symptomCode);
            }
        }
        
        symptomInput.value = '';
        filterSymptoms();
    }
});

});