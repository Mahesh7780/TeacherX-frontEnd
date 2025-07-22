import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm your AI tutor. How can I help you with your courses today?", isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Prof. Robert Chen",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle-aged%20male%20professor%20with%20glasses%2C%20academic%20appearance%2C%20friendly%20expression%2C%20neutral%20background&width=100&height=100&seq=10&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=advanced%20mathematics%20concept%20visualization%20with%20equations%2C%20formulas%2C%20and%20geometric%20shapes%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20blue%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=3&orientation=landscape",
      progress: 65,
      status: "In Progress",
      statusColor: "bg-blue-500",
      category: "Mathematics",
      icon: "ri-calculator-line",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      nextLesson: "Calculus: Differential Equations",
      nextTime: "Today, 09:00 AM • 60 minutes",
      lastActivity: "2 hours ago",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      iconBgColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Dr. Sarah Williams",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20female%20science%20professor%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=11&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=modern%20physics%20visualization%20with%20atoms%2C%20particles%2C%20and%20quantum%20concepts%2C%20clean%20educational%20style%2C%20professional%20lighting%2C%20mint%20green%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=4&orientation=landscape",
      progress: 42,
      status: "New Lesson",
      statusColor: "bg-green-500",
      category: "Science",
      icon: "ri-atom-line",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      nextLesson: "Quantum Mechanics: Wave Functions",
      nextTime: "Today, 11:30 AM • 90 minutes",
      lastActivity: "Yesterday",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconBgColor: "text-green-600"
    },
    {
      id: 3,
      title: "Introduction to Programming",
      instructor: "Prof. Michael Johnson",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20male%20computer%20science%20professor%2C%20casual%20professional%20appearance%2C%20friendly%20smile%2C%20neutral%20background&width=100&height=100&seq=12&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=computer%20programming%20concept%20with%20code%20on%20screen%2C%20algorithms%2C%20and%20software%20development%20elements%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20orange%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=5&orientation=landscape",
      progress: 89,
      status: "Almost Complete",
      statusColor: "bg-orange-500",
      category: "Programming",
      icon: "ri-code-s-slash-line",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      nextLesson: "Advanced Algorithms: Graph Theory",
      nextTime: "Today, 02:15 PM • 75 minutes",
      lastActivity: "3 days ago",
      bgColor: "bg-orange-50",
      textColor: "text-orange-800",
      iconBgColor: "text-orange-600"
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      instructor: "Dr. Emily Davis",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20female%20data%20scientist%20professor%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=14&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=data%20science%20visualization%20with%20charts%2C%20graphs%2C%20and%20statistical%20elements%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20purple%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=13&orientation=landscape",
      progress: 35,
      status: "In Progress",
      statusColor: "bg-purple-500",
      category: "Programming",
      icon: "ri-bar-chart-box-line",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      nextLesson: "Statistical Analysis: Regression",
      nextTime: "Tomorrow, 10:00 AM • 90 minutes",
      lastActivity: "1 week ago",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      iconBgColor: "text-purple-600"
    },
    {
      id: 5,
      title: "Organic Chemistry",
      instructor: "Dr. Thomas Wilson",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20male%20chemistry%20professor%2C%20academic%20appearance%2C%20lab%20coat%2C%20neutral%20background&width=100&height=100&seq=16&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=organic%20chemistry%20visualization%20with%20molecular%20structures%2C%20chemical%20bonds%2C%20and%20reaction%20mechanisms%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20teal%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=15&orientation=landscape",
      progress: 52,
      status: "In Progress",
      statusColor: "bg-teal-500",
      category: "Science",
      icon: "ri-flask-line",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      nextLesson: "Reaction Mechanisms: Nucleophilic Substitution",
      nextTime: "Friday, 01:30 PM • 60 minutes",
      lastActivity: "5 days ago",
      bgColor: "bg-teal-50",
      textColor: "text-teal-800",
      iconBgColor: "text-teal-600"
    },
    {
      id: 6,
      title: "Spanish for Beginners",
      instructor: "Prof. Maria Rodriguez",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20female%20language%20professor%2C%20warm%20smile%2C%20friendly%20expression%2C%20neutral%20background&width=100&height=100&seq=18&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=spanish%20language%20learning%20visualization%20with%20cultural%20elements%2C%20vocabulary%2C%20and%20conversational%20phrases%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20red%20and%20yellow%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=17&orientation=landscape",
      progress: 100,
      status: "Completed",
      statusColor: "bg-gray-500",
      category: "Languages",
      icon: "ri-translate-2",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      nextLesson: "Course completed on June 15, 2025",
      nextTime: "Final grade: A (95%)",
      lastActivity: "Certificate available",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      iconBgColor: "text-gray-600",
      completed: true
    }
  ];

  const materials = [
    {
      id: 1,
      title: "Calculus Handbook",
      course: "Advanced Mathematics",
      courseColor: "bg-blue-100 text-blue-800",
      description: "Comprehensive guide to differential and integral calculus",
      type: "PDF • 12.5 MB",
      time: "Uploaded 2 days ago",
      icon: "ri-file-text-line",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Quantum Physics Lecture",
      course: "Physics Fundamentals",
      courseColor: "bg-green-100 text-green-800",
      description: "Introduction to wave functions and quantum mechanics",
      type: "Video • 45 minutes",
      time: "Uploaded 3 days ago",
      icon: "ri-video-line",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      title: "Programming Resources",
      course: "Introduction to Programming",
      courseColor: "bg-orange-100 text-orange-800",
      description: "Collection of helpful links for learning algorithms and data structures",
      type: "Links • 8 resources",
      time: "Updated 1 week ago",
      icon: "ri-links-line",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      id: 4,
      title: "Practice Problems",
      course: "Data Science Fundamentals",
      courseColor: "bg-purple-100 text-purple-800",
      description: "Interactive exercises on statistical analysis and data visualization",
      type: "Interactive • 50 questions",
      time: "Due in 3 days",
      icon: "ri-question-answer-line",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. James Anderson",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20male%20AI%20professor%2C%20tech%20appearance%2C%20neutral%20background&width=100&height=100&seq=20&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=machine%20learning%20visualization%20with%20neural%20networks%2C%20algorithms%2C%20and%20AI%20concepts%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20blue%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=19&orientation=landscape",
      status: "Popular",
      statusColor: "bg-indigo-500",
      icon: "ri-brain-line",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      duration: "12 weeks • 36 hours total"
    },
    {
      id: 2,
      title: "Advanced Calculus",
      instructor: "Prof. Lisa Chen",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20female%20mathematics%20professor%2C%20academic%20appearance%2C%20neutral%20background&width=100&height=100&seq=22&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=advanced%20calculus%20visualization%20with%20complex%20mathematical%20formulas%2C%20graphs%2C%20and%20geometric%20shapes%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20teal%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=21&orientation=landscape",
      status: "Recommended",
      statusColor: "bg-teal-500",
      icon: "ri-functions",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      duration: "10 weeks • 30 hours total"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      instructor: "Alex Thompson",
      instructorImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20male%20web%20developer%20instructor%2C%20casual%20tech%20appearance%2C%20neutral%20background&width=100&height=100&seq=24&orientation=squarish",
      image: "https://readdy.ai/api/search-image?query=web%20development%20visualization%20with%20code%2C%20website%20layouts%2C%20and%20responsive%20design%20elements%2C%20clean%20modern%20educational%20style%2C%20professional%20lighting%2C%20purple%20color%20scheme%2C%20high%20quality&width=400&height=200&seq=23&orientation=landscape",
      status: "New",
      statusColor: "bg-purple-500",
      icon: "ri-code-box-line",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      duration: "14 weeks • 42 hours total"
    }
  ];

  const categories = [
    { name: "All Categories", count: 8 },
    { name: "Mathematics", count: 3 },
    { name: "Science", count: 2 },
    { name: "Programming", count: 2 },
    { name: "Languages", count: 1 },
    { name: "Business", count: 0 }
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = { text: chatInput, isUser: true };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = chatInput.toLowerCase().includes('course') || chatInput.toLowerCase().includes('class')
          ? "I can help you with your courses! Would you like information about your current progress, upcoming assignments, or recommendations for additional resources?"
          : "I understand your question. Let me help you with that. Is there a specific course you're asking about?";
        setChatMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary mr-4">
              <div className="w-6 h-6 flex items-center justify-center">
                {/*<i className="ri-arrow-left-line"></i>*/}
              </div>
              {/*<span className="ml-1 font-medium">Back to Dashboard</span>*/}
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Courses</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
              >
                <span>Sort: Recently Added</span>
                <div className="w-5 h-5 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
              {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Recently Added</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Name A-Z</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Progress</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date Added</button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-filter-3-line"></i>
                </div>
                <span>Filter</span>
              </button>
              {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Filter Courses</h3>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">Instructor</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:border-primary focus:ring-2 focus:ring-primary text-sm pr-8">
                        <option>All Instructors</option>
                        <option>Prof. Robert Chen</option>
                        <option>Dr. Sarah Williams</option>
                        <option>Prof. Michael Johnson</option>
                        <option>Dr. Emily Davis</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">Date Added</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:border-primary focus:ring-2 focus:ring-primary text-sm pr-8">
                        <option>All Time</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">Duration</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:border-primary focus:ring-2 focus:ring-primary text-sm pr-8">
                        <option>Any Duration</option>
                        <option>Under 2 Hours</option>
                        <option>2-5 Hours</option>
                        <option>5-10 Hours</option>
                        <option>Over 10 Hours</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-gray-600 text-sm">Reset Filters</button>
                      <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition whitespace-nowrap">Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="ri-search-line"></i>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 text-gray-700 text-sm" 
                placeholder="Search your courses..."
              />
            </div>
            <div className="flex space-x-2">
              <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Course Status Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 min-w-[120px] whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'text-primary border-primary' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              All Courses (8)
            </button>
            <button 
              onClick={() => setActiveTab('in-progress')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 min-w-[120px] whitespace-nowrap ${
                activeTab === 'in-progress' 
                  ? 'text-primary border-primary' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              In Progress (5)
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 min-w-[120px] whitespace-nowrap ${
                activeTab === 'completed' 
                  ? 'text-primary border-primary' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Completed (2)
            </button>
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 min-w-[120px] whitespace-nowrap ${
                activeTab === 'upcoming' 
                  ? 'text-primary border-primary' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Upcoming (1)
            </button>
          </div>
        </div>

        {/* Course Categories */}
        <div className="mb-6 overflow-x-auto category-scroll">
          <div className="flex space-x-3 pb-2 min-w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category.name.toLowerCase().replace(' ', '-')
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
              <div className="h-48 relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover object-top" />
                <div className={`absolute top-3 right-3 ${course.statusColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                  {course.status}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 flex items-center justify-center ${course.iconBg} ${course.iconColor} rounded-full mr-3`}>
                    <i className={course.icon}></i>
                  </div>
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img src={course.instructorImage} alt="Instructor" className="w-full h-full object-cover object-top" />
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className={`h-2 ${course.statusColor} rounded-full`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                <div className={`${course.bgColor} rounded-md p-3 mb-4`}>
                  <div className={`flex items-center text-sm ${course.textColor}`}>
                    <div className={`w-5 h-5 flex items-center justify-center mr-2 ${course.iconBgColor}`}>
                      <i className={course.completed ? "ri-medal-line" : "ri-play-circle-line"}></i>
                    </div>
                    <span className="font-medium">{course.nextLesson}</span>
                  </div>
                  <div className={`mt-1 text-xs ${course.textColor.replace('800', '700')}`}>{course.nextTime}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">{course.lastActivity}</div>
                  <button className={`${course.completed ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-primary text-white hover:bg-blue-600'} px-4 py-2 rounded-button text-sm font-medium transition whitespace-nowrap`}>
                    {course.completed ? 'View Certificate' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Materials Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Recent Course Materials</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y">
              {materials.map((material) => (
                <div key={material.id} className="flex p-5">
                  <div className={`w-10 h-10 flex items-center justify-center ${material.iconBg} ${material.iconColor} rounded-lg mr-4 flex-shrink-0`}>
                    <i className={`${material.icon} ri-lg`}></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-800">{material.title}</h4>
                      <span className={`ml-3 text-xs ${material.courseColor} px-2 py-1 rounded-full`}>{material.course}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{material.type}</span>
                      <span className="mx-2">•</span>
                      <span>{material.time}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={material.icon.includes('video') ? 'ri-play-line' : material.icon.includes('links') ? 'ri-external-link-line' : material.icon.includes('question') ? 'ri-arrow-right-line' : 'ri-download-line'}></i>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Recommended Based on Your Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 border border-gray-100">
                <div className="h-40 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover object-top" />
                  <div className={`absolute top-3 right-3 ${course.statusColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {course.status}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`w-6 h-6 flex items-center justify-center ${course.iconBg} ${course.iconColor} rounded-full mr-2`}>
                      <i className={course.icon}></i>
                    </div>
                    <h3 className="font-medium text-gray-800">{course.title}</h3>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                      <img src={course.instructorImage} alt="Instructor" className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="text-xs text-gray-600">{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                      <i className="ri-time-line"></i>
                    </div>
                    <span>{course.duration}</span>
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-button text-sm font-medium transition whitespace-nowrap">
                    Add to My Courses
                  </button>
                </div>
              </div>
            ))}
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
        {aiChatOpen && (
          <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 bg-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <i className="ri-robot-line text-white ri-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">AI Assistant</h3>
                    <p className="text-blue-100 text-sm">Online</p>
                  </div>
                </div>
                <button onClick={() => setAiChatOpen(false)} className="text-white/80 hover:text-white">
                  <i className="ri-close-line ri-lg"></i>
                </button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-8 h-8 rounded-full ${message.isUser ? 'bg-primary' : 'bg-blue-100'} flex items-center justify-center mr-3 flex-shrink-0`}>
                    <i className={`${message.isUser ? 'ri-user-line text-white' : 'ri-robot-line text-primary'}`}></i>
                  </div>
                  <div className={`${message.isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} rounded-lg p-3 max-w-[80%]`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary" 
                  placeholder="Type your question..."
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
              <div className="flex justify-between mt-2 px-2">
                <button className="text-xs text-gray-500 hover:text-primary flex items-center">
                  <i className="ri-mic-line mr-1"></i> Voice
                </button>
                <button className="text-xs text-gray-500 hover:text-primary flex items-center">
                  <i className="ri-image-line mr-1"></i> Image
                </button>
                <button className="text-xs text-gray-500 hover:text-primary flex items-center">
                  <i className="ri-attachment-line mr-1"></i> File
                </button>
                <button className="text-xs text-gray-500 hover:text-primary flex items-center">
                  <i className="ri-emotion-line mr-1"></i> Emoji
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses; 