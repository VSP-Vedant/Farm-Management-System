from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import joblib
import pickle
import pandas as pd

# Initialize Flask App with the frontend folder as the static folder.
app = Flask(__name__, static_folder="frontend", static_url_path="")
CORS(app)

# Define model paths using relative paths.
project_root = os.path.dirname(os.path.abspath(__file__))
fertilizer_models_path = os.path.join(project_root, "models")
crop_rotation_models_path = os.path.join(project_root, "crop_rotation_models")
crop_rotation_data_path = os.path.join(project_root, "crop_rotation_data")

# Route to serve the frontend index page.
@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

### FERTILIZER PREDICTION ENDPOINT
@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.get_json()
        
        # Validate input fields.
        required_fields = ["temperature", "humidity", "moisture", "soil_type", "crop_type", "nitrogen", "potassium", "phosphorous"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required input fields"}), 400
        
        # Load the models.
        model = joblib.load(os.path.join(fertilizer_models_path, "fertilizer_model.pkl"))
        le_soil = joblib.load(os.path.join(fertilizer_models_path, "soil_encoder.pkl"))
        le_crop = joblib.load(os.path.join(fertilizer_models_path, "crop_encoder.pkl"))
        le_fertilizer = joblib.load(os.path.join(fertilizer_models_path, "fertilizer_encoder.pkl"))
        
        # Encode categorical inputs.
        soil_encoded = le_soil.transform([data["soil_type"]])[0]
        crop_encoded = le_crop.transform([data["crop_type"]])[0]
        
        # Prepare input data.
        input_data = [[
            data["temperature"], data["humidity"], data["moisture"],
            soil_encoded, crop_encoded, data["nitrogen"], data["potassium"], data["phosphorous"]
        ]]
        
        # Predict fertilizer recommendation.
        prediction = model.predict(input_data)
        recommended_fertilizer = le_fertilizer.inverse_transform(prediction)[0]
        
        return jsonify({"recommended_fertilizer": recommended_fertilizer})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

### CROP ROTATION PREDICTION ENDPOINT
@app.route('/predict-croprotation', methods=['POST'])
def predict_crop_rotation():
    try:
        data = request.get_json()
        
        # Validate input fields.
        required_fields = [
            "region", "season", "soil_type", "soil_ph", "soil_nitrogen", "soil_phosphorus",
            "soil_potassium", "soil_organic_matter", "soil_moisture", "avg_rainfall",
            "solar_radiation", "rotation_sequence"
        ]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required input fields"}), 400
        
        # Load trained model & encoder.
        with open(os.path.join(crop_rotation_models_path, "rf_model.pkl"), "rb") as f:
            model = pickle.load(f)
        with open(os.path.join(crop_rotation_models_path, "label_encoder.pkl"), "rb") as f:
            le = pickle.load(f)
        
        # Load preprocessed training data to get correct feature columns.
        df = pd.read_pickle(os.path.join(crop_rotation_data_path, "data_preprocessed_crop.pkl"))
        target = "Crop_Planted (Action)"
        X_train = df.drop(columns=[target])
        
        # Create a new sample.
        new_sample = {
            "Region": data["region"],
            "Season": data["season"],
            "Soil Type": data["soil_type"],
            "Soil pH": data["soil_ph"],
            "Soil Nitrogen": data["soil_nitrogen"],
            "Soil Phosphorus": data["soil_phosphorus"],
            "Soil Potassium": data["soil_potassium"],
            "Soil Organic Matter (%)": data["soil_organic_matter"],
            "Soil Moisture (%)": data["soil_moisture"],
            "Avg Rainfall (mm)": data["avg_rainfall"],
            "Solar Radiation Impact (BTU/sqft)": data["solar_radiation"],
            "Rotation Sequence": data["rotation_sequence"]
        }
        
        # Convert to DataFrame and one-hot encode categorical features.
        new_data = pd.DataFrame([new_sample])
        categorical_columns = ["Region", "Season", "Soil Type", "Rotation Sequence"]
        new_data_encoded = pd.get_dummies(new_data, columns=categorical_columns, drop_first=True)
        new_data_encoded = new_data_encoded.reindex(columns=X_train.columns, fill_value=0)
        
        # Make prediction.
        predicted_label = model.predict(new_data_encoded)
        recommended_crop = le.inverse_transform(predicted_label)[0]
        
        return jsonify({"recommended_crop": recommended_crop})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
