import React from "react";
import { useParams } from "react-router-dom";

function LessonPage() {
  const { courseId, lessonId } = useParams();

  return (
    <div className="lesson-page">
      <h1>Урок</h1>
      <p>Курс ID: {courseId}</p>
      <p>Урок ID: {lessonId}</p>
      {/* Здесь будет контент урока */}
    </div>
  );
}

export default LessonPage;
