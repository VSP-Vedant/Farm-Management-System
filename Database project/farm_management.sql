CREATE DATABASE farm_management;
USE farm_management;

CREATE TABLE Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    quantity INT NOT NULL,
    unit VARCHAR(20),
    cost_per_unit DECIMAL(10, 2),
    supplier_name VARCHAR(100),
    purchase_date DATE
);

	INSERT INTO Inventory (item_name, category, quantity, unit, cost_per_unit, supplier_name, purchase_date) VALUES
		('DAP', 'Fertilizer', 21, 'kg', 912.65, 'Karen Stafford', '2025-02-16'),
		('Harvest Gloves', 'Fertilizer', 73, 'kg', 521.09, 'Tiffany Martinez', '2024-08-02'),
		('Urea', 'Fertilizer', 55, 'kg', 750.00, 'Rahul Traders', '2024-12-10'),
		('Paddy Seeds', 'Seed', 40, 'kg', 300.00, 'Agro India', '2024-11-15'),
		('Sprayer', 'Tool', 12, 'pack', 1200.00, 'Kisan Tools', '2024-09-20'),
		('Pesticide A', 'Pesticide', 25, 'litre', 950.00, 'Green Growers', '2025-01-05'),
		('Fungicide', 'Pesticide', 30, 'litre', 1020.50, 'PlantCare Pvt Ltd', '2024-07-22'),
		('Wheat Seeds', 'Seed', 60, 'kg', 280.75, 'Bharat Agro Co.', '2024-06-11'),
		('Tractor Tool Kit', 'Tool', 15, 'pack', 2100.00, 'TractoMart', '2025-03-10'),
		('Pesticide B', 'Pesticide', 35, 'litre', 875.30, 'AgriChem Ltd', '2024-08-28');





CREATE TABLE Farm (
    farm_id INT AUTO_INCREMENT PRIMARY KEY,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    area DECIMAL(10, 2),
    soil_type VARCHAR(50),
    irrigation_type VARCHAR(50)
);

	INSERT INTO Farm (farm_name, location, area, soil_type, irrigation_type) VALUES
		('Suresh Sharma Farm', 'Pune, Maharashtra', 12.50, 'Black Soil', 'Canal'),
		('Anita Patil Farm', 'Nagpur, Maharashtra', 25.75, 'Red Soil', 'Drip'),
		('Kumar Verma Farm', 'Indore, Madhya Pradesh', 18.40, 'Alluvial Soil', 'Sprinkler'),
		('Ravi Yadav Farm', 'Jaipur, Rajasthan', 10.20, 'Black Soil', 'Tubewell'),
		('Priya Shetty Farm', 'Bengaluru, Karnataka', 15.85, 'Red Soil', 'Drip'),
		('Rajiv Singh Farm', 'Lucknow, Uttar Pradesh', 22.30, 'Alluvial Soil', 'Canal'),
		('Lakshmi Rao Farm', 'Hyderabad, Telangana', 17.52, 'Alluvial Soil', 'Drip'),
		('Neha Jain Farm', 'Ahmedabad, Gujarat', 9.90, 'Black Soil', 'Sprinkler'),
		('Vikram Das Farm', 'Patna, Bihar', 8.24, 'Red Soil', 'Drip'),
		('Arun Krishnan Farm', 'Chennai, Tamil Nadu', 11.60, 'Laterite Soil', 'Tubewell');



CREATE TABLE Worker (
    worker_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    age INT,
    contact_number VARCHAR(20),
    hire_date DATE,
    farm_id INT,
    FOREIGN KEY (farm_id) REFERENCES Farm(farm_id)
);

	INSERT INTO Worker (full_name, role, age, contact_number, hire_date, farm_id) VALUES
		('Amit Joshi', 'Field Worker', 32, '+91-9988776655', '2021-12-21', 1),
		('Sunita Mishra', 'Tractor Operator', 41, '+91-9898989898', '2023-08-22', 2),
		('Ramesh Kumar', 'Irrigation Specialist', 28, '+91-9123456789', '2022-06-18', 3),
		('Kavita Nair', 'Veterinary Assistant', 34, '+91-9876543210', '2020-10-01', 4),
		('Manoj Thakur', 'Livestock Caretaker', 39, '+91-9801234567', '2019-05-14', 5),
		('Geeta Pandey', 'Pesticide Handler', 30, '+91-8907654321', '2024-01-20', 6),
		('Raj Malhotra', 'Warehouse Assistant', 26, '+91-9876501234', '2021-03-15', 7),
		('Pooja Mehra', 'Crop Supervisor', 37, '+91-9012345678', '2022-08-09', 8),
		('Dinesh Rawat', 'Plough Operator', 33, '+91-7889988776', '2020-07-30', 9),
		('Shweta Kulkarni', 'Fertilizer Technician', 29, '+91-9988012345', '2023-12-12', 10);




