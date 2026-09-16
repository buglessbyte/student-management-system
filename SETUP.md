# Setup Guide - Student Management System

## Prerequisites
- Python 3.8+
- pip (Python package manager)
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/buglessbyte/student-management-system.git
cd student-management-system
```

### 2. Create a Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 5. Set Up Environment Variables
Create a `.env` file in the `backend` directory:
```
FLASK_ENV=development
FLASK_APP=app.py
DATABASE_URL=sqlite:///student_management.db
SECRET_KEY=your-secret-key-here
```

### 6. Initialize Database
```bash
python
>>> from app import db
>>> db.create_all()
>>> exit()
```

### 7. Run the Application
```bash
python app.py
```

The server will start at `http://localhost:5000`

## Project Structure
```
student-management-system/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   └── ...
├── .gitignore
└── SETUP.md
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify `app.py` to use a different port:
```python
app.run(port=5001)
```

### Database Issues
To reset the database:
```bash
rm student_management.db
python app.py
```

## Development

### Running Tests
```bash
pytest
```

### Code Style
Follow PEP 8 guidelines for Python code.

## Support
For issues or questions, please create an issue on GitHub.
