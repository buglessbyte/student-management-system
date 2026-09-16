from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Student, Marks
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Enable CORS
CORS(app)

# Create tables
with app.app_context():
    db.create_all()

# ==================== STUDENT ROUTES ====================

@app.route('/api/student/add', methods=['POST'])
def add_student():
    """Add a new student"""
    try:
        data = request.json
        
        # Validation
        if not data.get('name') or not data.get('roll_number') or not data.get('admission_number'):
            return jsonify({'message': 'Missing required fields'}), 400
        
        # Check if student already exists
        existing = Student.query.filter_by(admission_number=data['admission_number']).first()
        if existing:
            return jsonify({'message': 'Student with this admission number already exists'}), 400
        
        student = Student(
            name=data['name'],
            roll_number=data['roll_number'],
            grade=data.get('grade', ''),
            admission_number=data['admission_number'],
            email=data.get('email', '')
        )
        
        db.session.add(student)
        db.session.commit()
        
        return jsonify({'message': 'Student added successfully', 'student_id': student.id}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@app.route('/api/student/search', methods=['GET'])
def search_student():
    """Search student by admission number"""
    try:
        admission_number = request.args.get('admission_number', type=int)
        
        if not admission_number:
            return jsonify({'message': 'Admission number required'}), 400
        
        student = Student.query.filter_by(admission_number=admission_number).first()
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Get marks if available
        marks = Marks.query.filter_by(admission_number=admission_number).first()
        
        student_data = {
            'id': student.id,
            'name': student.name,
            'roll_number': student.roll_number,
            'grade': student.grade,
            'admission_number': student.admission_number,
            'email': student.email
        }
        
        marks_data = {}
        if marks:
            marks_data = {
                'physics': marks.physics,
                'chemistry': marks.chemistry,
                'mathematics': marks.mathematics,
                'computer_science': marks.computer_science,
                'english': marks.english,
                'total': marks.total,
                'percentage': marks.percentage
            }
        
        return jsonify({'student': student_data, 'marks': marks_data}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/api/student/search-by-roll', methods=['GET'])
def search_student_by_roll():
    """Search student by roll number"""
    try:
        roll_number = request.args.get('roll_number', type=int)
        
        if not roll_number:
            return jsonify({'message': 'Roll number required'}), 400
        
        student = Student.query.filter_by(roll_number=roll_number).first()
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        student_data = {
            'id': student.id,
            'name': student.name,
            'roll_number': student.roll_number,
            'grade': student.grade,
            'admission_number': student.admission_number,
            'email': student.email
        }
        
        return jsonify({'student': student_data}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/api/student/update', methods=['PUT'])
def update_student():
    """Update student information"""
    try:
        data = request.json
        roll_number = data.get('roll_number')
        
        student = Student.query.filter_by(roll_number=roll_number).first()
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Update fields
        student.name = data.get('name', student.name)
        student.grade = data.get('grade', student.grade)
        student.admission_number = data.get('admission_number', student.admission_number)
        student.email = data.get('email', student.email)
        
        db.session.commit()
        
        return jsonify({'message': 'Student updated successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@app.route('/api/student/delete', methods=['DELETE'])
def delete_student():
    """Delete student record"""
    try:
        admission_number = request.args.get('admission_number', type=int)
        
        student = Student.query.filter_by(admission_number=admission_number).first()
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Also delete associated marks
        Marks.query.filter_by(admission_number=admission_number).delete()
        
        db.session.delete(student)
        db.session.commit()
        
        return jsonify({'message': 'Student deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


# ==================== MARKS ROUTES ====================

@app.route('/api/marks/add', methods=['POST'])
def add_marks():
    """Add marks for a student"""
    try:
        data = request.json
        admission_number = data.get('admission_number')
        
        # Check if student exists
        student = Student.query.filter_by(admission_number=admission_number).first()
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Check if marks already exist
        existing_marks = Marks.query.filter_by(admission_number=admission_number).first()
        
        if existing_marks:
            # Update existing marks
            existing_marks.physics = data.get('physics', existing_marks.physics)
            existing_marks.chemistry = data.get('chemistry', existing_marks.chemistry)
            existing_marks.mathematics = data.get('mathematics', existing_marks.mathematics)
            existing_marks.computer_science = data.get('computer_science', existing_marks.computer_science)
            existing_marks.english = data.get('english', existing_marks.english)
        else:
            # Create new marks entry
            marks = Marks(
                admission_number=admission_number,
                physics=data.get('physics', 0),
                chemistry=data.get('chemistry', 0),
                mathematics=data.get('mathematics', 0),
                computer_science=data.get('computer_science', 0),
                english=data.get('english', 0)
            )
            db.session.add(marks)
        
        db.session.commit()
        
        return jsonify({'message': 'Marks added successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@app.route('/api/marks/view', methods=['GET'])
def view_marks():
    """View marks for a student"""
    try:
        admission_number = request.args.get('admission_number', type=int)
        
        marks = Marks.query.filter_by(admission_number=admission_number).first()
        
        if not marks:
            return jsonify({'message': 'No marks found for this student'}), 404
        
        marks_data = {
            'admission_number': marks.admission_number,
            'physics': marks.physics,
            'chemistry': marks.chemistry,
            'mathematics': marks.mathematics,
            'computer_science': marks.computer_science,
            'english': marks.english,
            'total': marks.total,
            'percentage': marks.percentage
        }
        
        return jsonify({'marks': marks_data}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/api/marks/analytics', methods=['GET'])
def marks_analytics():
    """Get top and least scorers"""
    try:
        all_marks = Marks.query.all()
        
        if not all_marks:
            return jsonify({'message': 'No marks data available'}), 404
        
        # Find top scorer
        top_scorer = max(all_marks, key=lambda x: x.total)
        least_scorer = min(all_marks, key=lambda x: x.total)
        
        return jsonify({
            'top_scorer': {
                'admission_number': top_scorer.admission_number,
                'total': top_scorer.total,
                'percentage': top_scorer.percentage
            },
            'least_scorer': {
                'admission_number': least_scorer.admission_number,
                'total': least_scorer.total,
                'percentage': least_scorer.percentage
            }
        }), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/api/marks/performance', methods=['GET'])
def marks_performance():
    """Get performance categorization"""
    try:
        all_marks = Marks.query.all()
        
        above_90 = [
            {
                'admission_number': m.admission_number,
                'percentage': m.percentage
            }
            for m in all_marks if m.percentage >= 90
        ]
        
        below_90 = [
            {
                'admission_number': m.admission_number,
                'percentage': m.percentage
            }
            for m in all_marks if m.percentage < 90
        ]
        
        return jsonify({
            'above_90': above_90,
            'below_90': below_90
        }), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# ==================== HEALTH CHECK ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'API is running'}), 200


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Endpoint not found'}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({'message': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
