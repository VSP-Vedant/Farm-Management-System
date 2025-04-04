import pandas as pd
import os

def preprocess_crop_data():
    # Set the folder where the raw crop data is stored.
    input_folder = os.path.join("crop_rotation_data")
    df = pd.read_pickle(os.path.join(input_folder, "crop_data.pkl"))
    print("Loaded raw crop data. Shape:", df.shape)

    # Define required input features and target.
    input_features = [
        "Region", "Season", "Soil Type", "Soil pH", "Soil Nitrogen",
        "Soil Phosphorus", "Soil Potassium", "Soil Organic Matter (%)",
        "Soil Moisture (%)", "Avg Rainfall (mm)", "Solar Radiation Impact (BTU/sqft)",
        "Rotation Sequence"
    ]
    target = "Crop_Planted (Action)"

    # Ensure all required columns are present.
    for col in input_features + [target]:
        if col not in df.columns:
            raise KeyError(f"Expected column '{col}' not found in the dataset.")

    # Select only the required columns.
    df = df[input_features + [target]]
    print("Data shape after selecting required features:", df.shape)

    # Fill missing numerical values with the median.
    num_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
    df[num_cols] = df[num_cols].fillna(df[num_cols].median())

    # Fill missing categorical values with the mode.
    cat_cols = df.select_dtypes(include=["object"]).columns.tolist()
    for col in cat_cols:
        df[col] = df[col].fillna(df[col].mode()[0])

    # One-hot encode the categorical features (for input features only).
    df_encoded = pd.get_dummies(df, columns=[col for col in input_features if col in cat_cols], drop_first=True)
    
    # Save the preprocessed data in the dedicated folder.
    output_folder = os.path.join("crop_rotation_data")
    os.makedirs(output_folder, exist_ok=True)
    df_encoded.to_pickle(os.path.join(output_folder, "data_preprocessed_crop.pkl"))
    print("Crop data preprocessed. Final shape:", df_encoded.shape)
    
    return df_encoded

if __name__ == "__main__":
    preprocess_crop_data()