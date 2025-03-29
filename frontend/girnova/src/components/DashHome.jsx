import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Award, Clock, BarChart2, Home, Bookmark, User, Bell, Search } from 'lucide-react';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all exams
  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/exam/all', {
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setExams(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/course/all', {
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate time remaining until exam
  const getTimeRemaining = (examDate) => {
    const now = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - now;
    
    if (diffTime <= 0) return "Completed";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${diffDays}d ${diffHours}h remaining`;
  };

  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course_id.toString().includes(searchTerm)
  );

  // Get course by ID
  const getCourseById = (id) => {
    return courses.find(course => course.id === id);
  };

  // Calculate total exams per course
  const getExamsCountByCourse = (courseId) => {
    return exams.filter(exam => exam.course_id === courseId).length;
  };

  useEffect(() => {
    fetchExams();
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>Error: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            fetchExams();
            fetchCourses();
          }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Main Content */}
      <div className="flex-1 overflow-auto">

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
            <p className="opacity-90">You have {exams.length} upcoming exams across {courses.length} courses.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Courses</p>
                  <h3 className="text-2xl font-bold mt-1">{courses.length}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <BookOpen size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Exams</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {exams.filter(exam => new Date(exam.exam_date) > new Date()).length}
                  </h3>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <Award size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed Exams</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {exams.filter(exam => new Date(exam.exam_date) <= new Date()).length}
                  </h3>
                </div>
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Award size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                Upcoming Exams
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredExams
                .filter(exam => new Date(exam.exam_date) > new Date())
                .sort((a, b) => new Date(a.exam_date) - new Date(b.exam_date))
                .slice(0, 5)
                .map(exam => {
                  const course = getCourseById(exam.course_id);
                  return (
                    <div key={exam.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <Award size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">{exam.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              new Date(exam.exam_date) - new Date() < 86400000 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {getTimeRemaining(exam.exam_date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {course?.name || 'Unknown Course'} • {formatDate(exam.exam_date)}
                          </p>
                          <div className="mt-2 flex items-center">
                            <span className="text-sm font-medium text-gray-500">Total Marks:</span>
                            <span className="ml-2 text-sm text-gray-800">{exam.total_marks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {filteredExams.filter(exam => new Date(exam.exam_date) > new Date()).length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No upcoming exams found
                </div>
              )}
            </div>
          </div>

          {/* My Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                My Courses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {courses.map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img 
                      src={course.cover} 
                      alt={course.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x200?text=Course+Cover";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description || 'No description available'}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {getExamsCountByCourse(course.id)} {getExamsCountByCourse(course.id) === 1 ? 'exam' : 'exams'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No courses enrolled yet
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;