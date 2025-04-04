import pandas as pd
import os
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split

# Load preprocessed crop rotation data
data = pd.read_pickle(os.path.join("data", "data_preprocessed_crop.pkl"))
print("Data loaded for evaluation. Shape:", data.shape)

target = "Crop_Planted (Action)"
if target not in data.columns:
    raise Exception(f"Target column '{target}' not found.")

# Load saved LabelEncoder and model
with open(os.path.join("crop_rotation_models", "label_encoder.pkl"), "rb") as f:
    le = pickle.load(f)
with open(os.path.join("crop_rotation_models", "rf_model.pkl"), "rb") as f:
    rf_model = pickle.load(f)

# Encode the target using the loaded encoder
data[target] = le.transform(data[target])

X = data.drop(columns=[target])
y = data[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

y_pred = rf_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy on test data:", accuracy)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Plot confusion matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.savefig(os.path.join("crop_rotation_models", "confusion_matrix.png"))
plt.show()