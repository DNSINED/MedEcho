import os
import pandas as pd
from joblib import load

import os
from joblib import load

models_base_path = os.path.join(os.path.dirname(__file__), 'models')
label_base_path = os.path.join(os.path.dirname(__file__))

random_forest_model = load(os.path.join(models_base_path, 'random_forest_model.joblib'))
decision_tree_model = load(os.path.join(models_base_path, 'decision_tree_tuned_model.joblib'))
mlp_model = load(os.path.join(models_base_path, 'multi-layer_perceptron_model.joblib'))
label_encoder = load(os.path.join(label_base_path, 'label_encoder.joblib'))  

def process_files_with_ai(file_paths):
    data_0 = pd.read_csv(file_paths[0])
    data_1 = pd.read_csv(file_paths[1])
    data_2 = pd.read_csv(file_paths[2])

    rndforest_probs = random_forest_model.predict_proba(data_0)
    dcstree_probs = decision_tree_model.predict_proba(data_1)
    mlp_probs = mlp_model.predict_proba(data_2)

    rndforest_predictions = label_encoder.inverse_transform(rndforest_probs.argmax(axis=1))
    rndforest_confidence = rndforest_probs.max(axis=1) * 100
    dcstree_predictions = label_encoder.inverse_transform(dcstree_probs.argmax(axis=1))
    dcstree_confidence = dcstree_probs.max(axis=1) * 100
    mlp_predictions = label_encoder.inverse_transform(mlp_probs.argmax(axis=1))
    mlp_confidence = mlp_probs.max(axis=1) * 100

    output = {
        "Random Forest": {
            "Predictions": rndforest_predictions.tolist(),
            "Confidence": rndforest_confidence.tolist()
        },
        "Decision Tree": {
            "Predictions": dcstree_predictions.tolist(),
            "Confidence": dcstree_confidence.tolist()
        },
        "Multi-layer Perceptron": {
            "Predictions": mlp_predictions.tolist(),
            "Confidence": mlp_confidence.tolist()
        }
    }
    return output
