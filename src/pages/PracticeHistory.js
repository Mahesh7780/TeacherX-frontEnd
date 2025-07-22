import React from 'react';

const mockHistory = [
  {
    id: 1,
    subject: 'Math',
    level: 'Intermediate',
    score: '2/2',
    date: '2024-06-10',
  },
  {
    id: 2,
    subject: 'Programming',
    level: 'Beginner',
    score: '1/2',
    date: '2024-06-09',
  },
  {
    id: 3,
    subject: 'Science',
    level: 'Advanced',
    score: '2/2',
    date: '2024-06-08',
  },
];

const PracticeHistory = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Practice History</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Level</th>
                <th className="py-2 px-4">Score</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map(session => (
                <tr key={session.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 px-4">{session.date}</td>
                  <td className="py-2 px-4">{session.subject}</td>
                  <td className="py-2 px-4">{session.level}</td>
                  <td className="py-2 px-4">{session.score}</td>
                  <td className="py-2 px-4">
                    <button
                      className="px-3 py-1 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition"
                      onClick={() => alert('Review coming soon!')}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PracticeHistory; 