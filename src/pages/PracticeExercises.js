import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const subjects = [
  { label: 'Math', value: 'Math' },
  { label: 'Science', value: 'Science' },
  { label: 'Programming', value: 'Programming' },
];
const levels = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

const detectSubjectAndLevel = () => {
  const options = [
    { subject: 'Math', level: 'Intermediate' },
    { subject: 'Programming', level: 'Beginner' },
    { subject: 'Science', level: 'Advanced' },
  ];
  return options[Math.floor(Math.random() * options.length)];
};

const PracticeExercises = () => {
  const navigate = useNavigate();
  const detected = detectSubjectAndLevel();
  const [selectedSubject, setSelectedSubject] = useState(detected.subject);
  const [selectedLevel, setSelectedLevel] = useState(detected.level);

  const handleStart = () => {
    navigate(`/practice-exercises/session?subject=${selectedSubject}&level=${selectedLevel}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Practice Exercises</h1>
        <div className="flex justify-end mb-4">
          <Link
            to="/practice-history"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            History
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recommended for You</h2>
          <div className="flex items-center space-x-6 mb-4">
            <div>
              <span className="text-gray-600 dark:text-gray-300">Subject: </span>
              <span className="font-semibold text-primary">{detected.subject}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-300">Level: </span>
              <span className="font-semibold text-primary">{detected.level}</span>
            </div>
          </div>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-2"
            onClick={() => {
              setSelectedSubject(detected.subject);
              setSelectedLevel(detected.level);
            }}
          >
            Use Recommended
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Choose Your Own</h2>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Subject</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subj => (
                  <option key={subj.value} value={subj.value}>{subj.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Level</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
              >
                {levels.map(lvl => (
                  <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition"
            onClick={handleStart}
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeExercises; 