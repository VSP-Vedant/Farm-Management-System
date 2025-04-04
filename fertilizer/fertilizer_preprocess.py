import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib
import os

def preprocess_data(file_path):
    # Load dataset using a relative path.
    df = pd.read_csv(file_path)
    
    # Clean up column names by stripping extra whitespace.
    df.columns = df.columns.str.strip()
    print("Columns in dataset:", df.columns.tolist())

    # Check for required columns.
    if "Soil Type" not in df.columns:
        raise KeyError("Column 'Soil Type' is missing in the dataset.")
    
    # Acceptable names for crop information.
    if "Crop Type" in df.columns:
        crop_column = "Crop Type"
    elif "Crop_Planted (Action)" in df.columns:
        crop_column = "Crop_Planted (Action)"
    else:
        raise KeyError("No valid crop column found. Expected 'Crop Type' or 'Crop_Planted (Action)'.")
        
    if "Fertilizer Name" not in df.columns:
        raise KeyError("Column 'Fertilizer Name' is missing in the dataset.")
    
    # Fill missing numeric values with the mean.
    df.fillna(df.mean(numeric_only=True), inplace=True)
    
    # Encode categorical variables.
    le_soil = LabelEncoder()
    le_crop = LabelEncoder()
    le_fertilizer = LabelEncoder()
    
    df["Soil Type"] = le_soil.fit_transform(df["Soil Type"])
    df[crop_column] = le_crop.fit_transform(df[crop_column])
    df["Fertilizer Name"] = le_fertilizer.fit_transform(df["Fertilizer Name"])
    
    # Create the models folder if necessary and save the encoders.
    os.makedirs("models", exist_ok=True)
    joblib.dump(le_soil, os.path.join("models", "soil_encoder.pkl"))
    joblib.dump(le_crop, os.path.join("models", "crop_encoder.pkl"))
    joblib.dump(le_fertilizer, os.path.join("models", "fertilizer_encoder.pkl"))
    
    return df

if __name__ == "__main__":
    file_path = os.path.join("data", "fertilizer_data.csv")
    df = preprocess_data(file_path)
    print("Fertilizer Data Preprocessing Complete. Dataset shape:", df.shape)