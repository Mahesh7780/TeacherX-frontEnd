import React, { useEffect } from 'react';

const Achievements = () => {
  useEffect(() => {
    // Badge hover effects
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.addEventListener('click', function () {
        if (this.classList.contains('unlocked')) {
          alert('Badge unlocked! Great job!');
        } else {
          alert('Complete more lessons to unlock this badge!');
        }
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      badges.forEach(badge => badge.replaceWith(badge.cloneNode(true)));
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h1>
            <p className="text-gray-600">Track your progress and celebrate your learning milestones</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-button text-sm font-medium border border-gray-200 hover:bg-gray-50 transition">
              <i className="ri-share-line mr-2"></i>Share
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition">
              <i className="ri-download-line mr-2"></i>Export
            </button>
          </div>
        </div>
        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mr-4">
                <i className="ri-trophy-line ri-lg"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">24</h3>
                <p className="text-sm text-gray-600">Total Badges</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
                <i className="ri-medal-line ri-lg"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">18</h3>
                <p className="text-sm text-gray-600">Unlocked</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-primary rounded-full mr-4">
                <i className="ri-fire-line ri-lg"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">16</h3>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
                <i className="ri-star-line ri-lg"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">1,250</h3>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Achievement Card 1 */}
            <div className="achievement-card bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mr-4">
                  <i className="ri-fire-line ri-2x"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Learning Streak</h3>
                  <p className="text-sm text-gray-600">16 days in a row</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">You've maintained a consistent learning schedule for 16 consecutive days!</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-600 font-medium">+50 points</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
            {/* Achievement Card 2 */}
            <div className="achievement-card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-primary rounded-full mr-4">
                  <i className="ri-calculator-line ri-2x"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Math Master</h3>
                  <p className="text-sm text-gray-600">Calculus Expert</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">Completed all advanced calculus modules with 95% accuracy!</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 font-medium">+100 points</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
            {/* Achievement Card 3 */}
            <div className="achievement-card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
                  <i className="ri-atom-line ri-2x"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Physics Pioneer</h3>
                  <p className="text-sm text-gray-600">Quantum Explorer</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">Successfully completed quantum mechanics fundamentals!</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">+75 points</span>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Badge Collection */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Badge Collection</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100">
                <i className="ri-filter-line"></i>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100">
                <i className="ri-sort-desc"></i>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Badge 1 */}
            <div className="badge unlocked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                <i className="ri-fire-line text-white ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-800">Streak Master</h3>
              <p className="text-xs text-gray-500">16 days</p>
            </div>
            {/* Badge 2 */}
            <div className="badge unlocked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <i className="ri-calculator-line text-white ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-800">Math Genius</h3>
              <p className="text-xs text-gray-500">95% accuracy</p>
            </div>
            {/* Badge 3 */}
            <div className="badge unlocked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                <i className="ri-atom-line text-white ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-800">Physics Pro</h3>
              <p className="text-xs text-gray-500">Quantum expert</p>
            </div>
            {/* Badge 4 */}
            <div className="badge unlocked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg">
                <i className="ri-code-s-slash-line text-white ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-800">Code Master</h3>
              <p className="text-xs text-gray-500">10 projects</p>
            </div>
            {/* Badge 5 */}
            <div className="badge unlocked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-lg">
                <i className="ri-bar-chart-box-line text-white ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-800">Data Analyst</h3>
              <p className="text-xs text-gray-500">5 datasets</p>
            </div>
            {/* Badge 6 */}
            <div className="badge locked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gray-300 rounded-full shadow-lg">
                <i className="ri-lock-line text-gray-500 ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Perfect Score</h3>
              <p className="text-xs text-gray-400">Locked</p>
            </div>
            {/* Badge 7 */}
            <div className="badge locked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gray-300 rounded-full shadow-lg">
                <i className="ri-lock-line text-gray-500 ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Speed Learner</h3>
              <p className="text-xs text-gray-400">Locked</p>
            </div>
            {/* Badge 8 */}
            <div className="badge locked text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gray-300 rounded-full shadow-lg">
                <i className="ri-lock-line text-gray-500 ri-2x"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Team Player</h3>
              <p className="text-xs text-gray-400">Locked</p>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Tracking & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Learning Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Progress</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
                <span className="text-sm font-medium text-primary">18/20 hours</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-primary rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Monthly Streak</span>
                <span className="text-sm font-medium text-green-600">16 days</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-green-500 rounded-full" style={{ width: '53%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Course Completion</span>
                <span className="text-sm font-medium text-purple-600">78%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Class Leaderboard</h2>
          <div className="space-y-4">
            {/* Rank 1 */}
            <div className="leaderboard-item flex items-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full mr-3 font-bold">1</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20student%20with%20glasses%2C%20looking%20confident%2C%20high%20quality%2C%20professional%20lighting%2C%20neutral%20background%2C%20detailed%20facial%20features%2C%20friendly%20expression&width=200&height=200&seq=1&orientation=squarish" alt="Emily" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Emily Johnson</h3>
                <p className="text-sm text-gray-600">1,250 points</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-yellow-600">
                <i className="ri-trophy-line"></i>
              </div>
            </div>
            {/* Rank 2 */}
            <div className="leaderboard-item flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full mr-3 font-bold">2</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20male%20student%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=15&orientation=squarish" alt="Alex" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Alex Rodriguez</h3>
                <p className="text-sm text-gray-600">1,180 points</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-gray-600">
                <i className="ri-medal-line"></i>
              </div>
            </div>
            {/* Rank 3 */}
            <div className="leaderboard-item flex items-center p-3 rounded-lg bg-orange-50 border border-orange-200">
              <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full mr-3 font-bold">3</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20female%20student%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=16&orientation=squarish" alt="Sarah" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Sarah Chen</h3>
                <p className="text-sm text-gray-600">1,120 points</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-orange-600">
                <i className="ri-award-line"></i>
              </div>
            </div>
            {/* Rank 4 */}
            <div className="leaderboard-item flex items-center p-3 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full mr-3 font-bold">4</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20male%20student%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=17&orientation=squarish" alt="Mike" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Mike Thompson</h3>
                <p className="text-sm text-gray-600">980 points</p>
              </div>
            </div>
            {/* Rank 5 */}
            <div className="leaderboard-item flex items-center p-3 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full mr-3 font-bold">5</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20female%20student%2C%20confident%20expression%2C%20academic%20setting%2C%20neutral%20background&width=100&height=100&seq=18&orientation=squarish" alt="Lisa" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Lisa Park</h3>
                <p className="text-sm text-gray-600">920 points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievement Timeline</h2>
        <div className="space-y-6">
          {/* Timeline Item 1 */}
          <div className="flex items-start">
            <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">Learning Streak - 16 Days</h3>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Maintained consistent learning schedule for 16 consecutive days</p>
              <div className="flex items-center">
                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full mr-2">+50 points</span>
                <span className="text-xs text-gray-500">Streak Master badge unlocked</span>
              </div>
            </div>
          </div>
          {/* Timeline Item 2 */}
          <div className="flex items-start">
            <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">Math Master - Calculus Expert</h3>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Completed all advanced calculus modules with 95% accuracy</p>
              <div className="flex items-center">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">+100 points</span>
                <span className="text-xs text-gray-500">Math Genius badge unlocked</span>
              </div>
            </div>
          </div>
          {/* Timeline Item 3 */}
          <div className="flex items-start">
            <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">Physics Pioneer - Quantum Explorer</h3>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Successfully completed quantum mechanics fundamentals</p>
              <div className="flex items-center">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mr-2">+75 points</span>
                <span className="text-xs text-gray-500">Physics Pro badge unlocked</span>
              </div>
            </div>
          </div>
          {/* Timeline Item 4 */}
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-2 mr-4"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-500">Code Master - 10 Projects</h3>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Completed 10 programming projects successfully</p>
              <div className="flex items-center">
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mr-2">+80 points</span>
                <span className="text-xs text-gray-500">Code Master badge unlocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 