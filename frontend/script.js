// API Base URL
const API_URL = 'http://localhost:5000/api';

// Navigate to different pages
function navigateTo(page) {
    const pageContent = document.getElementById('page-content');
    const dashboard = document.querySelector('.dashboard');
    
    if (page === 'home') {
        pageContent.innerHTML = '';
        dashboard.style.display = 'block';
        return;
    }
    
    dashboard.style.display = 'none';
    
    switch(page) {
        case 'add-student':
            loadAddStudentForm();
            break;
        case 'add-marks':
            loadAddMarksForm();
            break;
        case 'search-student':
            loadSearchForm();
            break;
        case 'delete-student':
            loadDeleteForm();
            break;
        case 'update-student':
            loadUpdateForm();
            break;
        case 'display-marks':
            loadDisplayMarksForm();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Add Student Form
function loadAddStudentForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Add Student Details</h2>
            <form id="addStudentForm">
                <div class="form-group">
                    <label for="studentName">Student Name:</label>
                    <input type="text" id="studentName" name="studentName" required>
                </div>
                <div class="form-group">
                    <label for="studentRoll">Roll Number:</label>
                    <input type="number" id="studentRoll" name="studentRoll" required>
                </div>
                <div class="form-group">
                    <label for="studentGrade">Grade:</label>
                    <input type="text" id="studentGrade" name="studentGrade" placeholder="e.g., 10-A" required>
                </div>
                <div class="form-group">
                    <label for="admissionNumber">Admission Number:</label>
                    <input type="number" id="admissionNumber" name="admissionNumber" required>
                </div>
                <div class="form-group">
                    <label for="studentEmail">Email:</label>
                    <input type="email" id="studentEmail" name="studentEmail" required>
                </div>
                <button type="submit" class="btn">Add Student</button>
            </form>
            <div id="addStudentMessage"></div>
        </div>
    `;
    
    document.getElementById('addStudentForm').addEventListener('submit', addStudent);
}

// Add Student Function
async function addStudent(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('studentName').value,
        roll_number: parseInt(document.getElementById('studentRoll').value),
        grade: document.getElementById('studentGrade').value,
        admission_number: parseInt(document.getElementById('admissionNumber').value),
        email: document.getElementById('studentEmail').value
    };
    
    try {
        const response = await fetch(`${API_URL}/student/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('addStudentMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="message success">✓ Student added successfully!</div>';
            document.getElementById('addStudentForm').reset();
        } else {
            messageDiv.innerHTML = `<div class="message error">✗ Error: ${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('addStudentMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Add Marks Form
function loadAddMarksForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Add Student Marks</h2>
            <form id="addMarksForm">
                <div class="form-group">
                    <label for="marksAdmission">Admission Number:</label>
                    <input type="number" id="marksAdmission" name="marksAdmission" required>
                </div>
                <div class="form-group">
                    <label for="physicsMarks">Physics Marks (0-100):</label>
                    <input type="number" id="physicsMarks" name="physicsMarks" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="chemistryMarks">Chemistry Marks (0-100):</label>
                    <input type="number" id="chemistryMarks" name="chemistryMarks" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="mathMarks">Mathematics Marks (0-100):</label>
                    <input type="number" id="mathMarks" name="mathMarks" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="csMarks">Computer Science Marks (0-100):</label>
                    <input type="number" id="csMarks" name="csMarks" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="englishMarks">English Marks (0-100):</label>
                    <input type="number" id="englishMarks" name="englishMarks" min="0" max="100" required>
                </div>
                <button type="submit" class="btn">Add Marks</button>
            </form>
            <div id="addMarksMessage"></div>
        </div>
    `;
    
    document.getElementById('addMarksForm').addEventListener('submit', addMarks);
}

// Add Marks Function
async function addMarks(e) {
    e.preventDefault();
    
    const formData = {
        admission_number: parseInt(document.getElementById('marksAdmission').value),
        physics: parseInt(document.getElementById('physicsMarks').value),
        chemistry: parseInt(document.getElementById('chemistryMarks').value),
        mathematics: parseInt(document.getElementById('mathMarks').value),
        computer_science: parseInt(document.getElementById('csMarks').value),
        english: parseInt(document.getElementById('englishMarks').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/marks/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('addMarksMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="message success">✓ Marks added successfully!</div>';
            document.getElementById('addMarksForm').reset();
        } else {
            messageDiv.innerHTML = `<div class="message error">✗ Error: ${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('addMarksMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Search Student Form
function loadSearchForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Search Student</h2>
            <form id="searchForm">
                <div class="form-group">
                    <label for="searchAdmission">Admission Number:</label>
                    <input type="number" id="searchAdmission" name="searchAdmission" required>
                </div>
                <button type="submit" class="btn">Search</button>
            </form>
            <div id="searchMessage"></div>
            <div id="searchResults"></div>
        </div>
    `;
    
    document.getElementById('searchForm').addEventListener('submit', searchStudent);
}

// Search Student Function
async function searchStudent(e) {
    e.preventDefault();
    
    const admissionNumber = document.getElementById('searchAdmission').value;
    
    try {
        const response = await fetch(`${API_URL}/student/search?admission_number=${admissionNumber}`);
        const data = await response.json();
        const messageDiv = document.getElementById('searchMessage');
        const resultsDiv = document.getElementById('searchResults');
        
        if (response.ok && data.student) {
            const student = data.student;
            const marks = data.marks || {};
            
            resultsDiv.innerHTML = `
                <div class="result-container">
                    <h3>Student Details</h3>
                    <div class="result-item">
                        <strong>Name:</strong> ${student.name}
                    </div>
                    <div class="result-item">
                        <strong>Roll Number:</strong> ${student.roll_number}
                    </div>
                    <div class="result-item">
                        <strong>Grade:</strong> ${student.grade}
                    </div>
                    <div class="result-item">
                        <strong>Admission Number:</strong> ${student.admission_number}
                    </div>
                    <div class="result-item">
                        <strong>Email:</strong> ${student.email}
                    </div>
                    
                    <h3 style="margin-top: 20px;">Marks</h3>
                    <div class="result-item">
                        <strong>Physics:</strong> ${marks.physics || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>Chemistry:</strong> ${marks.chemistry || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>Mathematics:</strong> ${marks.mathematics || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>Computer Science:</strong> ${marks.computer_science || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>English:</strong> ${marks.english || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>Total Marks:</strong> ${marks.total || 'N/A'}
                    </div>
                    <div class="result-item">
                        <strong>Percentage:</strong> ${marks.percentage ? marks.percentage.toFixed(2) + '%' : 'N/A'}
                    </div>
                </div>
            `;
            messageDiv.innerHTML = '';
        } else {
            messageDiv.innerHTML = `<div class="message error">✗ Student not found!</div>`;
            resultsDiv.innerHTML = '';
        }
    } catch (error) {
        document.getElementById('searchMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Delete Student Form
function loadDeleteForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Delete Student Record</h2>
            <form id="deleteForm">
                <div class="form-group">
                    <label for="deleteAdmission">Admission Number:</label>
                    <input type="number" id="deleteAdmission" name="deleteAdmission" required>
                </div>
                <button type="submit" class="btn btn-danger">Delete Student</button>
            </form>
            <div id="deleteMessage"></div>
        </div>
    `;
    
    document.getElementById('deleteForm').addEventListener('submit', deleteStudent);
}

// Delete Student Function
async function deleteStudent(e) {
    e.preventDefault();
    
    if (!confirm('Are you sure you want to delete this student record?')) {
        return;
    }
    
    const admissionNumber = document.getElementById('deleteAdmission').value;
    
    try {
        const response = await fetch(`${API_URL}/student/delete?admission_number=${admissionNumber}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('deleteMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="message success">✓ Student deleted successfully!</div>';
            document.getElementById('deleteForm').reset();
        } else {
            messageDiv.innerHTML = `<div class="message error">✗ Error: ${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('deleteMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Update Student Form
function loadUpdateForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Update Student Record</h2>
            <form id="updateForm">
                <div class="form-group">
                    <label for="updateRoll">Roll Number (to find student):</label>
                    <input type="number" id="updateRoll" name="updateRoll" required>
                </div>
                <button type="button" class="btn" onclick="findStudentToUpdate()">Find Student</button>
            </form>
            <div id="updateMessage"></div>
            <div id="updateFields" style="display: none; margin-top: 20px;">
                <form id="updateDetailsForm">
                    <div class="form-group">
                        <label for="updateName">New Student Name:</label>
                        <input type="text" id="updateName" name="updateName" required>
                    </div>
                    <div class="form-group">
                        <label for="updateGrade">New Grade:</label>
                        <input type="text" id="updateGrade" name="updateGrade" required>
                    </div>
                    <div class="form-group">
                        <label for="updateAdmission">New Admission Number:</label>
                        <input type="number" id="updateAdmission" name="updateAdmission" required>
                    </div>
                    <div class="form-group">
                        <label for="updateEmail">New Email:</label>
                        <input type="email" id="updateEmail" name="updateEmail" required>
                    </div>
                    <button type="submit" class="btn">Update Student</button>
                </form>
            </div>
        </div>
    `;
    
    document.getElementById('updateDetailsForm').addEventListener('submit', updateStudent);
}

// Find Student to Update
async function findStudentToUpdate() {
    const rollNumber = document.getElementById('updateRoll').value;
    const messageDiv = document.getElementById('updateMessage');
    
    try {
        const response = await fetch(`${API_URL}/student/search-by-roll?roll_number=${rollNumber}`);
        const data = await response.json();
        
        if (response.ok && data.student) {
            const student = data.student;
            document.getElementById('updateName').value = student.name;
            document.getElementById('updateGrade').value = student.grade;
            document.getElementById('updateAdmission').value = student.admission_number;
            document.getElementById('updateEmail').value = student.email;
            document.getElementById('updateFields').style.display = 'block';
            messageDiv.innerHTML = '';
        } else {
            messageDiv.innerHTML = '<div class="message error">✗ Student not found!</div>';
        }
    } catch (error) {
        messageDiv.innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Update Student Function
async function updateStudent(e) {
    e.preventDefault();
    
    const rollNumber = document.getElementById('updateRoll').value;
    const formData = {
        roll_number: parseInt(rollNumber),
        name: document.getElementById('updateName').value,
        grade: document.getElementById('updateGrade').value,
        admission_number: parseInt(document.getElementById('updateAdmission').value),
        email: document.getElementById('updateEmail').value
    };
    
    try {
        const response = await fetch(`${API_URL}/student/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('updateMessage');
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="message success">✓ Student updated successfully!</div>';
        } else {
            messageDiv.innerHTML = `<div class="message error">✗ Error: ${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('updateMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Display Marks Form
function loadDisplayMarksForm() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Display Student Marks</h2>
            <form id="displayMarksForm">
                <div class="form-group">
                    <label for="displayAdmission">Admission Number:</label>
                    <input type="number" id="displayAdmission" name="displayAdmission" required>
                </div>
                <button type="submit" class="btn">Display Marks</button>
            </form>
            <div id="displayMarksMessage"></div>
            <div id="marksResults"></div>
        </div>
    `;
    
    document.getElementById('displayMarksForm').addEventListener('submit', displayMarks);
}

// Display Marks Function
async function displayMarks(e) {
    e.preventDefault();
    
    const admissionNumber = document.getElementById('displayAdmission').value;
    
    try {
        const response = await fetch(`${API_URL}/marks/view?admission_number=${admissionNumber}`);
        const data = await response.json();
        const messageDiv = document.getElementById('displayMarksMessage');
        const resultsDiv = document.getElementById('marksResults');
        
        if (response.ok && data.marks) {
            const marks = data.marks;
            resultsDiv.innerHTML = `
                <div class="result-container">
                    <h3>Student Marks Details</h3>
                    <table>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                        <tr>
                            <td>Physics</td>
                            <td>${marks.physics}</td>
                        </tr>
                        <tr>
                            <td>Chemistry</td>
                            <td>${marks.chemistry}</td>
                        </tr>
                        <tr>
                            <td>Mathematics</td>
                            <td>${marks.mathematics}</td>
                        </tr>
                        <tr>
                            <td>Computer Science</td>
                            <td>${marks.computer_science}</td>
                        </tr>
                        <tr>
                            <td>English</td>
                            <td>${marks.english}</td>
                        </tr>
                        <tr style="background: #667eea; color: white;">
                            <td><strong>Total</strong></td>
                            <td><strong>${marks.total}</strong></td>
                        </tr>
                        <tr style="background: #764ba2; color: white;">
                            <td><strong>Percentage</strong></td>
                            <td><strong>${marks.percentage.toFixed(2)}%</strong></td>
                        </tr>
                    </table>
                </div>
            `;
            messageDiv.innerHTML = '';
        } else {
            messageDiv.innerHTML = '<div class="message error">✗ No marks found for this student!</div>';
            resultsDiv.innerHTML = '';
        }
    } catch (error) {
        document.getElementById('displayMarksMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Load Analytics
function loadAnalytics() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="form-container">
            <button class="btn btn-back" onclick="navigateTo('home')">← Back to Home</button>
            <h2>Top & Least Scorers Analytics</h2>
            <button type="button" class="btn" onclick="fetchAnalytics()">Load Analytics</button>
            <div id="analyticsMessage"></div>
            <div id="analyticsResults"></div>
        </div>
    `;
    
    fetchAnalytics();
}

// Fetch Analytics
async function fetchAnalytics() {
    try {
        const response = await fetch(`${API_URL}/marks/analytics`);
        const data = await response.json();
        const messageDiv = document.getElementById('analyticsMessage');
        const resultsDiv = document.getElementById('analyticsResults');
        
        if (response.ok) {
            const topScorer = data.top_scorer;
            const leastScorer = data.least_scorer;
            
            resultsDiv.innerHTML = `
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h3>🏆 Top Scorer</h3>
                        <div class="result-item">
                            <strong>Admission Number:</strong> ${topScorer.admission_number}
                        </div>
                        <div class="result-item">
                            <strong>Total Marks:</strong> ${topScorer.total}
                        </div>
                        <div class="result-item">
                            <strong>Percentage:</strong> ${topScorer.percentage.toFixed(2)}%
                        </div>
                    </div>
                    
                    <div class="analytics-card">
                        <h3>📉 Least Scorer</h3>
                        <div class="result-item">
                            <strong>Admission Number:</strong> ${leastScorer.admission_number}
                        </div>
                        <div class="result-item">
                            <strong>Total Marks:</strong> ${leastScorer.total}
                        </div>
                        <div class="result-item">
                            <strong>Percentage:</strong> ${leastScorer.percentage.toFixed(2)}%
                        </div>
                    </div>
                </div>
                
                <div id="performanceList" style="margin-top: 30px;"></div>
            `;
            
            fetchPerformanceList();
            messageDiv.innerHTML = '';
        } else {
            messageDiv.innerHTML = '<div class="message error">✗ Error loading analytics</div>';
        }
    } catch (error) {
        document.getElementById('analyticsMessage').innerHTML = `<div class="message error">✗ Error: ${error.message}</div>`;
    }
}

// Fetch Performance List
async function fetchPerformanceList() {
    try {
        const response = await fetch(`${API_URL}/marks/performance`);
        const data = await response.json();
        
        if (response.ok) {
            let aboveHtml = '<h3>Above 90%</h3>';
            let belowHtml = '<h3>Below 90%</h3>';
            
            data.above_90.forEach(student => {
                aboveHtml += `
                    <div class="result-item">
                        <strong>Admission #${student.admission_number}:</strong> ${student.percentage.toFixed(2)}%
                    </div>
                `;
            });
            
            data.below_90.forEach(student => {
                belowHtml += `
                    <div class="result-item">
                        <strong>Admission #${student.admission_number}:</strong> ${student.percentage.toFixed(2)}%
                    </div>
                `;
            });
            
            const performanceList = document.getElementById('performanceList');
            if (performanceList) {
                performanceList.innerHTML = `
                    <div class="result-container">
                        ${aboveHtml}
                        ${belowHtml}
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error fetching performance list:', error);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Management System loaded successfully!');
});
