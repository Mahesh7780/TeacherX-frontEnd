import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth] = useState('December 2024');
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const todaySchedule = [
    {
      id: 1,
      course: "Advanced Mathematics",
      topic: "Calculus: Differential Equations",
      time: "09:00 AM",
      duration: "60 min",
      instructor: "AI Tutor",
      color: "blue",
      icon: "ri-calculator-line"
    },
    {
      id: 2,
      course: "Physics Fundamentals",
      topic: "Quantum Mechanics: Wave Functions",
      time: "11:30 AM",
      duration: "90 min",
      instructor: "AI Tutor",
      color: "green",
      icon: "ri-atom-line"
    },
    {
      id: 3,
      course: "Programming",
      topic: "Advanced Algorithms: Graph Theory",
      time: "02:15 PM",
      duration: "75 min",
      instructor: "AI Tutor",
      color: "orange",
      icon: "ri-code-s-slash-line"
    },
    {
      id: 4,
      course: "Data Science",
      topic: "Statistical Analysis: Regression",
      time: "04:00 PM",
      duration: "90 min",
      instructor: "AI Tutor",
      color: "purple",
      icon: "ri-bar-chart-box-line"
    }
  ];

  const upcomingLessons = [
    {
      id: 1,
      course: "Advanced Mathematics",
      topic: "Calculus: Differential Equations",
      date: "Tomorrow, 09:00 AM",
      duration: "60 min",
      instructor: "AI Tutor",
      color: "blue",
      icon: "ri-calculator-line"
    },
    {
      id: 2,
      course: "Physics Fundamentals",
      topic: "Quantum Mechanics: Wave Functions",
      date: "Tomorrow, 11:30 AM",
      duration: "90 min",
      instructor: "AI Tutor",
      color: "green",
      icon: "ri-atom-line"
    },
    {
      id: 3,
      course: "Programming",
      topic: "Advanced Algorithms: Graph Theory",
      date: "Tomorrow, 02:15 PM",
      duration: "75 min",
      instructor: "AI Tutor",
      color: "orange",
      icon: "ri-code-s-slash-line"
    }
  ];

  const calendarDays = [
    // Previous month days
    { day: 26, currentMonth: false },
    { day: 27, currentMonth: false },
    { day: 28, currentMonth: false },
    { day: 29, currentMonth: false },
    { day: 30, currentMonth: false },
    // Current month days
    { day: 1, currentMonth: true, hasEvent: true },
    { day: 2, currentMonth: true },
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true, hasEvent: true },
    { day: 5, currentMonth: true, hasEvent: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true },
    { day: 9, currentMonth: true },
    { day: 10, currentMonth: true, hasEvent: true },
    { day: 11, currentMonth: true, hasEvent: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true, isToday: true },
    { day: 16, currentMonth: true, hasEvent: true },
    { day: 17, currentMonth: true, hasEvent: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true },
    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true },
    { day: 31, currentMonth: true }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        text: 'text-blue-600',
        hover: 'hover:text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        text: 'text-green-600',
        hover: 'hover:text-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-500',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        text: 'text-orange-600',
        hover: 'hover:text-orange-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-500',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        text: 'text-purple-600',
        hover: 'hover:text-purple-700'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleDateClick = (day) => {
    if (day.currentMonth) {
      setSelectedDate(day.day);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Schedule</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your learning schedule and upcoming lessons</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-button text-sm font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <i className="ri-add-line mr-2"></i>Add Lesson
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition">
                <i className="ri-download-line mr-2"></i>Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-primary rounded-full mr-4">
                  <i className="ri-calendar-check-line ri-lg"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">12</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
                  <i className="ri-time-line ri-lg"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">18h</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full mr-4">
                  <i className="ri-user-star-line ri-lg"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">4</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instructors</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
                  <i className="ri-book-mark-line ri-lg"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">6</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Schedule View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calendar</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{currentMonth}</h3>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Sun</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Mon</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Tue</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Wed</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Thu</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Fri</div>
                <div className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`calendar-day p-3 text-center text-sm cursor-pointer transition-all duration-200 ${
                      !day.currentMonth
                        ? 'text-gray-400 dark:text-gray-600'
                        : day.isToday
                        ? 'bg-blue-100 dark:bg-blue-900 border-2 border-primary text-primary font-semibold'
                        : day.hasEvent
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-gray-800 dark:text-white'
                        : selectedDate === day.day
                        ? 'bg-primary text-white'
                        : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Has Events</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Selected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Today's Schedule</h2>
              <div className="space-y-4">
                {todaySchedule.map((lesson) => {
                  const colors = getColorClasses(lesson.color);
                  return (
                    <div key={lesson.id} className={`time-slot ${colors.bg} rounded-lg p-4 border-l-4 ${colors.border}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 flex items-center justify-center ${colors.iconBg} ${colors.iconColor} rounded-full mr-3`}>
                            <i className={lesson.icon}></i>
                          </div>
                          <h3 className="font-medium text-gray-800 dark:text-white">{lesson.course}</h3>
                        </div>
                        <span className={`text-sm ${colors.text} font-medium`}>{lesson.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{lesson.topic}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{lesson.instructor} • {lesson.duration}</span>
                        <Link to="/studying" className={`text-xs ${colors.text} ${colors.hover} font-medium`}>
                          Join
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <Link to="/schedule" className="w-full bg-primary text-white py-3 px-4 rounded-button font-medium hover:bg-blue-600 transition inline-block text-center">
                  View Full Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upcoming Lessons</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="ri-filter-line"></i>
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="ri-more-line"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingLessons.map((lesson) => {
                const colors = getColorClasses(lesson.color);
                return (
                  <div key={lesson.id} className="lesson-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 flex items-center justify-center ${colors.iconBg} ${colors.iconColor} rounded-full mr-3`}>
                        <i className={lesson.icon}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{lesson.course}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{lesson.date}</span>
                      <span className={`text-xs ${colors.iconBg} ${colors.iconColor} px-2 py-1 rounded-full`}>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full overflow-hidden mr-2 ${colors.iconBg} flex items-center justify-center`}>
                          <i className={`ri-robot-line ${colors.iconColor} text-xs`}></i>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{lesson.instructor}</span>
                      </div>
                      <button className="text-sm text-primary hover:text-blue-600 font-medium">Details</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setAiChatOpen(!aiChatOpen)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
        >
          <i className="ri-robot-line ri-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default CourseSchedule; 