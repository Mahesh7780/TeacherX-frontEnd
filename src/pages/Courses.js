import React, { useState } from 'react';

const mockCourses = [
  {
    id: 1,
    name: 'Mathematics 101',
    code: 'MATH101',
    description: 'Introduction to Calculus and Linear Algebra',
    students: 25,
    assignments: 8,
    color: '#1976d2',
  },
  {
    id: 2,
    name: 'Physics 201',
    code: 'PHYS201',
    description: 'Advanced Physics with Laboratory',
    students: 18,
    assignments: 12,
    color: '#dc004e',
  },
  {
    id: 3,
    name: 'Chemistry 101',
    code: 'CHEM101',
    description: 'General Chemistry Principles',
    students: 30,
    assignments: 6,
    color: '#2e7d32',
  },
  {
    id: 4,
    name: 'Computer Science 101',
    code: 'CS101',
    description: 'Programming Fundamentals',
    students: 22,
    assignments: 15,
    color: '#ed6c02',
  },
];

function Courses() {
  const [courses, setCourses] = useState(mockCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleOpenDialog = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        code: course.code,
        description: course.description,
      });
    } else {
      setEditingCourse(null);
      setFormData({ name: '', code: '', description: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCourse(null);
    setFormData({ name: '', code: '', description: '' });
  };

  const handleSubmit = () => {
    if (editingCourse) {
      // Edit existing course
      setCourses(courses.map(course =>
        course.id === editingCourse.id
          ? { ...course, ...formData }
          : course
      ));
    } else {
      // Add new course
      const newCourse = {
        id: Date.now(),
        ...formData,
        students: 0,
        assignments: 0,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      };
      setCourses([...courses, newCourse]);
    }
    handleCloseDialog();
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: course.color }}
          >
            <i className="ri-book-open-line text-xl"></i>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            onClick={(e) => handleMenuOpen(e, course)}
          >
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {course.name}
        </h3>
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded mb-2">
          {course.code}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {course.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <i className="ri-user-line mr-1"></i>
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <i className="ri-file-list-line mr-1"></i>
            <span>{course.assignments} assignments</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button className="flex-1 bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-600 transition">
            View Details
          </button>
          <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            Manage Students
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          My Courses
        </h1>
        <button
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => handleOpenDialog()}
        >
          <i className="ri-add-line text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Add/Edit Course Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition"
              >
                {editingCourse ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Menu */}
      {anchorEl && (
        <div className="fixed inset-0 z-40" onClick={handleMenuClose}>
          <div 
            className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[120px]"
            style={{
              top: anchorEl.getBoundingClientRect().bottom + 5,
              left: anchorEl.getBoundingClientRect().left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => {
                handleOpenDialog(selectedCourse);
                handleMenuClose();
              }}
            >
              <i className="ri-edit-line mr-2"></i>
              Edit
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleDeleteCourse(selectedCourse?.id)}
            >
              <i className="ri-delete-bin-line mr-2"></i>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses; 