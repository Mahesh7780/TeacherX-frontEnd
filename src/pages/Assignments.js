import React, { useState } from 'react';

const mockAssignments = [
  {
    id: 1,
    title: 'Calculus Problem Set #1',
    course: 'Mathematics 101',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'active',
    submissions: 18,
    totalStudents: 25,
    type: 'Problem Set',
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    course: 'Physics 201',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'active',
    submissions: 12,
    totalStudents: 18,
    type: 'Lab Report',
  },
  {
    id: 3,
    title: 'Chemistry Quiz #2',
    course: 'Chemistry 101',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: 'overdue',
    submissions: 28,
    totalStudents: 30,
    type: 'Quiz',
  },
  {
    id: 4,
    title: 'Programming Assignment #3',
    course: 'Computer Science 101',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'active',
    submissions: 15,
    totalStudents: 22,
    type: 'Programming',
  },
];

const assignmentTypes = [
  'Problem Set',
  'Lab Report',
  'Quiz',
  'Exam',
  'Essay',
  'Programming',
  'Presentation',
  'Other',
];

function Assignments() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    type: '',
    dueDate: '',
    description: '',
  });

  const handleOpenDialog = (assignment = null) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({
        title: assignment.title,
        course: assignment.course,
        type: assignment.type,
        dueDate: assignment.dueDate.toISOString().split('T')[0],
        description: assignment.description || '',
      });
    } else {
      setEditingAssignment(null);
      setFormData({
        title: '',
        course: '',
        type: '',
        dueDate: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAssignment(null);
    setFormData({
      title: '',
      course: '',
      type: '',
      dueDate: '',
      description: '',
    });
  };

  const handleSubmit = () => {
    if (editingAssignment) {
      // Edit existing assignment
      setAssignments(assignments.map(assignment =>
        assignment.id === editingAssignment.id
          ? { ...assignment, ...formData, dueDate: new Date(formData.dueDate) }
          : assignment
      ));
    } else {
      // Add new assignment
      const newAssignment = {
        id: Date.now(),
        ...formData,
        dueDate: new Date(formData.dueDate),
        status: 'active',
        submissions: 0,
        totalStudents: 25, // Default value
      };
      setAssignments([...assignments, newAssignment]);
    }
    handleCloseDialog();
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, assignment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssignment(assignment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAssignment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'ri-time-line';
      case 'overdue': return 'ri-file-list-line';
      case 'completed': return 'ri-check-line';
      default: return 'ri-file-list-line';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const AssignmentCard = ({ assignment }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white">
            <i className="ri-file-list-line text-xl"></i>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            onClick={(e) => handleMenuOpen(e, assignment)}
          >
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {assignment.title}
        </h3>
        
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded mb-2">
          {assignment.course}
        </span>
        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded border border-gray-200 dark:border-gray-600 ml-2 mb-4">
          {assignment.type}
        </span>
        
        <div className="flex items-center mb-2">
          <i className="ri-time-line mr-2 text-gray-500"></i>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Due: {formatDate(assignment.dueDate)}
          </span>
        </div>
        
        <div className="flex items-center mb-4">
          <i className="ri-bar-chart-line mr-2 text-gray-500"></i>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {assignment.submissions}/{assignment.totalStudents} submissions
          </span>
        </div>
        
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(assignment.status)}`}>
          <i className={`${getStatusIcon(assignment.status)} mr-1`}></i>
          {assignment.status}
        </span>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button className="flex-1 bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-600 transition">
            View Submissions
          </button>
          <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            Grade
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Assignments
        </h1>
        <button
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => handleOpenDialog()}
        >
          <i className="ri-add-line text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </div>
        ))}
      </div>

      {/* Add/Edit Assignment Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assignment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Type</option>
                    {assignmentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                {editingAssignment ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Menu */}
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
                handleOpenDialog(selectedAssignment);
                handleMenuClose();
              }}
            >
              <i className="ri-edit-line mr-2"></i>
              Edit
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={() => handleDeleteAssignment(selectedAssignment?.id)}
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

export default Assignments; 