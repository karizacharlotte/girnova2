import React from 'react';

const CourseCard = ({ image, logo, organization, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-2 flex-shrink-0">
            <img 
              src={logo} 
              alt={organization} 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-gray-600 text-sm">{organization}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
      </div>
    </div>
  );
};

const CourseSection = () => {
  const courses = [
    {
      id: 1,
      image: "images/data.jpeg",
      description: "earn key concepts of data analysis, visualization, and machine learning using Python.",
      title: "Data Science Fundamentals"
    },
    {
      id: 2,
      image: "images/Prompt Engineering.jpeg",
      description: "Learn to create effective AI prompts.",
      title: "Prompt Engineering"
    },
    {
      id: 3,
      image: "images/python.jpeg",
      title: "Python for Everybody",
      description: "Design user-friendly websites with HTML and CSS."
    },
    {
      id: 4,
      image: "images/Web design.jpeg",
      description: "A beginner’s introduction to Python programming.",
      title: "Wed Design"
    },
    {
      id: 5,
      image: "images/pro.jpeg",
      description: "Learn the basics of coding and problem-solving using simple programming languages like Python.",
      title: "Intro to Programming"
    },
    {
      id: 6,
      image: "images/mobile.jpeg",
      description: "Learn how to build simple mobile apps for Android and iOS using basic programming techniques.",
      title: "Mobile App Development"
    }
    
  ];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Courses at Girnova</h2>

      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="border border-gray-300 text-blue-600 px-5 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
          Show 8 more
        </button>
      </div>
    </div>
  );
};

export default CourseSection;