import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate student pursuing advanced studies in mathematics and physics. Love learning new concepts and solving complex problems.',
    learningStyle: 'Auditory',
    difficulty: 'Intermediate',
    studyTimes: ['Afternoon', 'Evening'],
    dailyGoal: 2
  });

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    achievementAlerts: true,
    newContentUpdates: false,
    messageNotifications: true,
    emailNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    allowContact: true,
    shareProgress: false,
    marketingEmails: true
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginNotifications: true,
    rememberSessions: false,
    autoLogout: true
  });

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStudyTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      studyTimes: prev.studyTimes.includes(time)
        ? prev.studyTimes.filter(t => t !== time)
        : [...prev.studyTimes, time]
    }));
  };

  const handleSaveChanges = () => {
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and learning settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-button text-sm font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <i className="ri-download-line mr-2"></i>Export Data
            </button>
            <button 
              onClick={handleSaveChanges}
              className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition"
            >
              <i className="ri-save-line mr-2"></i>Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="xl:col-span-2">
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Learning Preferences</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
                  <select
                    value={formData.learningStyle}
                    onChange={(e) => handleInputChange('learningStyle', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary"
                  >
                    <option>Visual</option>
                    <option>Auditory</option>
                    <option>Reading/Writing</option>
                    <option>Kinesthetic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <div className="flex items-center space-x-4">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <label key={level} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="difficulty"
                          checked={formData.difficulty === level}
                          onChange={() => handleInputChange('difficulty', level)}
                          className="hidden"
                        />
                        <span className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center mr-2 ${
                          formData.difficulty === level ? 'border-primary' : ''
                        }`}>
                          {formData.difficulty === level && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </span>
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Times</label>
                  <div className="space-y-2">
                    {['Morning', 'Afternoon', 'Evening'].map(time => (
                      <label key={time} className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.studyTimes.includes(time)}
                          onChange={() => handleStudyTimeChange(time)}
                        />
                        <span className="checkmark"></span>
                        {time}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Study Goal (hours)</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={formData.dailyGoal}
                      onChange={(e) => handleInputChange('dailyGoal', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none"
                    />
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

            {/* Notification Settings */}
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Notification Settings</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'studyReminders' && 'Get notified about upcoming study sessions'}
                        {key === 'achievementAlerts' && 'Celebrate your learning milestones'}
                        {key === 'newContentUpdates' && 'Stay updated with new course materials'}
                        {key === 'messageNotifications' && 'Get notified about new messages'}
                        {key === 'emailNotifications' && 'Receive updates via email'}
                      </p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={`${key}-switch`}
                        className="switch-input"
                        checked={value}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      />
                      <label htmlFor={`${key}-switch`} className="switch-label"></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="xl:col-span-1">
            {/* Profile Picture */}
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Profile Picture</h2>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                  <img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20student%20with%20glasses%2C%20looking%20confident%2C%20high%20quality%2C%20professional%20lighting%2C%20neutral%20background%2C%20detailed%20facial%20features%2C%20friendly%20expression&width=200&height=200&seq=1&orientation=squarish" alt="Profile" className="w-full h-full object-cover object-top" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-blue-600 transition">
                  <i className="ri-camera-line mr-2"></i>Change Photo
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Account Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="text-sm font-medium text-gray-800">Premium Student</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-800">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm font-medium text-gray-800">Today, 09:15 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-button text-sm font-medium hover:bg-gray-200 transition">
                  <i className="ri-upgrade-line mr-2"></i>Upgrade Plan
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-50 text-primary py-3 px-4 rounded-button text-sm font-medium hover:bg-blue-100 transition text-left">
                  <i className="ri-download-line mr-3"></i>Download My Data
                </button>
                <button className="w-full bg-orange-50 text-orange-600 py-3 px-4 rounded-button text-sm font-medium hover:bg-orange-100 transition text-left">
                  <i className="ri-lock-line mr-3"></i>Change Password
                </button>
                <button className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-button text-sm font-medium hover:bg-red-100 transition text-left">
                  <i className="ri-delete-bin-line mr-3"></i>Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Security */}
      {activeTab === 'security' && (
        <div className="mt-8">
          <div className="settings-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Privacy & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Privacy Settings</h3>
                <div className="space-y-3">
                  {Object.entries(privacy).map(([key, value]) => (
                    <label key={key} className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      {key === 'showProfile' && 'Show my profile to other students'}
                      {key === 'allowContact' && 'Allow teachers to contact me'}
                      {key === 'shareProgress' && 'Share my progress publicly'}
                      {key === 'marketingEmails' && 'Receive marketing emails'}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Security Settings</h3>
                <div className="space-y-3">
                  {Object.entries(security).map(([key, value]) => (
                    <label key={key} className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSecurityChange(key, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      {key === 'twoFactor' && 'Two-factor authentication'}
                      {key === 'loginNotifications' && 'Login notifications'}
                      {key === 'rememberSessions' && 'Remember login sessions'}
                      {key === 'autoLogout' && 'Auto-logout after inactivity'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 