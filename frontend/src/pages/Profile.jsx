import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    profileImage: null,
    previewImage: ''
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Forgot password state
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = getToken();
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data.user);
      setProfileForm({
        name: response.data.user.name,
        email: response.data.user.email,
        profileImage: null,
        previewImage: response.data.user.profileImage 
          ? `/uploads/profiles/${response.data.user.profileImage.split('/').pop()}`
          : ''
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setProfileForm(prev => ({
        ...prev,
        profileImage: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('name', profileForm.name);
      
      if (profileForm.profileImage) {
        formData.append('profileImage', profileForm.profileImage);
      }

      const response = await axios.put('/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      
      // Update preview image URL
      if (response.data.user.profileImage) {
        setProfileForm(prev => ({
          ...prev,
          previewImage: `/uploads/profiles/${response.data.user.profileImage.split('/').pop()}?t=${Date.now()}`,
          profileImage: null
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const token = getToken();
      await axios.post('/api/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  // Request OTP for password reset
  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/auth/forgot-password', {
        email: forgotPasswordForm.email
      });
      
      toast.success('OTP sent to your email');
      setShowOTPInput(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  // Reset password with OTP
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (forgotPasswordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await axios.post('/api/auth/reset-password', {
        email: forgotPasswordForm.email,
        otp: forgotPasswordForm.otp,
        newPassword: forgotPasswordForm.newPassword
      });

      toast.success('Password reset successful! You can now login with your new password.');
      
      // Reset form and go back to login
      setForgotPasswordForm({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowForgotPassword(false);
      setShowOTPInput(false);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = getToken();
      await axios.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage your account and security settings</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {profileForm.previewImage ? (
                      <img
                        src={profileForm.previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff&size=128`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <span className="text-4xl text-white font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <i className="fas fa-camera text-blue-600"></i>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-user w-5"></i>
                  <span className="font-medium">Profile Information</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === 'security'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-shield-alt w-5"></i>
                  <span className="font-medium">Security</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                      <i className="fas fa-edit"></i>
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setProfileForm(prev => ({
                            ...prev,
                            name: user?.name || '',
                            profileImage: null,
                            previewImage: user?.profileImage 
                              ? `/uploads/profiles/${user.profileImage.split('/').pop()}`
                              : ''
                          }));
                        }}
                        className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProfileUpdate}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                      >
                        <i className="fas fa-save"></i>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                      <p className="text-sm text-gray-500 mt-2">Email cannot be changed</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Picture
                      </label>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-md">
                            {profileForm.previewImage ? (
                              <img
                                src={profileForm.previewImage}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                <i className="fas fa-user text-white text-4xl"></i>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {isEditing && (
                          <div className="flex-grow">
                            <label className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200">
                              <i className="fas fa-cloud-upload-alt mr-2"></i>
                              Upload New Photo
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="text-sm text-gray-500 mt-3">
                              Recommended: Square image, at least 400x400 pixels, max 5MB.
                              JPG, PNG, or WebP formats.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>

                {/* Account Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <i className="fas fa-calendar-alt text-blue-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(user?.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <i className="fas fa-user-check text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Account Status</p>
                          <p className="font-semibold text-gray-800">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                {/* Change Password Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h2>
                  <p className="text-gray-600 mb-8">Update your password regularly to keep your account secure</p>
                  
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter current password"
                        />
                        <i className="fas fa-lock absolute right-4 top-4 text-gray-400"></i>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="At least 6 characters"
                          />
                          <i className="fas fa-key absolute right-4 top-4 text-gray-400"></i>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Confirm new password"
                          />
                          <i className="fas fa-key absolute right-4 top-4 text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                      <i className="fas fa-sync-alt"></i>
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Forgot Password Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h2>
                  <p className="text-gray-600 mb-8">Reset your password if you've forgotten it</p>
                  
                  <button
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                  >
                    <i className="fas fa-key"></i>
                    {showForgotPassword ? 'Hide Reset Form' : 'Reset Password'}
                  </button>
                  
                  {showForgotPassword && (
                    <form 
                      onSubmit={showOTPInput ? handlePasswordReset : handleForgotPasswordRequest}
                      className="mt-8 space-y-6 border-t pt-8"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={forgotPasswordForm.email}
                          onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your registered email"
                          required
                        />
                      </div>
                      
                      {showOTPInput && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              6-digit OTP
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={forgotPasswordForm.otp}
                                onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, otp: e.target.value }))}
                                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="000000"
                                maxLength={6}
                                pattern="\d{6}"
                                required
                              />
                              <i className="fas fa-shield-alt absolute right-4 top-4 text-gray-400"></i>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Check your email for the 6-digit OTP. Valid for 10 minutes.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <input
                                type="password"
                                value={forgotPasswordForm.newPassword}
                                onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="At least 6 characters"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                value={forgotPasswordForm.confirmPassword}
                                onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Confirm new password"
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}
                      
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                      >
                        <i className={showOTPInput ? "fas fa-check" : "fas fa-paper-plane"}></i>
                        {showOTPInput ? 'Reset Password' : 'Send OTP'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Security Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <i className="fas fa-lightbulb text-yellow-500"></i>
                    Security Tips
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <i className="fas fa-lock text-blue-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Strong Passwords</h4>
                          <p className="text-sm text-gray-600">
                            Use a combination of letters, numbers, and special characters.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <i className="fas fa-sync-alt text-green-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Regular Updates</h4>
                          <p className="text-sm text-gray-600">
                            Change your password every 3-6 months for better security.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <i className="fas fa-envelope text-red-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">OTP Security</h4>
                          <p className="text-sm text-gray-600">
                            Never share your OTP with anyone. It expires in 10 minutes.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <i className="fas fa-user-shield text-purple-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Account Activity</h4>
                          <p className="text-sm text-gray-600">
                            Regularly review your account activity and logout from unused devices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;