
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/lib/data';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`} className="block">
      <Card className="course-card h-full overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {course.progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2">
              <div className="flex justify-between text-white text-xs mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1" />
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
              {course.level}
            </Badge>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium ml-1">{course.rating}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{course.description}</p>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">By {course.instructor}</p>
            <div className="flex items-center mt-1">
              <span className="mr-3">{course.duration}</span>
              <span>{course.lessons.length} lessons</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4 flex justify-between items-center">
          <span className="font-bold text-lg">${course.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">{course.enrolled.toLocaleString()} students</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
