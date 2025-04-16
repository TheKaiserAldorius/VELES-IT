import React from 'react';
import { useParams } from 'react-router-dom';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useSingleCourse } from '../../../hooks/academy/useCourses';

export default function CoursePage() {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useSingleCourse(courseId);

  if (isLoading) return <div className="loading">Loading course...</div>;
  if (error) return <div className="error">Error loading course: {error.message}</div>;

  return (
    <div className="course-page-container">
      <header className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-description">{course.description}</p>
      </header>

      <section className="lessons-section">
        <h2 className="lessons-title">Lessons</h2>
        <div className="lessons-grid">
          {course.lessons?.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/academy/courses/${courseId}/lessons/${lesson.id}`}
              className="lesson-card"
            >
              <div className="lesson-content">
                <h3 className="lesson-title">{lesson.title}</h3>
                <span className="lesson-duration">{lesson.duration} min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}