import React, { useState } from 'react';

const mockUser = {
  id: 1,
  name: 'Professor John Smith',
  email: 'john.smith@university.edu',
  phone: '+1 (555) 123-4567',
  department: 'Mathematics',
  title: 'Associate Professor',
  bio: 'Experienced mathematics professor with over 10 years of teaching experience. Specializing in calculus, linear algebra, and mathematical modeling.',
  avatar: 'JS',
  courses: ['Mathematics 101', 'Advanced Calculus', 'Linear Algebra'],
  joinedDate: '2014-09-01',
  notifications: {
    email: true,
    push: false,
    sms: true,
    weeklyReport: true,
  },
};

function Profile() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  });
  const [notifications, setNotifications] = useState(user.notifications);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser({ ...user, ...editData });
      setAlert({ type: 'success', message: 'Profile updated successfully!' });
    } else {
      // Start editing
      setEditData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
    });
  };

  const handleNotificationChange = (key) => (event) => {
    setNotifications({
      ...notifications,
      [key]: event.target.checked,
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: 'error', message: 'New passwords do not match!' });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setAlert({ type: 'error', message: 'Password must be at least 8 characters long!' });
      return;
    }
    setAlert({ type: 'success', message: 'Password changed successfully!' });
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Profile Settings
      </h1>

      {alert && (
        <div className={`mb-6 p-4 rounded-lg ${
          alert.type === 'success' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          <div className="flex justify-between items-center">
            <span>{alert.message}</span>
            <button 
              onClick={() => setAlert(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Personal Information
                </h2>
                <button
                  className={`px-4 py-2 rounded text-sm font-medium transition ${
                    isEditing 
                      ? 'bg-primary text-white hover:bg-blue-600' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={handleEditToggle}
                >
                  <i className={`mr-2 ${isEditing ? 'ri-save-line' : 'ri-edit-line'}`}></i>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="w-30 h-30 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-semibold mb-4">
                      {user.avatar}
                    </div>
                    <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition border border-gray-300 dark:border-gray-600">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                        value={isEditing ? editData.name : user.name}
                        onChange={(e) => isEditing && setEditData({ ...editData, name: e.target.value })}
                        disabled={!isEditing}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                        />
                        <i className="ri-user-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                        value={isEditing ? editData.email : user.email}
                        onChange={(e) => isEditing && setEditData({ ...editData, email: e.target.value })}
                        disabled={!isEditing}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                          />
                          <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                        value={isEditing ? editData.phone : user.phone}
                        onChange={(e) => isEditing && setEditData({ ...editData, phone: e.target.value })}
                        disabled={!isEditing}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                          />
                          <i className="ri-phone-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows="3"
                        value={isEditing ? editData.bio : user.bio}
                        onChange={(e) => isEditing && setEditData({ ...editData, bio: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

                  {isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                  >
                    <i className="ri-close-line mr-2"></i>
                        Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.department}
                      disabled
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    />
                    <i className="ri-building-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.title}
                      disabled
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    />
                    <i className="ri-user-star-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Notification Settings
              </h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'push' && 'Receive push notifications'}
                        {key === 'sms' && 'Receive SMS notifications'}
                        {key === 'weeklyReport' && 'Get weekly progress reports'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={handleNotificationChange(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Account Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Account Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Account Type</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Premium Teacher</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">September 2014</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Login</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Today, 09:15 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition border border-gray-300 dark:border-gray-600">
                  <i className="ri-upgrade-line mr-2"></i>Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button 
                  className="w-full bg-blue-50 dark:bg-blue-900/20 text-primary py-3 px-4 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-left"
                    onClick={() => setOpenPasswordDialog(true)}
                  >
                  <i className="ri-lock-line mr-3"></i>Change Password
                </button>
                <button className="w-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 py-3 px-4 rounded text-sm font-medium hover:bg-orange-100 dark:hover:bg-orange-900/30 transition text-left">
                  <i className="ri-download-line mr-3"></i>Download My Data
                </button>
                <button className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 px-4 rounded text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition text-left">
                  <i className="ri-delete-bin-line mr-3"></i>Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      {openPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Change Password
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setOpenPasswordDialog(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition"
              >
            Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile; 