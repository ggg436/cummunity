
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getCourseById } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Clock, Users } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById(id || '');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Course Header */}
      <div className="gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-2/3">
              <div className="flex space-x-2 mb-4">
                <Badge className="bg-white/20 text-white">{course.category}</Badge>
                <Badge className="bg-white/20 text-white">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
              
              <p className="text-lg text-white/90 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-2 text-white mb-2">
                <span className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-lg">{course.rating}</span>
                </span>
                <span className="text-white/80">|</span>
                <span>{course.enrolled.toLocaleString()} students</span>
              </div>
              
              <p className="text-white/90 mb-6">Created by <span className="font-medium">{course.instructor}</span></p>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                  </div>
                  
                  <Button className="w-full mb-4 text-lg py-6">Enroll Now</Button>
                  <Button variant="outline" className="w-full mb-6 text-lg py-6">Add to Cart</Button>
                  
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Course Duration</p>
                        <p className="text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Enrolled</p>
                        <p className="text-muted-foreground">{course.enrolled.toLocaleString()} students</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-muted-foreground">March 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="overview" onClick={() => setSelectedTab('overview')}>Overview</TabsTrigger>
            <TabsTrigger value="curriculum" onClick={() => setSelectedTab('curriculum')}>Curriculum</TabsTrigger>
            <TabsTrigger value="instructor" onClick={() => setSelectedTab('instructor')}>Instructor</TabsTrigger>
            <TabsTrigger value="reviews" onClick={() => setSelectedTab('reviews')}>Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    <span>Learning objective {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Basic knowledge of {course.category.toLowerCase()}</li>
                <li>A computer with internet access</li>
                <li>Dedication and willingness to learn</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="space-y-4">
                <p>{course.description}</p>
                <p>
                  This comprehensive course is designed for anyone looking to learn {course.category.toLowerCase()} from the ground up.
                  Whether you're a complete beginner or looking to refresh your skills, this course will take you
                  through everything you need to know to become proficient.
                </p>
                <p>
                  Throughout the course, you'll work on real-world projects, gain practical experience, and build
                  a portfolio to showcase your new skills to potential employers or clients.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span>{course.lessons.length} lessons • {course.duration} total length</span>
                <Button variant="link">Expand All Sections</Button>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="section-1">
                <AccordionTrigger className="text-lg font-medium">
                  Section 1: Getting Started
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {course.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className={`h-5 w-5 mr-3 ${lesson.completed ? "text-primary" : "text-gray-300"}`} />
                          <span>{lesson.title}</span>
                        </div>
                        <div className="text-muted-foreground">{lesson.duration}</div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="section-2">
                <AccordionTrigger className="text-lg font-medium">
                  Section 2: Advanced Topics
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-3 text-muted-foreground italic">
                    Enroll in this course to unlock all lessons.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="instructor">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="md:w-1/4 mb-6 md:mb-0 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&h=400&fit=crop"
                  alt={course.instructor}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
                />
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-2">{course.instructor}</h2>
                <p className="text-muted-foreground mb-4">{course.category} Expert & Instructor</p>
                
                <div className="flex space-x-4 mb-6">
                  <div>
                    <p className="font-semibold">4.8</p>
                    <p className="text-sm text-muted-foreground">Instructor Rating</p>
                  </div>
                  <div>
                    <p className="font-semibold">24,761</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <p className="font-semibold">12</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                </div>
                
                <p className="mb-4">
                  {course.instructor} is an experienced {course.category.toLowerCase()} professional with over 10 years of industry
                  experience. They specialize in creating comprehensive, easy-to-follow courses that cater to students
                  of all skill levels.
                </p>
                <p>
                  Throughout their career, they've worked with Fortune 500 companies and startups alike, gaining
                  valuable insights that they now share with their students. Their teaching methodology focuses on
                  practical, hands-on learning that prepares students for real-world scenarios.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
              
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-primary mb-2">{course.rating}</div>
                    <div className="flex mb-1">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-muted-foreground text-sm">Course Rating</div>
                    <div className="mt-4 text-sm">{course.enrolled.toLocaleString()} students</div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-12 text-sm text-right mr-2">{rating} stars</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400" 
                            style={{ 
                              width: `${rating === Math.round(course.rating) ? '70' : rating > Math.round(course.rating) ? '10' : '20'}%` 
                            }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-left ml-2">
                          {rating === Math.round(course.rating) ? '70%' : rating > Math.round(course.rating) ? '10%' : '20%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <div className="flex justify-between mb-6">
                <h3 className="text-xl font-semibold">Reviews</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Most Relevant</Button>
                  <Button variant="outline" size="sm">Most Recent</Button>
                </div>
              </div>
              
              <div className="space-y-8">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="pb-6 border-b last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Student {i + 1}</h4>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {Array(5).fill(0).map((_, j) => (
                              <svg key={j} className={`h-4 w-4 ${j < 5 - i ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-2">
                      {i === 0 ? (
                        "This course exceeded my expectations. The instructor explains everything clearly and provides great examples. Highly recommended!"
                      ) : i === 1 ? (
                        "I learned so much from this course. The projects are challenging but very helpful for reinforcing the concepts taught."
                      ) : (
                        "Great content and well-structured curriculum. The instructor is knowledgeable and responsive to questions."
                      )}
                    </p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="mt-6">Load More Reviews</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
