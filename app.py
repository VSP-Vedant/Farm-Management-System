# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Enables Cross-Origin Resource Sharing
from predict import predict_fertilizer

app = Flask(__name__)
CORS(app)  # This is helpful if your frontend is served from a different server/port

@app.route('/predict', methods=['POST'])
def predict():
    # Parse JSON input
    data = request.get_json(force=True)
    try:
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        moisture = float(data['moisture'])
        soil_type = data['soil_type']
        crop_type = data['crop_type']
        nitrogen = float(data['nitrogen'])
        potassium = float(data['potassium'])
        phosphorous = float(data['phosphorous'])
    except Exception as e:
        return jsonify({"error": "Invalid or missing input", "message": str(e)}), 400

    # Get fertilizer recommendation from your pre-built prediction function
    recommended_fertilizer = predict_fertilizer(
        temperature,
        humidity,
        moisture,
        soil_type,
        crop_type,
        nitrogen,
        potassium,
        phosphorous
    )
    return jsonify({"recommended_fertilizer": recommended_fertilizer}), 200

if __name__ == '__main__':
    app.run(debug=True)