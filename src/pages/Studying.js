import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Languages,
  FileText,
  Mic,
  MicOff,
  PenTool,
  Type,
  Eraser,
  Undo,
  Redo,
  Trash2,
  Download as DownloadIcon,
  Moon,
  Sun,
  CheckCircle,
  Circle,
  Brain,
  Code,
  Palette,
  FileText as FileTextIcon,
  Volume2,
  VolumeX,
  HelpCircle,
  Sparkles,
  Video,
  Heart,
  Share,
  Settings,
  Fullscreen,
  Minimize2,
  Rewind,
  FastForward,
  Subtitles,
  Camera,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudyingPage = () => {
  // State management
  const [classStatus, setClassStatus] = useState('idle'); // idle, active, paused, ended
  const [selectedTab, setSelectedTab] = useState('ai-teaching');
  const [timer, setTimer] = useState(0);
  const [timerPreset, setTimerPreset] = useState(45);
  const [progress, setProgress] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [notes, setNotes] = useState('');
  const [homework, setHomework] = useState([]);
  const [aiMessage, setAiMessage] = useState('Welcome to your Python lesson! Today we\'ll learn about variables and data types. Let\'s start with the basics.');
  const [code, setCode] = useState(`# Welcome to Python!
# Let's start with variables

name = "Student"
age = 18
is_student = True

print(f"Hello {name}, you are {age} years old!")
print(f"Are you a student? {is_student}")

# Try changing the values above and run the code!`);
  const [codeOutput, setCodeOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [whiteboardMode, setWhiteboardMode] = useState('pen');
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [totalVideoTime] = useState(2700); // 45 minutes in seconds
  const [videoProgress, setVideoProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs
  const timerIntervalRef = useRef(null);
  const videoIntervalRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (classStatus === 'active') {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => {
          const newTimer = prev + 1;
          const progressPercent = Math.min((newTimer / (timerPreset * 60)) * 100, 100);
          setProgress(progressPercent);
          return newTimer;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [classStatus, timerPreset]);

  // Video progress effect
  useEffect(() => {
    if (isVideoPlaying) {
      videoIntervalRef.current = setInterval(() => {
        setCurrentVideoTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / totalVideoTime) * 100;
          setVideoProgress(newProgress);
          
          if (newTime >= totalVideoTime) {
            setIsVideoPlaying(false);
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(videoIntervalRef.current);
    }

    return () => clearInterval(videoIntervalRef.current);
  }, [isVideoPlaying, totalVideoTime]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format video time
  const formatVideoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Class controls
  const startClass = () => {
    setClassStatus('active');
    setTimer(0);
    setProgress(0);
  };

  const pauseClass = () => {
    setClassStatus('paused');
  };

  const resumeClass = () => {
    setClassStatus('active');
  };

  const endClass = () => {
    setClassStatus('ended');
    clearInterval(timerIntervalRef.current);
  };

  const restartClass = () => {
    setClassStatus('idle');
    setTimer(0);
    setProgress(0);
    setCurrentLesson(1);
  };

  // Video controls
  const playVideo = () => {
    setIsVideoPlaying(true);
  };

  const pauseVideo = () => {
    setIsVideoPlaying(false);
  };

  const toggleVideo = () => {
    if (isVideoPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const seekVideo = (event) => {
    const progressContainer = event.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressWidth = rect.width;
    const seekPercent = clickX / progressWidth;
    
    const newTime = Math.floor(seekPercent * totalVideoTime);
    setCurrentVideoTime(newTime);
    setVideoProgress(seekPercent * 100);
  };

  const rewindVideo = () => {
    setCurrentVideoTime(prev => Math.max(0, prev - 10));
  };

  const fastForwardVideo = () => {
    setCurrentVideoTime(prev => Math.min(totalVideoTime, prev + 10));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // AI Teaching functions
  const askDoubt = () => {
    setAiMessage('Great question! Let me explain that in more detail. Variables in Python are like containers that store data. When you write "name = John", you\'re creating a variable called "name" and storing the value "John" in it.');
  };

  const repeatExplanation = () => {
    setAiMessage('Let me repeat: Variables are containers for storing data values. In Python, you don\'t need to declare the type of variable. Python figures it out automatically!');
  };

  const translateToHindi = () => {
    setAiMessage('चलिए हिंदी में समझते हैं: Python में variables डेटा स्टोर करने के लिए containers होते हैं। जब आप "name = John" लिखते हैं, तो आप एक variable बना रहे हैं जिसमें "John" की value store होती है।');
  };

  const summarize = () => {
    setAiMessage('Summary: Variables store data, Python is dynamically typed, and you can use variables to make your code more readable and reusable.');
  };

  const aiDraw = () => {
    setAiMessage('Let me draw a diagram to explain variables and data types visually!');
    setSelectedTab('whiteboard');
    // Simulate AI drawing after a delay
    setTimeout(() => {
      setCurrentDrawing([
        { type: 'diagram', content: 'variables-diagram' }
      ]);
    }, 1000);
  };

  const aiCode = () => {
    setAiMessage('Let me show you some practical code examples to demonstrate these concepts!');
    setSelectedTab('coding');
    // AI writes new code examples
    const aiCodeExamples = `# AI Teacher's Code Examples
# Let's explore different data types in Python

# 1. String Variables
student_name = "Emily"
course = "Python Programming"
print(f"Student: {student_name}")
print(f"Course: {course}")

# 2. Numeric Variables
age = 18
score = 95.5
print(f"Age: {age} (integer)")
print(f"Score: {score} (float)")

# 3. Boolean Variables
is_enrolled = True
has_completed = False
print(f"Enrolled: {is_enrolled}")
print(f"Completed: {has_completed}")

# 4. List Variables (collections)
subjects = ["Math", "Physics", "Programming"]
grades = [85, 92, 88]
print(f"Subjects: {subjects}")
print(f"Grades: {grades}")

# 5. Dictionary Variables (key-value pairs)
student_info = {
    "name": "Emily",
    "age": 18,
    "courses": ["Python", "Calculus"]
}
print(f"Student Info: {student_info}")

# Let's run this to see the output!`;
    
    setCode(aiCodeExamples);
    
    // Simulate AI running the code
    setTimeout(() => {
      setCodeOutput(`Student: Emily
Course: Python Programming
Age: 18 (integer)
Score: 95.5 (float)
Enrolled: True
Completed: False
Subjects: ['Math', 'Physics', 'Programming']
Grades: [85, 92, 88]
Student Info: {'name': 'Emily', 'age': 18, 'courses': ['Python', 'Calculus']}

✅ Code executed successfully by AI Teacher!
💡 Notice how different data types are handled automatically by Python.`);
    }, 1500);
  };

  // Code execution simulation
  const runCode = () => {
    setCodeOutput('Hello Student, you are 18 years old!\nAre you a student? True\n\nCode executed successfully!');
  };

  const resetCode = () => {
    setCode(`# Welcome to Python!
# Let's start with variables

name = "Student"
age = 18
is_student = True

print(f"Hello {name}, you are {age} years old!")
print(f"Are you a student? {is_student}")

# Try changing the values above and run the code!`);
    setCodeOutput('');
  };

  // Whiteboard functions
  const clearWhiteboard = () => {
    setCurrentDrawing([]);
  };

  const undoWhiteboard = () => {
    if (currentDrawing.length > 0) {
      setCurrentDrawing(prev => prev.slice(0, -1));
    }
  };

  const redoWhiteboard = () => {
    // Implementation for redo functionality
  };

  const exportWhiteboard = () => {
    // Implementation for exporting whiteboard as PNG
    alert('Whiteboard exported as PNG!');
  };

  // Homework functions
  const toggleHomeworkItem = (id) => {
    setHomework(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const generateHomework = () => {
    const newHomework = [
      'Create a variable called "favorite_color" and assign your favorite color to it',
      'Write a program that prints your name and age using variables',
      'Practice using different data types: string, integer, and boolean'
    ];
    setHomework(newHomework.map((text, index) => ({ id: index, text, completed: false })));
  };

  // Lesson steps
  const lessonSteps = [
    { id: 1, title: 'Introduction to Variables', completed: currentLesson >= 1 },
    { id: 2, title: 'Data Types in Python', completed: currentLesson >= 2 },
    { id: 3, title: 'Working with Strings', completed: currentLesson >= 3 },
    { id: 4, title: 'Practice Exercises', completed: currentLesson >= 4 }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Studying
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {formatTime(timer)}
              </span>
              <div className={`w-2 h-2 rounded-full ${classStatus === 'active' ? 'bg-green-500' : classStatus === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {classStatus === 'idle' && (
              <button
                onClick={startClass}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play size={16} />
                <span>Start Class</span>
              </button>
            )}

            {classStatus === 'active' && (
              <button
                onClick={pauseClass}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                <Pause size={16} />
                <span>Pause</span>
              </button>
            )}

            {classStatus === 'paused' && (
              <button
                onClick={resumeClass}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play size={16} />
                <span>Resume</span>
              </button>
            )}

            {(classStatus === 'active' || classStatus === 'paused') && (
              <button
                onClick={endClass}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Square size={16} />
                <span>End Class</span>
              </button>
            )}

            {classStatus === 'ended' && (
              <button
                onClick={restartClass}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <RotateCcw size={16} />
                <span>Restart</span>
              </button>
            )}

            <button
              onClick={() => {/* Download notes */}}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Download size={16} />
              <span>Download Notes</span>
            </button>

            <button
              onClick={() => {/* View homework */}}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <BookOpen size={16} />
              <span>View Homework</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex space-x-1 p-4">
            {[
              { id: 'ai-teaching', label: 'AI Teaching', icon: Brain },
              { id: 'coding', label: 'Live Coding', icon: Code },
              { id: 'whiteboard', label: 'Whiteboard', icon: Palette },
              { id: 'summary', label: 'Summary & Notes', icon: FileTextIcon }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedTab === 'ai-teaching' && (
            <div className="p-6 bg-gray-50">
              <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Video Player Container */}
                <div className="relative bg-black">
                  {/* AI Teacher Video */}
                  <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
                    {/* AI Avatar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-8">
                        <Sparkles size={48} className="text-white" />
                      </div>
                    </div>
                    
                    {/* AI Teacher Info */}
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-xl font-semibold mb-1">AI Teacher Sarah</h3>
                      <p className="text-blue-200">Python Programming Expert</p>
                    </div>
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300">
                      {/* Play/Pause Button */}
                      <button 
                        onClick={toggleVideo}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                      >
                        {isVideoPlaying ? (
                          <Pause size={32} className="text-white" />
                        ) : (
                          <Play size={32} className="text-white ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Video Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {/* Progress Bar */}
                    <div 
                      className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer"
                      onClick={seekVideo}
                    >
                      <div 
                        className="h-1 bg-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={toggleVideo}
                          className="hover:text-gray-300 transition-colors"
                        >
                          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button 
                          onClick={rewindVideo}
                          className="hover:text-gray-300 transition-colors"
                        >
                          <Rewind size={20} />
                        </button>
                        <button 
                          onClick={fastForwardVideo}
                          className="hover:text-gray-300 transition-colors"
                        >
                          <FastForward size={20} />
                        </button>
                        <div className="flex items-center space-x-2">
                          <button className="hover:text-gray-300 transition-colors">
                            <Volume2 size={20} />
                          </button>
                          <div className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer">
                            <div className="h-1 bg-white rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <span>{formatVideoTime(currentVideoTime)}</span>
                          <span>/</span>
                          <span>{formatVideoTime(totalVideoTime)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button className="hover:text-gray-300 transition-colors text-sm">
                          HD
                        </button>
                        <button className="hover:text-gray-300 transition-colors">
                          <Subtitles size={20} />
                        </button>
                        <button className="hover:text-gray-300 transition-colors">
                          <Settings size={20} />
                        </button>
                        <button 
                          onClick={toggleFullscreen}
                          className="hover:text-gray-300 transition-colors"
                        >
                          {isFullscreen ? <Minimize2 size={20} /> : <Fullscreen size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Teaching Status */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    LIVE
                  </div>
                  
                  {/* AI Interaction Panel */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                      <Mic size={16} />
                    </button>
                    <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                      <Camera size={16} />
                    </button>
                    <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Lesson Content Below Video */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Introduction to Python Variables</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Lesson 1 of 5</span>
                        <span>•</span>
                        <span>45 minutes</span>
                        <span>•</span>
                        <span>Beginner Level</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Heart size={16} />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Share size={16} />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* AI Teacher Description */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">AI Teacher Sarah</h3>
                      <p className="text-sm text-gray-600">Python Programming Expert with 5+ years of teaching experience</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Follow
                    </button>
                  </div>
                  
                  {/* Lesson Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">About this lesson</h3>
                    <p className="text-gray-700 leading-relaxed">
                      In this comprehensive lesson, you'll learn the fundamentals of Python variables and data types. 
                      Our AI teacher Sarah will guide you through practical examples, interactive exercises, and real-world applications. 
                      By the end of this lesson, you'll be able to create and manipulate variables confidently.
                    </p>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={askDoubt}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <HelpCircle size={16} />
                      <span>Ask Question</span>
                    </button>
                    <button
                      onClick={repeatExplanation}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Repeat size={16} />
                      <span>Repeat Section</span>
                    </button>
                    <button
                      onClick={translateToHindi}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Languages size={16} />
                      <span>Translate</span>
                    </button>
                    <button
                      onClick={summarize}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <FileText size={16} />
                      <span>Generate Summary</span>
                    </button>
                    <button
                      onClick={aiDraw}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <PenTool size={16} />
                      <span>AI Draw Diagram</span>
                    </button>
                    <button
                      onClick={aiCode}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Code size={16} />
                      <span>Show Code Example</span>
                    </button>
                  </div>
                  
                  {/* Class Info Section */}
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Timer and Progress */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Class Timer</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-600">Progress</span>
                          <div className="flex space-x-1">
                            {[30, 45, 60].map((preset) => (
                              <button
                                key={preset}
                                onClick={() => setTimerPreset(preset)}
                                className={`px-2 py-1 text-xs rounded ${
                                  timerPreset === preset
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              >
                                {preset}m
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{Math.round(progress)}% complete</span>
                          <span>{formatTime(timer)} / {timerPreset}:00</span>
                        </div>
                      </div>

                      {/* Lesson Steps */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Lesson Steps</h3>
                        <div className="space-y-2">
                          {lessonSteps.map((step) => (
                            <div
                              key={step.id}
                              className={`flex items-center space-x-2 p-2 rounded-lg ${
                                step.completed
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle size={16} className="text-green-600" />
                              ) : (
                                <Circle size={16} />
                              )}
                              <span className="text-sm">{step.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Notes */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Notes</h3>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Take notes here..."
                          className="w-full h-24 p-3 text-sm rounded-lg border resize-none bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Homework Section */}
                    <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">Homework</h3>
                        <button
                          onClick={generateHomework}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Generate
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {homework.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleHomeworkItem(item.id)}
                              className="rounded"
                            />
                            <span className={`text-sm ${item.completed ? 'line-through opacity-50' : ''} text-gray-700`}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'coding' && (
            <div className="p-6 bg-gray-50">
              <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Live Code Editor
                    </h3>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={runCode}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Play size={16} />
                      <span>Run</span>
                    </button>
                    <button
                      onClick={resetCode}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      <RotateCcw size={16} />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <DownloadIcon size={16} />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex h-96">
                  <div className="flex-1">
                    <div className="bg-gray-100 p-2 border-b border-gray-300">
                      <span className="text-sm text-gray-600">AI Teacher's Code Examples</span>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full p-4 font-mono text-sm resize-none bg-gray-50 text-gray-900 border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="AI will write code examples here..."
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="h-full p-4 bg-gray-50">
                      <h4 className="font-semibold mb-2 text-gray-800">
                        Output
                      </h4>
                      <pre className="text-sm font-mono whitespace-pre-wrap text-gray-700">
                        {codeOutput || 'AI will run code and show results here...'}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'whiteboard' && (
            <div className="p-6 bg-gray-50">
              <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Whiteboard Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Interactive Whiteboard
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setWhiteboardMode('pen')}
                      className={`p-2 rounded-lg ${
                        whiteboardMode === 'pen'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <PenTool size={16} />
                    </button>
                    <button
                      onClick={() => setWhiteboardMode('text')}
                      className={`p-2 rounded-lg ${
                        whiteboardMode === 'text'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Type size={16} />
                    </button>
                    <button
                      onClick={() => setWhiteboardMode('eraser')}
                      className={`p-2 rounded-lg ${
                        whiteboardMode === 'eraser'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Eraser size={16} />
                    </button>
                    <div className="w-px bg-gray-300 mx-2"></div>
                    <button
                      onClick={undoWhiteboard}
                      className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <Undo size={16} />
                    </button>
                    <button
                      onClick={redoWhiteboard}
                      className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <Redo size={16} />
                    </button>
                    <button
                      onClick={clearWhiteboard}
                      className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={exportWhiteboard}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <DownloadIcon size={16} />
                      <span>Export PNG</span>
                    </button>
                  </div>
                </div>

                {/* Whiteboard Canvas */}
                <div className="h-96 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                  <div className="text-center">
                    <Palette size={48} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">AI Teacher's Whiteboard</p>
                    <p className="text-sm text-gray-400">AI will draw diagrams and examples here • You can also draw!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'summary' && (
            <div className="p-6 bg-gray-50">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Class Summary & Notes
                </h3>

                {/* Summary */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-3 text-gray-800">
                    Today's Lesson Summary
                  </h4>
                  <div className="p-4 rounded-lg bg-blue-50">
                    <ul className="space-y-2 text-gray-800">
                      <li>• Variables are containers for storing data values</li>
                      <li>• Python is dynamically typed - no need to declare variable types</li>
                      <li>• Common data types: strings, integers, floats, booleans</li>
                      <li>• Use meaningful variable names for better code readability</li>
                      <li>• Variables can be reassigned with new values</li>
                    </ul>
                  </div>
                </div>

                {/* Key Concepts */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-3 text-gray-800">
                    Key Concepts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Variables', desc: 'Containers for storing data' },
                      { title: 'Data Types', desc: 'Different kinds of data (string, int, bool)' },
                      { title: 'Assignment', desc: 'Using = to assign values to variables' },
                      { title: 'Print Function', desc: 'Displaying output to the console' }
                    ].map((concept, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-gray-50 border-gray-200"
                      >
                        <h5 className="font-medium mb-1 text-gray-800">
                          {concept.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {concept.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Homework Section */}
                <div>
                  <h4 className="text-lg font-medium mb-3 text-gray-800">
                    Homework Assignment
                  </h4>
                  <div className="p-4 rounded-lg bg-yellow-50">
                    <p className="mb-3 text-gray-800">
                      Complete the following exercises to practice what you learned:
                    </p>
                    <ol className="space-y-2 text-gray-800">
                      <li>1. Create variables for your name, age, and favorite hobby</li>
                      <li>2. Write a program that calculates the area of a rectangle</li>
                      <li>3. Practice using different data types in your code</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyingPage; 