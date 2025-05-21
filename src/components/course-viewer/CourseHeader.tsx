
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CourseHeaderProps {
  courseId: string;
  courseTitle: string;
}

export function CourseHeader({ courseId, courseTitle }: CourseHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary mr-6">LearnHub</Link>
          <h1 className="text-lg font-semibold hidden md:block">{courseTitle}</h1>
        </div>
        <div className="flex items-center">
          <Link to={`/course/${courseId}`}>
            <Button variant="outline" size="sm">
              Back to Course
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
