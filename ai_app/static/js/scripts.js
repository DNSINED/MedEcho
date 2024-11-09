document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun');
    const moonIcon = document.getElementById('moon');
    const symptomInput = document.getElementById('symptom-input');
    const dropdownContent = document.getElementById('dropdown-content');
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const sendRequestBtn = document.getElementById('send-request');

    const grammaticalSymptoms = [
        "High Fever",
        "Fast Heart Rate",
        "Malaise",
        "Runny Nose",
        "Palpitations",
        "Abnormal Menstruation",
        "Coma",
        "Receiving Blood Transfusion",
        "Phlegm",
        "Pain Behind the Eyes",
        "Mild Fever",
        "Brittle Nails",
        "Muscle Pain",
        "Increased Appetite",
        "Chills",
        "Obesity",
        "Distention of Abdomen",
        "Unsteadiness",
        "Knee Pain",
        "Internal Itching",
        "Weight Loss",
        "Bladder Discomfort",
        "Skin Peeling",
        "Lack of Concentration",
        "Red Sore Around Nose",
        "Movement Stiffness",
        "Irritability",
        "Pain in Anal Region",
        "Mucoid Sputum",
        "Altered Sensorium",
        "Diarrhea",
        "Dizziness",
        "Chest Pain",
        "Stomach Pain",
        "Family History",
        "Dark Urine",
        "Spotting on Urination",
        "Dischromic Patches",
        "Muscle Wasting",
        "Blackheads",
        "Itching",
        "Indigestion",
        "Nausea",
        "Congestion",
        "Cough",
        "Painful Walking",
        "Hip Joint Pain",
        "Back Pain",
        "Bloody Stool",
        "Abdominal Pain",
        "Constipation",
        "Vomiting",
        "Sunken Eyes",
        "Breathlessness",
        "Slurred Speech",
        "Nodal Skin Eruptions",
        "Pus-filled Pimples",
        "Restlessness",
        "Fatigue",
        "Yellowing of Eyes",
        "Joint Pain",
        "Headache",
        "Continuous Feeling of Urine",
        "Loss of Balance",
        "Passage of Gases",
        "Sweating",
        "Red Spots Over Body"
    ];

    const commonSymptoms = [
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
        "spotting_urination",
        "dischromic_patches",
        "muscle_wasting",
        "blackheads",
        "itching",
        "indigestion",
        "nausea",
        "congestion",
        "cough",
        "painful_walking",
        "hip_joint_pain",
        "back_pain",
        "bloody_stool",
        "abdominal_pain",
        "constipation",
        "vomiting",
        "sunken_eyes",
        "breathlessness",
        "slurred_speech",
        "nodal_skin_eruptions",
        "pus_filled_pimples",
        "restlessness",
        "fatigue",
        "yellowing_of_eyes",
        "joint_pain",
        "headache",
        "continuous_feel_of_urine",
        "loss_of_balance",
        "passage_of_gases",
        "sweating",
        "red_spots_over_body"
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
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        }
    });

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

    function addSymptom(symptom) {
        if (!symptoms.includes(symptom)) {
            symptoms.push(symptom);
            updateSelectedSymptoms();
        }
        dropdownContent.classList.add('hidden');
        symptomInput.value = '';
    }

    function updateSelectedSymptoms() {
        selectedSymptomsContainer.innerHTML = '';
        symptoms.forEach(symptom => {
            const div = document.createElement('div');
            div.className = 'selected-item';
            div.textContent = symptom;
            selectedSymptomsContainer.appendChild(div);
        });
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
