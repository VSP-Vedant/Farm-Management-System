import os
import joblib

def predict_fertilizer(temperature, humidity, moisture, soil_type, crop_type,
                       nitrogen, potassium, phosphorous):
    # Load the trained model and encoders from the models folder.
    model = joblib.load(os.path.join("models", "fertilizer_model.pkl"))
    le_soil = joblib.load(os.path.join("models", "soil_encoder.pkl"))
    le_crop = joblib.load(os.path.join("models", "crop_encoder.pkl"))
    le_fertilizer = joblib.load(os.path.join("models", "fertilizer_encoder.pkl"))

    # Encode categorical inputs.
    soil_encoded = le_soil.transform([soil_type])[0]
    crop_encoded = le_crop.transform([crop_type])[0]

    # Prepare input data in the expected order.
    input_data = [[
        temperature,
        humidity,
        moisture,
        soil_encoded,
        crop_encoded,
        nitrogen,
        potassium,
        phosphorous
    ]]

    # Predict and decode the fertilizer recommendation.
    prediction = model.predict(input_data)
    fertilizer_name = le_fertilizer.inverse_transform(prediction)[0]
    return fertilizer_name

def main():
    try:
        temperature = int(input("Enter temperature (°C): "))
        humidity = int(input("Enter humidity (%): "))
        moisture = int(input("Enter moisture (%): "))
        soil_type = input("Enter soil type (e.g., Loamy, Sandy, Clayey, etc.): ")
        crop_type = input("Enter crop type (e.g., Maize, Paddy, Cotton, etc.): ")
        nitrogen = int(input("Enter nitrogen value: "))
        potassium = int(input("Enter potassium value: "))
        phosphorous = int(input("Enter phosphorous value: "))
    except ValueError:
        print("Invalid input. Please ensure you enter numeric values where required.")
        return

    result = predict_fertilizer(
        temperature, humidity, moisture,
        soil_type, crop_type, nitrogen, potassium, phosphorous
    )
    print("Recommended Fertilizer:", result)

if __name__ == "__main__":
    main()