CREATE TABLE Vehicle (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type VARCHAR(50),
    model VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE,
    assigned_to INT,
    status VARCHAR(50),
    FOREIGN KEY (assigned_to) REFERENCES Worker(worker_id)
);

INSERT INTO Vehicle (vehicle_type, model, license_plate, assigned_to, status) VALUES
		('Tractor', 'Mahindra 475', 'MH12AB1234', 1, 'Active'),
		('Trolley', 'Farm King', 'MH31CD5678', 2, 'Idle'),
		('Harvester', 'John Deere X9', 'MH14EF9101', 3, 'Repair'),
		('Two-wheeler', 'Bajaj CT100', 'MH15GH2345', 4, 'Active'),
		('Tractor', 'Swaraj 744 FE', 'MH13JK3456', 5, 'Idle'),
		('Trolley', 'FieldMate 200', 'MH11LM7890', 6, 'Active'),
		('Harvester', 'Kubota DC-68G', 'MH20NP4567', 7, 'Repair'),
		('Two-wheeler', 'Hero Splendor', 'MH16QR6789', 8, 'Active'),
		('Tractor', 'Eicher 380', 'MH18ST1011', 9, 'Active'),
		('Harvester', 'New Holland 3630', 'MH21UV1122', 10, 'Repair');





CREATE TABLE Livestock (
    livestock_id INT AUTO_INCREMENT PRIMARY KEY,
    animal_type VARCHAR(50),
    breed VARCHAR(50),
    quantity INT,
    health_status VARCHAR(50),
    last_checkup DATE,
    farm_id INT,
    FOREIGN KEY (farm_id) REFERENCES Farm(farm_id)
);

	INSERT INTO Livestock (animal_type, breed, quantity, health_status, last_checkup, farm_id) VALUES
		('Cow', 'Sahiwal', 45, 'Healthy', '2025-02-11', 1),
		('Goat', 'Jamunapari', 29, 'Sick', '2024-05-07', 2),
		('Buffalo', 'Murrah', 18, 'Healthy', '2024-11-20', 3),
		('Hen', 'Kadaknath', 50, 'Needs Attention', '2024-10-12', 4),
		('Cow', 'Gir', 32, 'Healthy', '2024-09-18', 5),
		('Goat', 'Beetal', 22, 'Healthy', '2024-12-05', 6),
		('Buffalo', 'Jafarabadi', 16, 'Sick', '2024-07-23', 7),
		('Hen', 'Country', 65, 'Healthy', '2024-08-30', 8),
		('Cow', 'Tharparkar', 20, 'Needs Attention', '2024-06-11', 9),
		('Goat', 'Barbari', 27, 'Healthy', '2024-11-28', 10);
	




CREATE TABLE Owner (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20),
    address VARCHAR(200)
);

	INSERT INTO Owner (full_name, email, contact_number, address) VALUES
		('Suresh Sharma', 'suresh.sharma@example.com', '+91-9876543210', 'Pune, Maharashtra'),
		('Anita Patil', 'anita.patil@example.com', '+91-9988776655', 'Nagpur, Maharashtra'),
		('Kumar Verma', 'kumar.verma@example.com', '+91-9123456789', 'Indore, Madhya Pradesh'),
		('Ravi Yadav', 'ravi.yadav@example.com', '+91-7890123456', 'Jaipur, Rajasthan'),
		('Priya Shetty', 'priya.shetty@example.com', '+91-8901234567', 'Bengaluru, Karnataka'),
		('Rajiv Singh', 'rajiv.singh@example.com', '+91-8765432109', 'Lucknow, Uttar Pradesh'),
		('Lakshmi Rao', 'lakshmi.rao@example.com', '+91-9012345678', 'Hyderabad, Telangana'),
		('Neha Jain', 'neha.jain@example.com', '+91-8091234567', 'Ahmedabad, Gujarat'),
		('Vikram Das', 'vikram.das@example.com', '+91-9890123456', 'Patna, Bihar'),
		('Arun Krishnan', 'arun.krishnan@example.com', '+91-9087654321', 'Chennai, Tamil Nadu');




