import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, BookOpen, Calendar, Award } from 'lucide-react';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [isEditingExam, setIsEditingExam] = useState(false);
  const [newExam, setNewExam] = useState({
    course_id: 1,
    title: '',
    exam_date: '',
    total_marks: 100
  });

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

  // Fetch course details
  const fetchCourseDetails = async (courseId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/course/${courseId}`, {
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setCourseDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new exam
  const addExam = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/exam/add', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExam)
      });
      const data = await response.json();
      setExams([...exams, data]);
      setIsAddingExam(false);
      setNewExam({
        course_id: 1,
        title: '',
        exam_date: '',
        total_marks: 100
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update exam
  const updateExam = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/exam/update/${selectedExam.id}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedExam)
      });
      const updatedExam = await response.json();
      setExams(exams.map(exam => exam.id === updatedExam.id ? updatedExam : exam));
      setIsEditingExam(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete exam
  const deleteExam = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`http://127.0.0.1:8000/exam/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*'
        }
      });
      setExams(exams.filter(exam => exam.id !== id));
      if (selectedExam && selectedExam.id === id) {
        setSelectedExam(null);
        setCourseDetails(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchCourseDetails(selectedExam.course_id);
    }
  }, [selectedExam]);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Exam Management</h1>
          <button
            onClick={() => {
              setIsAddingExam(true);
              setIsEditingExam(false);
              setSelectedExam(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add Exam
          </button>
        </div>

        {/* Add Exam Form */}
        {isAddingExam && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newExam.title}
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Exam Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                <input
                  type="number"
                  value={newExam.course_id}
                  onChange={(e) => setNewExam({...newExam, course_id: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Course ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                <input
                  type="datetime-local"
                  value={newExam.exam_date}
                  onChange={(e) => setNewExam({...newExam, exam_date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={newExam.total_marks}
                  onChange={(e) => setNewExam({...newExam, total_marks: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Total Marks"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsAddingExam(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={addExam}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Exam
              </button>
            </div>
          </div>
        )}

        {/* Edit Exam Form */}
        {isEditingExam && selectedExam && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={selectedExam.title}
                  onChange={(e) => setSelectedExam({...selectedExam, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                <input
                  type="number"
                  value={selectedExam.course_id}
                  onChange={(e) => setSelectedExam({...selectedExam, course_id: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                <input
                  type="datetime-local"
                  value={selectedExam.exam_date}
                  onChange={(e) => setSelectedExam({...selectedExam, exam_date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={selectedExam.total_marks}
                  onChange={(e) => setSelectedExam({...selectedExam, total_marks: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditingExam(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateExam}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Update Exam
              </button>
            </div>
          </div>
        )}

        {/* Exams List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Course ID</div>
            <div className="col-span-3">Exam Date</div>
            <div className="col-span-2">Total Marks</div>
            <div className="col-span-1">Actions</div>
          </div>
          {exams.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No exams found. Add your first exam to get started.
            </div>
          ) : (
            exams.map((exam) => (
              <div key={exam.id} className="border-b border-gray-200 last:border-b-0">
                <div 
                  className={`grid grid-cols-12 p-4 items-center cursor-pointer hover:bg-gray-50 ${selectedExam?.id === exam.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedExam(selectedExam?.id === exam.id ? null : exam)}
                >
                  <div className="col-span-4 font-medium text-gray-800 flex items-center gap-2">
                    {selectedExam?.id === exam.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    {exam.title}
                  </div>
                  <div className="col-span-2 text-gray-600">{exam.course_id}</div>
                  <div className="col-span-3 text-gray-600">{formatDate(exam.exam_date)}</div>
                  <div className="col-span-2 text-gray-600">{exam.total_marks}</div>
                  <div className="col-span-1 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExam(exam);
                        setIsEditingExam(true);
                        setIsAddingExam(false);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExam(exam.id);
                      }}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Exam Details */}
                {selectedExam?.id === exam.id && (
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                          <BookOpen size={20} />
                          Exam Details
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Title:</span>
                            <p className="text-gray-800">{exam.title}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Exam Date:</span>
                            <p className="text-gray-800">{formatDate(exam.exam_date)}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Total Marks:</span>
                            <p className="text-gray-800">{exam.total_marks}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Created At:</span>
                            <p className="text-gray-800">{formatDate(exam.created_at)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Course Details */}
                      {courseDetails && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Award size={20} />
                            Course Details
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-500">Course ID:</span>
                              <p className="text-gray-800">{courseDetails.id}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Course Name:</span>
                              <p className="text-gray-800">{courseDetails.name}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Description:</span>
                              <p className="text-gray-800">{courseDetails.description || 'No description available'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;