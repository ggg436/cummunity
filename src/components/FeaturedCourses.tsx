
import { getFeaturedCourses } from '@/lib/data';
import CourseCard from './CourseCard';

const FeaturedCourses = () => {
  const featuredCourses = getFeaturedCourses();

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Courses</h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Expand your knowledge with our top courses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/courses" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Browse all courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
