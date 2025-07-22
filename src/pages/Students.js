import React, { useState } from 'react';

const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@student.edu',
    phone: '+1 (555) 123-4567',
    courses: ['Mathematics 101', 'Physics 201'],
    grade: 'A-',
    avatar: 'JD',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@student.edu',
    phone: '+1 (555) 234-5678',
    courses: ['Chemistry 101', 'Computer Science 101'],
    grade: 'B+',
    avatar: 'SW',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@student.edu',
    phone: '+1 (555) 345-6789',
    courses: ['Mathematics 101', 'Chemistry 101'],
    grade: 'A',
    avatar: 'MB',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@student.edu',
    phone: '+1 (555) 456-7890',
    courses: ['Physics 201', 'Computer Science 101'],
    grade: 'B',
    avatar: 'ED',
  },
  {
    id: 5,
    name: 'David Johnson',
    email: 'david.johnson@student.edu',
    phone: '+1 (555) 567-8901',
    courses: ['Mathematics 101', 'Physics 201', 'Chemistry 101'],
    grade: 'A+',
    avatar: 'DJ',
  },
];

function Students() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Students
        </h1>
        <button className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition">
          <i className="ri-add-line text-xl"></i>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <i className="ri-search-line"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id}>
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              onClick={() => handleStudentClick(student)}
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold mb-4">
                    {student.avatar}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {student.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {student.email}
                  </p>
                  
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${getGradeColor(student.grade)}`}>
                    {student.grade}
                  </span>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {student.courses.length} course{student.courses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Details Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Student Details
              </h2>
            </div>
            <div className="p-6">
              {selectedStudent && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold mr-6">
                      {selectedStudent.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {selectedStudent.name}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getGradeColor(selectedStudent.grade)}`}>
                        {selectedStudent.grade}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <i className="ri-mail-line mr-3 text-gray-500"></i>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedStudent.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-phone-line mr-3 text-gray-500"></i>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {selectedStudent.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Enrolled Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.courses.map((course, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                          >
                            <i className="ri-book-open-line mr-2"></i>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Academic Performance
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100 dark:bg-gray-600">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Course
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Grade
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Progress
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedStudent.courses.map((course, index) => (
                            <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {course}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getGradeColor(selectedStudent.grade)}`}>
                                  {selectedStudent.grade}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <i className="ri-bar-chart-line mr-2 text-gray-500"></i>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {Math.floor(Math.random() * 30) + 70}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students; 