from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Response
from pydantic import BaseModel
from typing import List, Optional
from db.connection import db_dependency
from models.userModels import Exam

router = APIRouter(prefix="/exam", tags=["Exams Management"])

# Pydantic Schemas
class ExamCreateSchema(BaseModel):
    course_id: int
    title: str
    exam_date: datetime
    total_marks: float


class ExamResponseSchema(BaseModel):
    id: int
    course_id: int
    title: str
    exam_date: datetime
    total_marks: float
    created_at: datetime

    class Config:
        from_attributes = True


# Create an exam
@router.post("/add", response_model=ExamResponseSchema, status_code=201)
async def create_exam(exam: ExamCreateSchema, db: db_dependency):
    new_exam = Exam(
        course_id=exam.course_id,
        title=exam.title,
        exam_date=exam.exam_date,
        total_marks=exam.total_marks,
        created_at=datetime.utcnow()
    )
    db.add(new_exam)
    db.commit()
    db.refresh(new_exam)
    return new_exam


# Get all exams
@router.get("/all", response_model=List[ExamResponseSchema])
async def get_exams(db: db_dependency):
    return db.query(Exam).all()


# Get an exam by ID
@router.get("/{exam_id}", response_model=ExamResponseSchema)
async def get_exam(exam_id: int, db: db_dependency):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


# Update an exam
@router.put("/update/{exam_id}", response_model=ExamResponseSchema)
async def update_exam(exam_id: int, exam: ExamCreateSchema, db: db_dependency):
    existing_exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not existing_exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    
    existing_exam.course_id = exam.course_id
    existing_exam.title = exam.title
    existing_exam.exam_date = exam.exam_date
    existing_exam.total_marks = exam.total_marks
    db.commit()
    db.refresh(existing_exam)
    return existing_exam


# Delete an exam
@router.delete("/delete/{exam_id}", status_code=204)
async def delete_exam(exam_id: int, db: db_dependency):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    
    db.delete(exam)
    db.commit()
    return Response(status_code=204)
