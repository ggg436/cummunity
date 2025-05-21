
import Navbar from '@/components/Navbar';
import FeaturedCourses from '@/components/FeaturedCourses';
import CategoryList from '@/components/CategoryList';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getPopularCourses } from '@/lib/data';
import CourseCard from '@/components/CourseCard';

const Index = () => {
  const popularCourses = getPopularCourses();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="gradient-bg">
          <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:max-w-xl lg:mx-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Learn without limits
              </h1>
              <p className="mt-6 text-xl text-gray-100 max-w-3xl">
                Start, switch, or advance your career with thousands of courses from expert instructors.
                Learn at your own pace, anytime, anywhere.
              </p>
              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button size="lg" className="text-md">
                  Explore courses
                </Button>
                <Button size="lg" variant="outline" className="text-md bg-white">
                  Join for free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">15K+</p>
              <p className="mt-2 text-lg text-gray-500">Courses</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">45K+</p>
              <p className="mt-2 text-lg text-gray-500">Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">200+</p>
              <p className="mt-2 text-lg text-gray-500">Instructors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">95%</p>
              <p className="mt-2 text-lg text-gray-500">Success rate</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Courses */}
      <FeaturedCourses />
      
      {/* Categories */}
      <CategoryList />
      
      {/* Popular Courses */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Courses</h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Join thousands of students learning these in-demand skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to dive in?</span>
                  <span className="block">Start learning today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary-foreground">
                  Get unlimited access to all courses, workshops, and learning resources.
                </p>
                <Button size="lg" className="mt-8 bg-white text-primary hover:bg-gray-100">
                  Get started
                </Button>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
