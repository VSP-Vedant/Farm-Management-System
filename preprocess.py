import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib


def preprocess_data(file_path):
    # Load the dataset
    df = pd.read_csv(file_path)

    # Handle Missing Values (fill numeric columns with their mean)
    df.fillna(df.mean(numeric_only=True), inplace=True)

    # Encode categorical variables
    le_soil = LabelEncoder()
    le_crop = LabelEncoder()
    le_fertilizer = LabelEncoder()

    df["Soil Type"] = le_soil.fit_transform(df["Soil Type"])
    df["Crop Type"] = le_crop.fit_transform(df["Crop Type"])
    df["Fertilizer Name"] = le_fertilizer.fit_transform(df["Fertilizer Name"])

    # Save the encoders for later use
    joblib.dump(le_soil, "soil_encoder.pkl")
    joblib.dump(le_crop, "crop_encoder.pkl")
    joblib.dump(le_fertilizer, "fertilizer_encoder.pkl")

    return df


# Example usage:
if __name__ == "__main__":
    file_path = r"D:\\VEDANT MASTER\\VIT College\\!Sem_4\\Mini Project\\Fertilizer_Prediction_Augmented.csv"
    df = preprocess_data(file_path)
    print("Data Preprocessing Complete. Dataset shape:", df.shape)
