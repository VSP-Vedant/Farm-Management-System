import os
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

def train_crop_model():
    # Determine the project root relative to this script.
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.join(current_dir, "..")
    
    # Load the preprocessed crop data from the dedicated folder.
    data_preprocessed_path = os.path.join(project_root, "crop_rotation_data", "data_preprocessed_crop.pkl")
    df = pd.read_pickle(data_preprocessed_path)
    
    target = "Crop_Planted (Action)"
    if target not in df.columns:
        raise KeyError(f"Target column '{target}' not found in preprocessed data.")
    
    # Encode the target variable.
    le = LabelEncoder()
    df[target] = le.fit_transform(df[target])
    print(f"Encoded '{target}' successfully.")
    
    # Separate features and target.
    X = df.drop(columns=[target])
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print("Training set shape:", X_train.shape, "Test set shape:", X_test.shape)
    
    # Train the model.
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Create the crop_rotation_models folder (relative to the project root).
    models_folder = os.path.join(project_root, "crop_rotation_models")
    os.makedirs(models_folder, exist_ok=True)
    
    # Save the model and the encoder.
    with open(os.path.join(models_folder, "rf_model.pkl"), "wb") as f:
         pickle.dump(model, f)
    with open(os.path.join(models_folder, "label_encoder.pkl"), "wb") as f:
         pickle.dump(le, f)
    
    print("Crop rotation model training complete.")
    return model

if __name__ == "__main__":
    train_crop_model()