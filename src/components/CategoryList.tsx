
import { categories } from '@/lib/data';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Browse Categories</h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Find the perfect course for you from our wide range of categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`} 
              className="flex flex-col items-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-medium text-lg mb-1">{category.name}</h3>
              <p className="text-muted-foreground text-sm">{category.count} courses</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
