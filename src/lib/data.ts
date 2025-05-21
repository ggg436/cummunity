
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  rating: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  enrolled: number;
  lessons: Lesson[];
  progress?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content?: string;
  completed?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Development', icon: '💻', count: 120 },
  { id: '2', name: 'Business', icon: '📊', count: 85 },
  { id: '3', name: 'Design', icon: '🎨', count: 63 },
  { id: '4', name: 'Marketing', icon: '📱', count: 47 },
  { id: '5', name: 'Photography', icon: '📷', count: 32 },
  { id: '6', name: 'Music', icon: '🎵', count: 25 },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch. HTML, CSS, JavaScript, React, Node.js and more.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    price: 89.99,
    rating: 4.8,
    duration: '42 hours',
    level: 'Beginner',
    category: 'Development',
    enrolled: 12543,
    progress: 45,
    lessons: [
      { id: '1-1', title: 'Introduction to Web Development', duration: '15 min', completed: true },
      { id: '1-2', title: 'HTML Fundamentals', duration: '1 hr', completed: true },
      { id: '1-3', title: 'CSS Styling', duration: '1.5 hr', completed: false },
      { id: '1-4', title: 'JavaScript Basics', duration: '2 hr', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Master digital marketing strategies for social media, SEO, content marketing, and PPC.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    price: 74.99,
    rating: 4.6,
    duration: '36 hours',
    level: 'Intermediate',
    category: 'Marketing',
    enrolled: 8945,
    progress: 20,
    lessons: [
      { id: '2-1', title: 'Marketing Fundamentals', duration: '45 min', completed: true },
      { id: '2-2', title: 'Social Media Strategy', duration: '1.5 hr', completed: false },
      { id: '2-3', title: 'SEO Techniques', duration: '2 hr', completed: false },
      { id: '2-4', title: 'Analytics & Measurement', duration: '2 hr', completed: false },
    ],
  },
  {
    id: '3',
    title: 'UI/UX Design Essentials',
    description: 'Learn the principles of user interface and experience design. Master Figma and design thinking.',
    instructor: 'Emma Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    price: 69.99,
    rating: 4.7,
    duration: '28 hours',
    level: 'Beginner',
    category: 'Design',
    enrolled: 6721,
    progress: 75,
    lessons: [
      { id: '3-1', title: 'Introduction to UI/UX', duration: '30 min', completed: true },
      { id: '3-2', title: 'Design Principles', duration: '1 hr', completed: true },
      { id: '3-3', title: 'Figma Basics', duration: '1.5 hr', completed: true },
      { id: '3-4', title: 'Design Systems', duration: '2 hr', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Business Analytics & Data Science',
    description: 'Learn to analyze business data and extract meaningful insights using Python, Excel, and Tableau.',
    instructor: 'David Smith',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    price: 94.99,
    rating: 4.9,
    duration: '46 hours',
    level: 'Advanced',
    category: 'Business',
    enrolled: 5392,
    lessons: [
      { id: '4-1', title: 'Introduction to Data Analysis', duration: '1 hr', completed: false },
      { id: '4-2', title: 'Statistical Methods', duration: '2 hr', completed: false },
      { id: '4-3', title: 'Python for Data Science', duration: '3 hr', completed: false },
      { id: '4-4', title: 'Data Visualization', duration: '2.5 hr', completed: false },
    ],
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native framework.',
    instructor: 'Alex Turner',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    price: 79.99,
    rating: 4.5,
    duration: '34 hours',
    level: 'Intermediate',
    category: 'Development',
    enrolled: 7235,
    lessons: [
      { id: '5-1', title: 'React Native Fundamentals', duration: '1 hr', completed: false },
      { id: '5-2', title: 'Component Building', duration: '2 hr', completed: false },
      { id: '5-3', title: 'App Navigation', duration: '1.5 hr', completed: false },
      { id: '5-4', title: 'API Integration', duration: '2 hr', completed: false },
    ],
  },
  {
    id: '6',
    title: 'Photography for Beginners',
    description: 'Master the fundamentals of photography, from composition to lighting and post-processing.',
    instructor: 'Olivia Parker',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    price: 59.99,
    rating: 4.7,
    duration: '22 hours',
    level: 'Beginner',
    category: 'Photography',
    enrolled: 3890,
    lessons: [
      { id: '6-1', title: 'Camera Basics', duration: '45 min', completed: false },
      { id: '6-2', title: 'Composition Techniques', duration: '1 hr', completed: false },
      { id: '6-3', title: 'Lighting Fundamentals', duration: '1.5 hr', completed: false },
      { id: '6-4', title: 'Editing in Lightroom', duration: '2 hr', completed: false },
    ],
  },
];

export const getFeaturedCourses = () => {
  return courses.slice(0, 3);
};

export const getPopularCourses = () => {
  return [...courses].sort((a, b) => b.enrolled - a.enrolled).slice(0, 3);
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};
