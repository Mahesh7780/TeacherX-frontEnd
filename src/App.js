import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import CourseSchedule from './pages/CourseSchedule';
import StudyingPage from './pages/Studying';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Assignments from './pages/Assignments';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AIChat from './pages/AIChat';
import PracticeExercises from './pages/PracticeExercises';
import PracticeSession from './pages/PracticeSession';
import PracticeHistory from './pages/PracticeHistory';

// Navigation Link Component
const NavigationLink = ({ to, icon, children, className = "" }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseClasses = "flex items-center px-4 py-3 rounded-md transition-colors";
  const activeClasses = "text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20";
  const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700";
  
  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
    >
      <div className={`w-6 h-6 flex items-center justify-center mr-3 ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <i className={`${icon} ri-lg`}></i>
      </div>
      <span>{children}</span>
    </Link>
  );
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    }
    
    // Check if user is authenticated
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className={`${isDark ? 'dark' : ''}`}>
        {isAuthenticated ? (
          <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <span className="font-pacifico text-2xl text-primary">TeacherX</span>
          </div>
          <div className="flex flex-col p-4 flex-grow overflow-y-auto">
            <div className="mb-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
                  <img 
                    src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20student%20with%20glasses%2C%20looking%20confident%2C%20high%20quality%2C%20professional%20lighting%2C%20neutral%20background%2C%20detailed%20facial%20features%2C%20friendly%20expression&width=200&height=200&seq=1&orientation=squarish" 
                    alt="Profile" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Emily Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                  <span className="text-sm font-medium text-primary">78%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavigationLink to="/" icon="ri-dashboard-line">
                    Dashboard
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink to="/courses" icon="ri-book-open-line">
                    My Courses
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink to="/schedule" icon="ri-calendar-line">
                    Schedule
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink to="/studying" icon="ri-play-circle-line">
                    Studying
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink to="/achievements" icon="ri-trophy-line">
                    Achievements
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink to="/settings" icon="ri-settings-line">
                    Settings
                  </NavigationLink>
                </li>
              </ul>
            </nav>
            <div className="mt-auto pt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white mr-3">
                    <i className="ri-robot-line"></i>
                  </div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">AI Tutor</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Need help with your studies? Your AI tutor is ready to assist!</p>
                <Link to="/ai-chat" className="w-full bg-primary text-white py-2 px-4 rounded-button text-sm font-medium hover:bg-blue-600 transition whitespace-nowrap block text-center">
                  Ask AI Tutor
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <button className="md:hidden mr-4 text-gray-500 focus:outline-none">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-menu-line ri-lg"></i>
                  </div>
                </button>
                <div className="relative md:hidden">
                  <span className="font-pacifico text-xl text-primary">TeacherX</span>
                </div>
              </div>
              <div className="hidden md:flex items-center flex-1 max-w-lg mx-auto">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <i className="ri-search-line"></i>
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200" 
                    placeholder="Search for courses, topics..."
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <button className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-notification-3-line"></i>
                      </div>
                      <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">3</span>
                    </button>
                  </div>
                  <div className="relative mr-2">
                    <button 
                      onClick={toggleTheme}
                      className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={isDark ? "ri-sun-line" : "ri-moon-line"}></i>
                      </div>
                    </button>
                  </div>
                  <div className="relative">
                    <Link to="/profile" className="flex items-center focus:outline-none">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20student%20with%20glasses%2C%20looking%20confident%2C%20high%20quality%2C%20professional%20lighting%2C%20neutral%20background%2C%20detailed%20facial%20features%2C%20friendly%20expression&width=200&height=200&seq=1&orientation=squarish"
                          alt="Profile"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<MyCourses />} />
                <Route path="/schedule" element={<CourseSchedule />} />
                <Route path="/studying" element={<StudyingPage />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/all-courses" element={<Courses />} />
                <Route path="/students" element={<Students />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/practice-exercises" element={<PracticeExercises />} />
                <Route path="/practice-exercises/session" element={<PracticeSession />} />
                <Route path="/practice-history" element={<PracticeHistory />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* AI Assistant Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
            onClick={() => setIsChatOpen(true)}
          >
            <i className="ri-robot-line ri-lg"></i>
          </button>
          {/* AI Chat Panel (floating above button) */}
          {isChatOpen && (
            <div className="absolute bottom-20 right-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                    <i className="ri-robot-line ri-lg"></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Student Help Desk</h3>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close Chat"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-700 p-4">
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-4">
                  Welcome to the Student Help Desk! How can we assist you today?
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition">Assignment Help</button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 transition">Technical Issue</button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition">Tutoring Request</button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs">Type your question below or select a topic above to get started.</p>
              </div>
              <div className="flex items-center space-x-2 p-4 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="Type your question..."
                />
                <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App; 