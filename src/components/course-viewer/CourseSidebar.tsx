
import { CheckCircle, PlayCircle, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Lesson } from '@/lib/data';

interface CourseSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  lessons: Lesson[];
  currentLesson: number;
  setCurrentLesson: (index: number) => void;
  completedLessons: number;
  totalLessons: number;
}

export function CourseSidebar({
  sidebarOpen,
  setSidebarOpen,
  lessons,
  currentLesson,
  setCurrentLesson,
  completedLessons,
  totalLessons
}: CourseSidebarProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100;
  
  return (
    <div
      className={`bg-gray-50 w-full md:w-80 flex-shrink-0 border-r fixed md:static inset-0 z-20 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Course Content</h2>
            <div className="text-sm text-muted-foreground">{completedLessons}/{totalLessons} lessons completed</div>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-1 flex justify-between text-sm">
            <span>Progress</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="overflow-auto flex-1 py-2">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              className={`w-full text-left px-4 py-3 flex items-start ${
                currentLesson === index ? 'bg-primary/10 border-l-4 border-primary' : ''
              }`}
              onClick={() => {
                setCurrentLesson(index);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <CheckCircle 
                className={`h-5 w-5 mr-3 mt-0.5 ${
                  lesson.completed ? 'text-primary' : 'text-gray-300'
                }`} 
              />
              <div>
                <div className={`font-medium ${currentLesson === index ? 'text-primary' : ''}`}>
                  {index + 1}. {lesson.title}
                </div>
                <div className="text-sm text-muted-foreground flex items-center mt-1">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  <span>{lesson.duration}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
