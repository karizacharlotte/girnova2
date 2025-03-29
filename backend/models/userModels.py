from sqlalchemy import Column, Integer, String,Text, Boolean, Float, Date, ForeignKey,DateTime,ARRAY
from db.database import Base
from datetime import date
from datetime import datetime

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    last_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    email = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    userType = Column(String(255),  nullable=True, default="student")  # Non-nullable for uniqueness
    password = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    cover = Column(Text, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    teacher_id = Column(Integer,  nullable=False)
    created_at = Column(String, default=datetime.utcnow)
    


class Exam(Base):
    __tablename__ = "exams"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    exam_date = Column(Date, nullable=False)
    total_marks = Column(Float, nullable=False)
    created_at = Column(String, default=datetime.utcnow)
