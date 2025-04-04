from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib


def train_model(df):
    # Separate features and target
    X = df.drop(columns=["Fertilizer Name"])
    y = df["Fertilizer Name"]

    # Split into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Initialize and train the Random Forest classifier
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save the trained model
    joblib.dump(model, "fertilizer_model.pkl")

    return model, X_test, y_test


# Example usage:
if __name__ == "__main__":
    # Ensure df is loaded from preprocessing part
    from pathlib import Path

    if not Path("Fertilizer_Prediction_Augmented.csv").exists():
        print("Dataset file not found.")
    else:
        # Assuming you have run the preprocessing and have df in memory,
        # or you can load it from disk if previously saved.
        # Here, for simplicity, we run preprocess_data again.
        from preprocess import (
            preprocess_data,
        )  # if using separate files; otherwise, call preprocess_data directly.

        file_path = r"D:\\VEDANT MASTER\\VIT College\\!Sem_4\\Mini Project\\Fertilizer_Prediction_Augmented.csv"
        df = preprocess_data(file_path)
        model, X_test, y_test = train_model(df)
        print("Model Training Complete.")


from sklearn.metrics import accuracy_score, classification_report


def evaluate_model(model, X_test, y_test):
    # Generate predictions on test set
    y_pred = model.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)

    # Generate a classification report
    report = classification_report(y_test, y_pred)

    print(f"Model Accuracy: {accuracy * 100:.2f}%")
    print("Classification Report:\n", report)


# Example usage:
if __name__ == "__main__":
    # Load the model and test data from training if not in same run
    # Here, assuming model, X_test, y_test are available in the current session.
    from train import train_model  # if using separate files; otherwise, call directly.

    file_path = r"D:\\VEDANT MASTER\\VIT College\\!Sem_4\\Mini Project\\Fertilizer_Prediction_Augmented.csv"
    df = preprocess_data(file_path)
    model, X_test, y_test = train_model(df)
    evaluate_model(model, X_test, y_test)
