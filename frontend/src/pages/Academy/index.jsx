import { Link } from 'react-router-dom';
import { useAllCourses } from '../../hooks/academy/useCourses';

export default function AcademyHome() {
  const { data: courses, isLoading, error } = useAllCourses();

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div>
      <h1>Welcome to Academy</h1>
      <div className="courses-grid">
        {courses.map(course => (
          <Link 
            key={course.id} 
            to={`/academy/courses/${course.id}`}
            className="course-card"
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}