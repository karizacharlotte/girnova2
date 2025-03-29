import React, { useState, useEffect } from 'react';
import { LogOut, Home, Users, Settings, FileText, ShoppingCart, BarChart2, Menu, X, BookCheck, ListCheck, BookOpen, Calendar, Award, Clock, Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseManagement from '../components/CoursesDash';
import ExamManagement from '../components/Exam';
import StudentDashboard from '../components/DashHome';

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
  >
    {children}
  </button>
);

const Card = ({ course, onEnroll, isEnrolled }) => (
  <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition w-full max-w-xs">
    <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
    <p className="text-gray-600 text-sm mt-1">{course.description}</p>
    <Button onClick={() => onEnroll(course.id)} className="mt-4">
      {isEnrolled ? "Enrolled" : "Enroll"}
    </Button>
  </div>
);

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewPage, setViewPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    { id: 1, title: "HTML & CSS Basics", description: "Learn the foundations of web development." },
    { id: 2, title: "JavaScript Essentials", description: "Master JavaScript for dynamic web apps." },
    { id: 3, title: "FastAPI for Beginners", description: "Learn how to build APIs with FastAPI." },
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedEnrollments = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(storedEnrollments);
  }, []);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      const updatedEnrollments = [...enrolledCourses, courseId];
      setEnrolledCourses(updatedEnrollments);
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrollments));
    }
  };
  
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
    navigate('/login');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const getMenuItems = () => {
    if (!userInfo) return [];
    
    const commonItems = [
      { icon: <Home size={20} />, label: 'Dashboard', link: 'dashboard' },
    ];
    
    switch (userInfo.userType) {
      case 'student':
        return [
          ...commonItems,
          { icon: <BookOpen size={20} />, label: 'Courses', link: 'course' },
          { icon: <Award size={20} />, label: 'Exams', link: 'exam' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: <Users size={20} />, label: 'Students', link: '/students' },
          { icon: <BarChart2 size={20} />, label: 'Performance', link: '/performance' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { icon: <Users size={20} />, label: 'Users', link: '/users' },
          { icon: <Settings size={20} />, label: 'Settings', link: '/settings' },
        ];
      default:
        return commonItems;
    }
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow hover:bg-gray-100 transition"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:relative z-10 transition-transform duration-300 ease-in-out
        w-64 h-full bg-white border-r border-gray-200 flex flex-col shadow-sm
      `}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">EduTrack</h1>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">{userInfo.first_name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{userInfo.userType || 'User'}</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {getMenuItems().map((item, index) => (
              <button
                key={index}
                onClick={() => setViewPage(item.link)}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  viewPage === item.link 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {userInfo.userType ? `${userInfo.userType.charAt(0).toUpperCase() + userInfo.userType.slice(1)} Dashboard` : 'Dashboard'}
            </h2>
            
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative hidden md:block">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={18} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {userInfo.first_name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {viewPage === "dashboard" && <StudentDashboard />}
          {viewPage === "course" && <CourseManagement />}
          {viewPage === "exam" && <ExamManagement />}
          
          {/* Sample content for other views */}
          {viewPage === "students" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Students Management</h2>
              <p>Students content goes here</p>
            </div>
          )}
          
          {viewPage === "performance" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
              <p>Performance content goes here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;