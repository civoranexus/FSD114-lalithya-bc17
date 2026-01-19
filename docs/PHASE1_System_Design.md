# EduVillage – Online Learning Platform  
Phase 1: System Architecture & Database Design 
## Project Objective  
EduVillage is an online learning platform designed to connect students and teachers through a digital classroom.  
The goal of this project is to provide secure access for users, allow teachers to create and manage courses, enable students to enroll and track their learning progress, and allow administrators to manage the system effectively.  
The platform supports multiple learning formats such as videos, documents, and quizzes, providing a complete and engaging e-learning experience.
## System Architecture  
Programming Language: Python  
Backend Framework: Django  
Frontend: HTML, CSS, JavaScript  
Database: SQLite (can be upgraded to PostgreSQL)  
Authentication: JWT (JSON Web Token)  
Version Control: GitHub  
## User Roles
Student – consumes courses  
Teacher – creates courses  
Admin – manages system  
## Core System Entities  
The system manages the following core entities:
User  
Course  
Lesson  
Enrollment  
Quiz  
Result 
## Database Design  
### User  
id  
name  
email  
password  
role (student, teacher, admin)  
### Course  
id  
title  
description  
teacher_id  
### Lesson  
id  
course_id  
title  
content (video, pdf, or text)  
### Enrollment  
student_id  
course_id  
progress  
last_lesson  
### Quiz  
lesson_id  
question  
options  
correct_answer  
### Result  
student_id  
quiz_id  
score  
This database structure allows efficient tracking of users, courses, lessons, progress, and assessments across the platform.
## Phase Status
Completed
