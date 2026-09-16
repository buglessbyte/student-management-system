# Student Management System - Web Application

A modern web-based student management system that allows you to manage student details, marks, and academic records with an intuitive user interface.

## 🎯 Features

- ✅ Add student details and marks
- ✅ Search student records by admission number
- ✅ Update student information
- ✅ Delete student records
- ✅ View student marks by subject
- ✅ Analyze top and least performers
- ✅ Responsive web interface
- ✅ Data persistence with SQLite database

## 📁 Project Structure

```
student-management-system/
├── frontend/
│   ├── index.html                 # Main dashboard page
│   ├── styles.css                 # Styling for the web app
│   ├── script.js                  # Frontend logic and interactions
│   └── pages/
│       ├── add-student.html       # Add student form
│       ├── add-marks.html         # Add marks form
│       ├── search-student.html    # Search functionality
│       ├── update-student.html    # Update student records
│       ├── delete-student.html    # Delete student records
│       ├── display-marks.html     # View student marks
│       └── analytics.html         # Top/least scorer analytics
│
├── backend/
│   ├── app.py                     # Flask server
│   ├── models.py                  # Database models
│   ├── routes.py                  # API endpoints
│   ├── requirements.txt           # Python dependencies
│   └── database.db               # SQLite database (auto-created)
│
├── README.md                      # Project documentation
└── .gitignore                     # Git ignore file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```

2. **Install backend dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Run the application**
   ```bash
   python backend/app.py
   ```

4. **Access the web app**
   - Open your browser and go to: `http://localhost:5000`

## 🎨 Features Breakdown

### 1. Dashboard (index.html)
- Main menu with 7 options
- Navigation to all features
- Quick stats overview

### 2. Add Student (add-student.html)
- Form to enter: Name, Roll Number, Grade, Admission ID, Email
- Validation and error handling

### 3. Add Marks (add-marks.html)
- Enter marks for: Physics, Chemistry, Maths, CS, English
- Based on admission number

### 4. Search Student (search-student.html)
- Search by admission number
- Display complete student details
- Show total marks

### 5. Update Student (update-student.html)
- Search and update student info
- Change name, grade, admission ID, email

### 6. Delete Student (delete-student.html)
- Remove student records
- Confirmation before deletion

### 7. Display Marks (display-marks.html)
- View individual student marks
- Subject-wise breakdown

### 8. Analytics (analytics.html)
- Top scorer details
- Least scorer details
- Percentage calculations
- Performance categorization

## 📡 API Endpoints

```
POST   /api/student/add          - Add new student
GET    /api/student/search       - Search student
PUT    /api/student/update       - Update student
DELETE /api/student/delete       - Delete student
POST   /api/marks/add            - Add student marks
GET    /api/marks/view           - View marks
GET    /api/marks/analytics      - Get top/least scorers
```

## 🗄️ Database Schema

### Students Table
```
id (Primary Key)
name
roll_number
grade
admission_number
email
created_at
```

### Marks Table
```
id (Primary Key)
admission_number (Foreign Key)
physics
chemistry
mathematics
computer_science
english
total
percentage
created_at
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Database**: SQLite3
- **REST API**: Flask-RESTful

## 📝 Usage Example

1. Open the web app at `http://localhost:5000`
2. Click "Add Student" and enter details
3. Click "Add Marks" and enter marks for that student
4. Use "Search" to find and view student information
5. Use "Analytics" to see top and least performers
6. Use "Update" or "Delete" to modify records

## 🔒 Data Validation

- Email validation
- Marks range validation (0-100)
- Admission number uniqueness
- Required field validation

## 📊 Performance Features

- Fast database queries
- Efficient search algorithms
- Responsive UI with instant feedback
- Minimal data transfer

## 🐛 Error Handling

- User-friendly error messages
- Form validation
- Database error recovery
- File upload safety

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Ready to use!** Start with `python backend/app.py` and navigate to `http://localhost:5000`
