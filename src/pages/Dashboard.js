import React from 'react';
import { Link } from 'react-router-dom';

const practiceSubjects = [
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'Programming', value: 'programming' },
];
const practiceLevels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];
const mockQuestions = {
  math: {
    beginner: [
      'What is 2 + 2?',
      'Solve for x: x + 3 = 5',
    ],
    intermediate: [
      'What is the derivative of x^2?',
      'Solve: 2x + 5 = 11',
    ],
    advanced: [
      'Integrate: ∫x^2 dx',
      'What is the limit of (1 + 1/n)^n as n approaches infinity?',
    ],
  },
  science: {
    beginner: [
      'What planet is known as the Red Planet?',
      'What is H2O commonly known as?',
    ],
    intermediate: [
      'What is Newton’s second law?',
      'Define photosynthesis.',
    ],
    advanced: [
      'Explain the theory of relativity.',
      'What is the chemical formula for glucose?',
    ],
  },
  programming: {
    beginner: [
      'What does HTML stand for?',
      'Write a Python print statement.',
    ],
    intermediate: [
      'What is a for loop?',
      'Explain the difference between let and var in JavaScript.',
    ],
    advanced: [
      'What is a closure in JavaScript?',
      'Explain recursion with an example.',
    ],
  },
};

function Dashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-64">
            <div 
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=abstract%20educational%20technology%20background%20with%20soft%20blue%20gradient%2C%20digital%20learning%20elements%2C%20subtle%20tech%20patterns%2C%20clean%20modern%20design%20with%20plenty%20of%20empty%20space%20on%20the%20left%20side%20for%20text%2C%20high%20quality%20professional%20lighting&width=1200&height=400&seq=2&orientation=landscape')`
              }}
              className="absolute inset-0 bg-cover bg-center"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-600/30"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-8 md:px-12 py-6">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, Emily!</h1>
                  <p className="text-blue-100 text-lg mb-6">Ready to continue your learning journey? You have 3 lessons scheduled for today.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/studying"
                      className="bg-white text-primary px-5 py-2.5 rounded-button font-medium hover:bg-gray-50 transition shadow-sm whitespace-nowrap"
                    >
                      Continue Learning
                    </Link>
                    <Link
                      to="/schedule"
                      className="bg-blue-700 text-white px-5 py-2.5 rounded-button font-medium hover:bg-blue-800 transition shadow-sm whitespace-nowrap"
                    >
                      View Schedule
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Weekly Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Weekly Progress</h3>
            <div className="w-8 h-8 flex items-center justify-center text-primary bg-blue-50 rounded-full">
              <i className="ri-line-chart-line"></i>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="progress-ring" width="140" height="140">
                <circle className="text-gray-200" stroke="currentColor" strokeWidth="10" fill="transparent" r="60" cx="70" cy="70"/>
                <circle className="progress-ring-circle text-primary" stroke="currentColor" strokeWidth="10" fill="transparent" r="60" cx="70" cy="70" strokeDashoffset="66"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-800">78%</span>
                <span className="text-sm text-gray-500">Completed</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Weekly Goal: 10 hours</span>
              <span className="font-medium text-gray-800">7.8 hours</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Learning Streak</h3>
            <div className="w-8 h-8 flex items-center justify-center text-orange-500 bg-orange-50 rounded-full">
              <i className="ri-fire-line"></i>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-1">16</div>
              <div className="text-gray-500">Days in a row</div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs mb-1 ${
                  index === 6 ? 'bg-gray-200 text-gray-400' : 'bg-primary text-white'
                }`}>
                  {day}
                </div>
                <span className={`text-xs ${index === 6 ? 'text-gray-400' : 'text-gray-500'}`}>
                  {index === 6 ? 'Today' : String(30 + index)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Performance</h3>
            <div className="w-8 h-8 flex items-center justify-center text-green-500 bg-green-50 rounded-full">
              <i className="ri-award-line"></i>
            </div>
          </div>
          <div className="w-full h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">92%</div>
              <div className="text-sm text-gray-500">Average Score</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Math</span>
                  <span className="font-medium text-gray-800">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Science</span>
                  <span className="font-medium text-gray-800">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">English</span>
                  <span className="font-medium text-gray-800">78%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">History</span>
                  <span className="font-medium text-gray-800">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
          <button className="text-primary hover:text-blue-700 font-medium flex items-center">
            View All
            <div className="w-5 h-5 flex items-center justify-center ml-1">
              <i className="ri-arrow-right-line"></i>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Advanced Mathematics */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-40 relative">
              <img 
                src="https://readdy.ai/api/search-image?query=advanced%20mathematics%20concept%20visualization%20with%20equations%2C%20formulas%2C%20and%20geometric%20shapes%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20blue%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=3&orientation=landscape" 
                alt="Advanced Mathematics" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">In Progress</div>
            </div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">
                  <i className="ri-calculator-line"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Advanced Mathematics</h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">65%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>12 lessons left</span>
                </div>
                <button className="text-primary hover:text-blue-700 font-medium whitespace-nowrap">Continue</button>
              </div>
            </div>
          </div>

          {/* Physics Fundamentals */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-40 relative">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20physics%20visualization%20with%20atoms%2C%20particles%2C%20and%20quantum%20concepts%2C%20clean%20educational%20style%2C%20professional%20lighting%2C%20mint%20green%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=4&orientation=landscape" 
                alt="Physics Fundamentals" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">New Lesson</div>
            </div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3">
                  <i className="ri-atom-line"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Physics Fundamentals</h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">42%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>18 lessons left</span>
                </div>
                <button className="text-primary hover:text-blue-700 font-medium whitespace-nowrap">Continue</button>
              </div>
            </div>
          </div>

          {/* Introduction to Programming */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-40 relative">
              <img 
                src="https://readdy.ai/api/search-image?query=computer%20programming%20concept%20with%20code%20on%20screen%2C%20algorithms%2C%20and%20software%20development%20elements%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20orange%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=5&orientation=landscape" 
                alt="Introduction to Programming" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mr-3">
                  <i className="ri-code-s-slash-line"></i>
                </div>
                <h3 className="font-semibold text-gray-800">Introduction to Programming</h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">89%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-orange-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>3 lessons left</span>
                </div>
                <button className="text-primary hover:text-blue-700 font-medium whitespace-nowrap">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">July 5, 2025</span>
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-calendar-line"></i>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y">
            <div className="flex p-5">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-semibold text-gray-800">09:00</div>
                <div className="text-xs text-gray-500">AM</div>
              </div>
              <div className="flex-grow pl-5 border-l">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-gray-800">Advanced Mathematics</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Calculus: Differential Equations</p>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>60 minutes</span>
                  <span className="mx-2">•</span>
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>Prof. Robert Chen</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition whitespace-nowrap">
                  Join Now
                </button>
              </div>
            </div>
            <div className="flex p-5">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-semibold text-gray-800">11:30</div>
                <div className="text-xs text-gray-500">AM</div>
              </div>
              <div className="flex-grow pl-5 border-l">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-gray-800">Physics Fundamentals</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Quantum Mechanics: Wave Functions</p>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>90 minutes</span>
                  <span className="mx-2">•</span>
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>Dr. Sarah Williams</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">
                  Reminder
                </button>
              </div>
            </div>
            <div className="flex p-5">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-semibold text-gray-800">02:15</div>
                <div className="text-xs text-gray-500">PM</div>
              </div>
              <div className="flex-grow pl-5 border-l">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-gray-800">Introduction to Programming</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Advanced Algorithms: Graph Theory</p>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>75 minutes</span>
                  <span className="mx-2">•</span>
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>Prof. Michael Johnson</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">
                  Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Resources & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">Learning Resources</h3>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-4">
                <i className="ri-file-text-line ri-lg"></i>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-800">Calculus Handbook</h4>
                <p className="text-xs text-gray-500">PDF • 12.5 MB</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-download-line"></i>
                </div>
              </button>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mr-4">
                <i className="ri-video-line ri-lg"></i>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-800">Quantum Physics Lecture</h4>
                <p className="text-xs text-gray-500">Video • 45 minutes</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-play-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">Recent Achievements</h3>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mb-3">
                <i className="ri-medal-line ri-2x"></i>
              </div>
              <h4 className="text-sm font-medium text-gray-800 text-center">Math Master</h4>
              <p className="text-xs text-gray-500 text-center mt-1">Completed 10 math lessons</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-3">
                <i className="ri-timer-line ri-2x"></i>
              </div>
              <h4 className="text-sm font-medium text-gray-800 text-center">Quick Learner</h4>
              <p className="text-xs text-gray-500 text-center mt-1">Completed quiz in record time</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-white mb-3">Your Personal AI Tutor</h2>
              <p className="text-blue-100 mb-6">Get instant help with your studies, practice with interactive exercises, and receive personalized feedback to improve your learning experience.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/ai-chat" className="bg-white text-primary px-5 py-2.5 rounded-button font-medium hover:bg-gray-50 transition shadow-sm whitespace-nowrap">
                  Ask a Question
                </Link>
                <Link
                  to="/practice-exercises"
                  className="bg-blue-700 text-white border border-blue-400 px-5 py-2.5 rounded-button font-medium hover:bg-blue-800 transition shadow-sm whitespace-nowrap"
                >
                  Practice Exercises
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <img 
                src="https://readdy.ai/api/search-image?query=friendly%20AI%20assistant%20robot%20character%2C%20educational%20technology%20style%2C%20blue%20color%20scheme%2C%20digital%20assistant%2C%20modern%20clean%20design%2C%20professional%20lighting%2C%20high%20quality&width=300&height=300&seq=6&orientation=squarish" 
                alt="AI Tutor" 
                className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Settings Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Learning Preferences</h2>
          <button className="text-primary hover:text-blue-700 font-medium flex items-center whitespace-nowrap">
            Save Changes
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Study Schedule</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Preferred Study Time</label>
                  <div className="flex space-x-4">
                    <label className="custom-checkbox">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      Morning
                    </label>
                    <label className="custom-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Afternoon
                    </label>
                    <label className="custom-checkbox">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      Evening
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Daily Study Goal (hours)</label>
                  <div className="flex items-center">
                    <input type="range" min="1" max="8" defaultValue="2" className="w-full h-2 bg-gray-200 rounded-full appearance-none" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h</span>
                    <span>2h</span>
                    <span>3h</span>
                    <span>4h</span>
                    <span>5h</span>
                    <span>6h</span>
                    <span>7h</span>
                    <span>8h</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Learning Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Learning Style</label>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:border-primary focus:ring-2 focus:ring-primary pr-8">
                    <option>Visual</option>
                    <option>Auditory</option>
                    <option>Reading/Writing</option>
                    <option>Kinesthetic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Notifications</label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Study Reminders</span>
                    <div>
                      <input type="checkbox" id="study-reminder-switch" className="switch-input" defaultChecked />
                      <label htmlFor="study-reminder-switch" className="switch-label"></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Achievement Alerts</span>
                    <div>
                      <input type="checkbox" id="achievement-switch" className="switch-input" defaultChecked />
                      <label htmlFor="achievement-switch" className="switch-label"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard; 