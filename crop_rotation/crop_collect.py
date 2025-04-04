import pandas as pd
import os

def collect_data(csv_path):
    # Load the raw CSV file.
    df = pd.read_csv(csv_path)
    print("Crop rotation data collected successfully! Shape:", df.shape)
    
    # Create a dedicated output folder for crop rotation pickle files.
    output_folder = os.path.join("crop_rotation_data")
    os.makedirs(output_folder, exist_ok=True)
    
    # Save the raw data as a pickle in the dedicated folder.
    df.to_pickle(os.path.join(output_folder, "crop_data.pkl"))
    
    return df

if __name__ == "__main__":
    # Use a relative path to the raw CSV file.
    csv_path = os.path.join("data", "crop_rotation_data.csv")
    collect_data(csv_path)