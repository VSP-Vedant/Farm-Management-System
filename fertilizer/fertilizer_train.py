import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
from fertilizer_preprocess import preprocess_data

def train_model(df):
    # Separate features and target.
    X = df.drop(columns=["Fertilizer Name"])
    y = df["Fertilizer Name"]

    # Split into training and testing sets.
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train the Random Forest classifier.
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Create the models folder (if necessary) and save the model.
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, os.path.join("models", "fertilizer_model.pkl"))

    return model, X_test, y_test

if __name__ == "__main__":
    file_path = os.path.join("data", "fertilizer_data.csv")
    df = preprocess_data(file_path)
    model, X_test, y_test = train_model(df)
    print("Fertilizer Model Training Complete.")