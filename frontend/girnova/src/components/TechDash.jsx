import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, BarChart2, ClipboardList, MessageSquare, Award ,
  Settings, Home, LogOut, Menu, X, Search, Bell, User, Plus ,
  ArrowUp, ArrowDown, ChevronDown, ChevronUp, Eye, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
    const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
 useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  // Mock data - replace with actual API calls
  useEffect(() => {
    setIsLoading(true);
    try {
      // Simulate API calls
      setTimeout(() => {
        setCourses([
          {
            id: 1,
            title: "Advanced Python Programming",
            description: "Master advanced Python concepts and frameworks",
            cover: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            created_at: "2025-03-01T00:00:00",
            total_students: 42,
            completion_rate: 78,
            last_week_enrollments: 12
          },
          {
            id: 2,
            title: "Web Development Fundamentals",
            description: "Learn HTML, CSS, and JavaScript from scratch",
            cover: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            created_at: "2025-02-15T00:00:00",
            total_students: 89,
            completion_rate: 65,
            last_week_enrollments: 23
          },
          {
            id: 3,
            title: "Data Science Essentials",
            description: "Introduction to data analysis and visualization",
            cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            created_at: "2025-01-20T00:00:00",
            total_students: 56,
            completion_rate: 82,
            last_week_enrollments: 8
          }
        ]);

        setEnrollments([
          { id: 1, course_id: 1, student_name: "Alex Johnson", enrolled_at: "2025-03-28T14:30:00", progress: 45 },
          { id: 2, course_id: 1, student_name: "Maria Garcia", enrolled_at: "2025-03-25T09:15:00", progress: 78 },
          { id: 3, course_id: 1, student_name: "James Wilson", enrolled_at: "2025-03-20T16:45:00", progress: 92 },
          { id: 4, course_id: 2, student_name: "Sarah Lee", enrolled_at: "2025-03-29T11:20:00", progress: 15 },
          { id: 5, course_id: 2, student_name: "David Kim", enrolled_at: "2025-03-27T13:10:00", progress: 32 },
          { id: 6, course_id: 3, student_name: "Emma Davis", enrolled_at: "2025-03-24T10:05:00", progress: 67 }
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
    navigate('/login');
  };

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
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Teacher Portal</h1>
        </div>
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Home size={18} />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BookOpen size={18} />
            My Courses
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'students' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Users size={18} />
            Students
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BarChart2 size={18} />
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <MessageSquare size={18} />
            Messages
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses, students..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={18} />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Teacher</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Time Range Selector */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'overview' && 'Teacher Dashboard'}
              {activeTab === 'courses' && 'My Courses'}
              {activeTab === 'students' && 'Students'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 90 days</option>
                <option value="year">Last year</option>
                <option value="all">All time</option>
              </select>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm flex items-center gap-1 hover:bg-gray-50">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
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
                      <p className="text-sm font-medium text-gray-500">Total Students</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {courses.reduce((sum, course) => sum + course.total_students, 0)}
                      </h3>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                      <Users size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg Completion Rate</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {courses.length > 0 
                          ? Math.round(courses.reduce((sum, course) => sum + course.completion_rate, 0) / courses.length)
                          : 0}%
                      </h3>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 text-green-600">
                      <BarChart2 size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Enrollments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    Recent Enrollments
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {enrollments.slice(0, 5).map(enrollment => {
                    const course = courses.find(c => c.id === enrollment.course_id);
                    return (
                      <div key={enrollment.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{enrollment.student_name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Enrolled in {course?.title || 'Unknown Course'} • {formatDate(enrollment.enrolled_at)}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-500">Progress:</span>
                              <p className="text-gray-800">{enrollment.progress}%</p>
                            </div>
                            <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition">
                              <Eye size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Performing Courses */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Award size={20} className="text-blue-600" />
                    Top Performing Courses
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {courses
                    .sort((a, b) => b.completion_rate - a.completion_rate)
                    .slice(0, 3)
                    .map(course => (
                      <div key={course.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <BookOpen size={20} />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-800">{course.title}</h3>
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                {course.completion_rate}% completion
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <div className="mt-3 flex items-center gap-4">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Students:</span>
                                <span className="ml-2 text-sm text-gray-800">{course.total_students}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">New this week:</span>
                                <span className="ml-2 text-sm text-gray-800">{course.last_week_enrollments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" />
                  My Courses
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2">
                <Plus size={16} />
              Create Course
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {courses.map(course => (
              <div key={course.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-gray-100 overflow-hidden">
                    <img 
                      src={course.cover} 
                      alt={course.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/100?text=Course";
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{course.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
                        >
                          {expandedCourse === course.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-6">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Students:</span>
                        <span className="ml-2 text-sm text-gray-800">{course.total_students}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Completion:</span>
                        <span className="ml-2 text-sm text-gray-800">{course.completion_rate}%</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Created:</span>
                        <span className="ml-2 text-sm text-gray-800">{formatDate(course.created_at)}</span>
                      </div>
                    </div>
                    
                    {/* Expanded Course Details */}
                    {expandedCourse === course.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">Enrolled Students</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          {enrollments
                            .filter(e => e.course_id === course.id)
                            .slice(0, 3)
                            .map(student => (
                              <div key={student.id} className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-800">{student.student_name}</span>
                                <span className="text-sm text-gray-600">{student.progress}% complete</span>
                              </div>
                            ))}
                          {enrollments.filter(e => e.course_id === course.id).length > 3 && (
                            <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                              View all {enrollments.filter(e => e.course_id === course.id).length} students
                            </button>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100">
                            Edit Course
                          </button>
                          <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm hover:bg-gray-100">
                            View Analytics
                          </button>
                          <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm hover:bg-gray-100">
                            Manage Content
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Student Management
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from(new Set(enrollments.map(e => e.student_name))).map((student, idx) => {
                  const studentEnrollments = enrollments.filter(e => e.student_name === student);
                  const avgProgress = Math.round(studentEnrollments.reduce((sum, e) => sum + e.progress, 0) / studentEnrollments.length);
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User size={16} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student}</div>
                            <div className="text-sm text-gray-500">student@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{studentEnrollments.length}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                avgProgress > 70 ? 'bg-green-500' : 
                                avgProgress > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${avgProgress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{avgProgress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 days ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Message</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Course Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Enrollment Trends</h3>
              <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Enrollment chart will appear here</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Completion Rates</h3>
              <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Completion chart will appear here</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
              <h3 className="font-medium text-gray-700 mb-3">Student Engagement</h3>
              <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Engagement metrics will appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Student Messages</h2>
          <div className="bg-gray-50 rounded-lg p-4 h-96 flex items-center justify-center">
            <p className="text-gray-500">Message interface will appear here</p>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
          <div className="max-w-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="teacher@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="email-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">Email notifications</label>
                </div>
                <div className="flex items-center">
                  <input id="system-messages" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                  <label htmlFor="system-messages" className="ml-2 block text-sm text-gray-700">System messages</label>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </main>
  </div>
</div>
); };
export default TeacherDashboard;