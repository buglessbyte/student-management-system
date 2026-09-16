from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Student(db.Model):
    """Student model for storing student information"""
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    roll_number = db.Column(db.Integer, unique=True, nullable=False)
    grade = db.Column(db.String(20), nullable=False)
    admission_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Student {self.name}>'


class Marks(db.Model):
    """Marks model for storing student marks"""
    __tablename__ = 'marks'
    
    id = db.Column(db.Integer, primary_key=True)
    admission_number = db.Column(db.Integer, unique=True, nullable=False)
    physics = db.Column(db.Integer, default=0)
    chemistry = db.Column(db.Integer, default=0)
    mathematics = db.Column(db.Integer, default=0)
    computer_science = db.Column(db.Integer, default=0)
    english = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def total(self):
        """Calculate total marks"""
        return (self.physics + self.chemistry + self.mathematics + 
                self.computer_science + self.english)
    
    @property
    def percentage(self):
        """Calculate percentage (out of 500)"""
        return (self.total / 500) * 100
    
    def __repr__(self):
        return f'<Marks Admission: {self.admission_number}>'
