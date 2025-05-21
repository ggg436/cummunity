
import { PlayCircle } from 'lucide-react';
import { Lesson } from '@/lib/data';

interface LessonViewerProps {
  lesson: Lesson;
  currentLesson: number;
  totalLessons: number;
}

export function LessonViewer({ lesson, currentLesson, totalLessons }: LessonViewerProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-black aspect-video w-full flex items-center justify-center">
        <div className="text-center text-white">
          <PlayCircle className="h-16 w-16 mx-auto mb-2" />
          <p>{lesson.title}</p>
          <p className="text-sm text-gray-400">{lesson.duration}</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <div className="text-muted-foreground">Lesson {currentLesson + 1} of {totalLessons}</div>
        </div>
        
        <div className="prose max-w-none">
          <p>
            Welcome to this lesson on {lesson.title}. In this video, you'll learn the key concepts and practical applications.
          </p>
          
          <p>
            This lesson covers important topics that are essential for understanding. Make sure to follow along 
            with the examples provided in the video and practice on your own to reinforce your learning.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Concepts</h3>
          <ul>
            <li>Understanding the fundamentals of {lesson.title}</li>
            <li>Best practices and common patterns</li>
            <li>Real-world examples and use cases</li>
            <li>Problem-solving techniques</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Resources</h3>
          <ul>
            <li>Lesson slides (PDF)</li>
            <li>Code examples</li>
            <li>Exercise files</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
