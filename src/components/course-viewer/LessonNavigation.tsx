
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LessonNavigationProps {
  currentLesson: number;
  totalLessons: number;
  onNextLesson: () => void;
  onPrevLesson: () => void;
}

export function LessonNavigation({ 
  currentLesson, 
  totalLessons, 
  onNextLesson, 
  onPrevLesson 
}: LessonNavigationProps) {
  return (
    <>
      <Separator />
      <div className="p-4 flex justify-between">
        <Button 
          variant="outline" 
          disabled={currentLesson === 0} 
          onClick={onPrevLesson}
          className="flex items-center"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous Lesson
        </Button>
        
        <Button 
          variant={currentLesson === totalLessons - 1 ? "secondary" : "default"}
          disabled={currentLesson === totalLessons - 1} 
          onClick={onNextLesson}
          className="flex items-center"
        >
          Next Lesson
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </>
  );
}
