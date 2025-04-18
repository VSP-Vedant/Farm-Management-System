# Farm Management System

A comprehensive farm management solution that helps farmers manage their agricultural operations efficiently. The system includes features for managing farm inventory, workers, vehicles, and provides AI-powered recommendations for fertilizer usage and crop rotation.

## Features

- **Dashboard Management**
  - Farm owners and properties management
  - Workers and vehicle tracking
  - Inventory management
  - Livestock tracking

- **Smart Agriculture Features**
  - AI-powered fertilizer recommendations based on soil and crop conditions
  - Intelligent crop rotation suggestions
  - Soil health monitoring

- **Modern UI**
  - Responsive design
  - Material-UI components
  - User-friendly interface
  - Real-time updates

## Tech Stack

### Backend
- Python
- Flask
- MySQL
- Machine Learning (scikit-learn)

### Frontend
- React.js
- Material-UI
- Axios
- React Router

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14.0 or higher
- MySQL Server
- Git

## Dependencies Management

The project uses two types of dependencies:

1. **Backend Dependencies** (Python packages):
   - Listed in `requirements.txt`
   - Main packages include:
     - Flask for the web framework
     - Flask-CORS for handling cross-origin requests
     - mysql-connector-python for database operations
     - scikit-learn for machine learning capabilities
     - pandas and numpy for data processing
     - python-dotenv for environment variable management

2. **Frontend Dependencies** (Node.js packages):
   - Listed in `requirements.txt` as comments
   - Key packages include:
     - React and React DOM
     - Material-UI components and icons
     - Axios for API requests
     - React Router for navigation

### Installing Dependencies

1. **Backend Dependencies**:
   ```bash
   # Make sure you're in your virtual environment
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate # Linux/Mac

   # Install all Python dependencies
   pip install -r requirements.txt
   ```

2. **Frontend Dependencies**:
   ```bash
   # Navigate to the frontend directory
   cd farm-management-ui

   # Install all Node.js dependencies
   npm install
   ```

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Farm-Management-System
   ```

2. **Set Up Backend**
   ```bash
   # Create and activate virtual environment (Windows)
   python -m venv venv
   .\venv\Scripts\activate

   # Install Python dependencies
   pip install -r requirements.txt

   # Configure MySQL Database
   # Create a .env file in the root directory with your database credentials:
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=farm_management
   ```

3. **Set Up Frontend**
   ```bash
   # Navigate to frontend directory
   cd farm-management-ui

   # Install Node.js dependencies
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   # Make sure your virtual environment is activated
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate # Linux/Mac

   # From the root directory
   python app.py
   ```
   The backend server will start on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   # From the farm-management-ui directory
   npm start
   ```
   The frontend will start on http://localhost:3000

## Usage

1. **Dashboard**
   - View and manage farm owners
   - Track farm properties
   - Manage inventory
   - Monitor livestock

2. **Fertilizer Prediction**
   - Enter soil and crop parameters
   - Get AI-powered fertilizer recommendations
   - View application rates and schedules

3. **Crop Rotation**
   - Input soil health data
   - Get optimal crop rotation sequences
   - View expected benefits and yield improvements

## Database Setup

1. Create a new MySQL database:
   ```sql
   CREATE DATABASE farm_management;
   ```

2. The application will automatically create the required tables on first run.

## Project Structure

```
Farm-Management-System/
├── app.py                 # Main Flask application
├── requirements.txt       # Project dependencies (both backend and frontend)
├── models/               # ML models
├── data/                # Data files
├── farm-management-ui/  # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Dependency File Usage

### requirements.txt
This file contains all necessary dependencies for both backend and frontend:

1. **Backend Dependencies**: Install using pip
   ```bash
   pip install -r requirements.txt
   ```

2. **Frontend Dependencies**: Listed as comments for reference
   - These are automatically installed when running `npm install`
   - Versions are specified to ensure compatibility
   - If you need to install a specific package:
     ```bash
     npm install package-name@version
     ```

### Updating Dependencies

1. **Backend**:
   ```bash
   # Update all packages
   pip install --upgrade -r requirements.txt

   # Update specific package
   pip install --upgrade package-name
   ```

2. **Frontend**:
   ```bash
   # Update all packages
   npm update

   # Update specific package
   npm update package-name
   ```

## Troubleshooting Dependencies

1. **Backend Issues**:
   - If you encounter any package conflicts:
     ```bash
     pip uninstall package-name
     pip install package-name==specific-version
     ```
   - For virtual environment issues:
     ```bash
     deactivate
     python -m venv venv --clear
     ```

2. **Frontend Issues**:
   - If you encounter dependency conflicts:
     ```bash
     rm -rf node_modules
     npm cache clean --force
     npm install
     ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Material-UI for the beautiful React components
- scikit-learn for machine learning capabilities
- All contributors who have helped with the project 