
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getCourseById } from '@/lib/data';
import { CourseHeader } from '@/components/course-viewer/CourseHeader';
import { CourseSidebar } from '@/components/course-viewer/CourseSidebar';
import { LessonViewer } from '@/components/course-viewer/LessonViewer';
import { LessonNavigation } from '@/components/course-viewer/LessonNavigation';
import { NotFound } from '@/components/course-viewer/NotFound';
import { SidebarToggle } from '@/components/course-viewer/SidebarToggle';

const CourseViewer = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById(id || '');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (!course) {
    return <NotFound />;
  }

  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const activeLesson = course.lessons[currentLesson];
  
  const nextLesson = () => {
    if (currentLesson < totalLessons - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };
  
  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CourseHeader courseId={course.id} courseTitle={course.title} />
      
      <div className="flex flex-1">
        <CourseSidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          lessons={course.lessons}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
        />
        
        <div className="flex-1 flex flex-col">
          <SidebarToggle setSidebarOpen={setSidebarOpen} />
          <LessonViewer 
            lesson={activeLesson} 
            currentLesson={currentLesson}
            totalLessons={totalLessons}
          />
          <LessonNavigation
            currentLesson={currentLesson}
            totalLessons={totalLessons}
            onNextLesson={nextLesson}
            onPrevLesson={prevLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
