from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Response
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from db.connection import db_dependency
from db.VerifyToken import user_dependency
from models.userModels import Course

router = APIRouter(prefix="/course", tags=["Courses Management"])

# Pydantic Schemas
class CourseCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    cover: str
    teacher_id: int

class CourseResponseSchema(BaseModel):
    id: int
    name: str
    description: Optional[str]
    cover: str
    teacher_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Create a course
@router.post("/add", response_model=CourseResponseSchema, status_code=201)
async def create_course(course: CourseCreateSchema, db: db_dependency):
    new_course = Course(
        name=course.name, 
        description=course.description, 
        cover=course.cover,
        teacher_id=course.teacher_id,
        created_at=datetime.utcnow()
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

# Get all courses
@router.get("/all", response_model=List[CourseResponseSchema])
async def get_courses(db: db_dependency):
    return db.query(Course).all()

# Get a course by ID
@router.get("/{course_id}", response_model=CourseResponseSchema)
async def get_course(course_id: int, db: db_dependency):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

# Update a course
@router.put("/update/{course_id}", response_model=CourseResponseSchema)
async def update_course(course_id: int, course: CourseCreateSchema, db: db_dependency):
    existing_course = db.query(Course).filter(Course.id == course_id).first()
    if not existing_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    existing_course.name = course.name
    existing_course.description = course.description
    existing_course.cover = course.cover
    db.commit()
    db.refresh(existing_course)
    return existing_course

# Delete a course
@router.delete("/delete/{course_id}", status_code=204)
async def delete_course(course_id: int, db: db_dependency):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(course)
    db.commit()
    return Response(status_code=204)
