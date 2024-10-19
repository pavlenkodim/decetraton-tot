import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="course-item">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {course.progress !== undefined && (
        <div className="course-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{course.progress}%</span>
        </div>
      )}
      <Link className="button" to={`/course/${course.id}`}>
        Подробнее
      </Link>
    </div>
  );
}

export default CourseCard;
