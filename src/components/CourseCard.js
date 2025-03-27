import React from "react";

function CourseCard({ course }) {
  return (
    <div className="course-item">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {course.progress !== undefined && (
        <div className="course-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
          </div>
          <span className="progress-text">{course.progress}%</span>
        </div>
      )}
      <button className="button">Подробнее</button>
    </div>
  );
}

export default CourseCard;
