import os
import pandas as pd
import pickle

def predict_crop(
    region, season, soil_type, soil_ph, soil_nitrogen, soil_phosphorus,
    soil_potassium, soil_organic_matter, soil_moisture, avg_rainfall,
    solar_radiation, rotation_sequence
):
    # Determine the project root relative to this script.
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.join(current_dir, "..")
    
    # Load the trained crop rotation model and the label encoder.
    models_folder = os.path.join(project_root, "crop_rotation_models")
    with open(os.path.join(models_folder, "rf_model.pkl"), "rb") as f:
         model = pickle.load(f)
    with open(os.path.join(models_folder, "label_encoder.pkl"), "rb") as f:
         le = pickle.load(f)
    
    # Load the preprocessed crop data to obtain the column names.
    data_preprocessed_path = os.path.join(project_root, "crop_rotation_data", "data_preprocessed_crop.pkl")
    df = pd.read_pickle(data_preprocessed_path)
    target = "Crop_Planted (Action)"
    X_train = df.drop(columns=[target])
    
    # Create a new sample from the inputs.
    new_sample = {
         "Region": region,
         "Season": season,
         "Soil Type": soil_type,
         "Soil pH": soil_ph,
         "Soil Nitrogen": soil_nitrogen,
         "Soil Phosphorus": soil_phosphorus,
         "Soil Potassium": soil_potassium,
         "Soil Organic Matter (%)": soil_organic_matter,
         "Soil Moisture (%)": soil_moisture,
         "Avg Rainfall (mm)": avg_rainfall,
         "Solar Radiation Impact (BTU/sqft)": solar_radiation,
         "Rotation Sequence": rotation_sequence,
    }
    
    new_data = pd.DataFrame([new_sample])
    # One-hot encode the categorical features similarly to preprocessing.
    categorical_columns = ["Region", "Season", "Soil Type", "Rotation Sequence"]
    new_data_encoded = pd.get_dummies(new_data, columns=categorical_columns, drop_first=True)
    new_data_encoded = new_data_encoded.reindex(columns=X_train.columns, fill_value=0)
    
    predicted_label = model.predict(new_data_encoded)
    predicted_crop = le.inverse_transform(predicted_label)
    return predicted_crop[0]

def main():
    try:
        region = input("Enter region: ")
        season = input("Enter season: ")
        soil_type = input("Enter soil type: ")
        soil_ph = float(input("Enter soil pH: "))
        soil_nitrogen = float(input("Enter soil nitrogen: "))
        soil_phosphorus = float(input("Enter soil phosphorus: "))
        soil_potassium = float(input("Enter soil potassium: "))
        soil_organic_matter = float(input("Enter soil organic matter (%): "))
        soil_moisture = float(input("Enter soil moisture (%): "))
        avg_rainfall = float(input("Enter average rainfall (mm): "))
        solar_radiation = float(input("Enter solar radiation (BTU/sqft): "))
        rotation_sequence = input("Enter rotation sequence: ")
    except ValueError:
        print("Invalid input. Please enter numeric values appropriately!")
        return
    
    result = predict_crop(
         region, season, soil_type, soil_ph, soil_nitrogen, soil_phosphorus,
         soil_potassium, soil_organic_matter, soil_moisture, avg_rainfall,
         solar_radiation, rotation_sequence
    )
    print("Predicted Crop for the new sample:", result)

if __name__ == "__main__":
    main()