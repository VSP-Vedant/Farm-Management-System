from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
import joblib
import pickle
import pandas as pd

app = Flask(__name__, static_folder="frontend", static_url_path="")
# Configure CORS to allow requests from React app
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Define model paths using relative paths
project_root = os.path.dirname(os.path.abspath(__file__))
fertilizer_models_path = os.path.join(project_root, "models")
crop_rotation_models_path = os.path.join(project_root, "crop_rotation_models")
crop_rotation_data_path = os.path.join(project_root, "crop_rotation_data")

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Root2323*',
            database='farm_management'
        )
        if connection.is_connected():
            print("Successfully connected to MySQL database!")
            return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
        raise

# Database API Routes
@app.route('/api/owners', methods=['GET'])
def get_owners():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Owner")
        owners = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(owners)
    except Exception as e:
        print(f"Error in get_owners: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/farms', methods=['GET'])
def get_farms():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Farm")
        farms = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(farms)
    except Exception as e:
        print(f"Error in get_farms: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/workers', methods=['GET'])
def get_workers():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Worker")
        workers = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(workers)
    except Exception as e:
        print(f"Error in get_workers: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Vehicle")
        vehicles = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(vehicles)
    except Exception as e:
        print(f"Error in get_vehicles: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Inventory")
        inventory = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(inventory)
    except Exception as e:
        print(f"Error in get_inventory: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/livestock', methods=['GET'])
def get_livestock():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Livestock")
        livestock = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(livestock)
    except Exception as e:
        print(f"Error in get_livestock: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Database POST Routes
@app.route('/api/owner', methods=['POST'])
def add_owner():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO Owner (full_name, email, contact_number, address)
        VALUES (%s, %s, %s, %s)
        """
        values = (data['full_name'], data['email'], data['contact_number'], data['address'])
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Owner added successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/farm', methods=['POST'])
def add_farm():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO Farm (farm_name, location, area, soil_type, irrigation_type)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (
            data['farm_name'],
            data['location'],
            data['area'],
            data['soil_type'],
            data['irrigation_type']
        )
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Farm added successfully'}), 201
    except Error as e:
        print(f"Error in add_farm: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/worker', methods=['POST'])
def add_worker():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO workers (full_name, role, contact_number, farm_id)
        VALUES (%s, %s, %s, %s)
        """
        values = (data['full_name'], data['role'], data['contact_number'], data['farm_id'])
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Worker added successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/vehicle', methods=['POST'])
def add_vehicle():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO vehicles (name, type, status, farm_id)
        VALUES (%s, %s, %s, %s)
        """
        values = (data['name'], data['type'], data['status'], data['farm_id'])
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Vehicle added successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/inventory', methods=['POST'])
def add_inventory():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO Inventory (item_name, category, quantity, unit, cost_per_unit, supplier_name, purchase_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['item_name'],
            data['category'],
            data['quantity'],
            data['unit'],
            data['cost_per_unit'],
            data['supplier_name'],
            data['purchase_date']
        )
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Inventory item added successfully'}), 201
    except Error as e:
        print(f"Error in add_inventory: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/livestock', methods=['POST'])
def add_livestock():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        
        query = """
        INSERT INTO livestock (type, quantity, health_status, farm_id)
        VALUES (%s, %s, %s, %s)
        """
        values = (data['type'], data['quantity'], data['health_status'], data['farm_id'])
        
        cursor.execute(query, values)
        conn.commit()
        
        return jsonify({'message': 'Livestock added successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ML Model Routes
@app.route('/api/predict/fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.json
        
        # Here you would typically:
        # 1. Load your trained fertilizer prediction model
        # 2. Preprocess the input data
        # 3. Make predictions
        # For now, we'll return a mock prediction
        
        mock_prediction = {
            'recommended_fertilizer': 'NPK 14-14-14',
            'application_rate': '250 kg/ha',
            'frequency': 'Every 3 months',
            'notes': 'Best applied before the rainy season'
        }
        
        return jsonify(mock_prediction), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/crop-rotation', methods=['POST'])
def predict_crop_rotation():
    try:
        data = request.json
        
        # Here you would typically:
        # 1. Load your trained crop rotation model
        # 2. Analyze soil health data and previous crop history
        # 3. Generate recommendations
        # For now, we'll return a mock prediction
        
        mock_prediction = {
            'recommended_sequence': [
                {'season': 'Spring', 'crop': 'Corn'},
                {'season': 'Summer', 'crop': 'Soybeans'},
                {'season': 'Fall', 'crop': 'Winter Wheat'}
            ],
            'soil_benefits': 'Improved nitrogen fixation and soil structure',
            'expected_yield_increase': '15%'
        }
        
        return jsonify(mock_prediction), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    try:
        print("Starting Flask server on port 5000...")
        app.run(debug=True, port=5000)
    except Exception as e:
        print(f"Error starting Flask server: {e}")
