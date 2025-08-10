import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Edit3, Save, X, Camera, Activity, Scale, Ruler, Calendar, Shield } from 'lucide-react';

// Zod validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(13, 'Must be at least 13 years old').max(120, 'Invalid age'),
  height: z.number().min(100, 'Height must be at least 100cm').max(300, 'Invalid height'),
  weight: z.number().min(20, 'Weight must be at least 20kg').max(500, 'Invalid weight'),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select a gender' }),
   activityLevel: z.enum([
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active"
  ],{
    required_error: 'Please select activity level'
  }),
  profilePicture: z.string().optional()
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const ProfileDashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(profileSchema)
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm({
    resolver: zodResolver(passwordSchema)
  });


  const fetchUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:3008/api/profile', { 
      credentials: 'include' 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    const userData = await response.json();
    setUser(userData);
    reset(userData);
    setLoading(false);
  } catch (error) {
    setMessage({ type: 'error', text: 'Failed to load profile' });
    setLoading(false);
  }
};

// Replace updateProfile function:
const updateProfile = async (data) => {
  setUpdating(true);
  try {
    const response = await fetch('http://localhost:3008/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update profile');
    }

    setUser(result.user);
    setIsEditing(false);
    setMessage({ type: 'success', text: result.message });
  } catch (error) {
    setMessage({ type: 'error', text: error.message });
  } finally {
    setUpdating(false);
  }
};

// Replace updatePassword function:
const updatePassword = async (data) => {
  setUpdating(true);
  try {
    const response = await fetch('http://localhost:3008/api/profile/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update password');
    }

    setIsEditingPassword(false);
    resetPassword();
    setMessage({ type: 'success', text: result.message });
  } catch (error) {
    setMessage({ type: 'error', text: error.message });
  } finally {
    setUpdating(false);
  }
};

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setValue('profilePicture', imageUrl);
        setUser({ ...user, profilePicture: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const activityLevelLabels = {
    'Sedentary': 'Sedentary (Little/no exercise)',
    'Lightly Active': 'Lightly Active (Light exercise 1-3 days/week)',
    'Moderately Active': 'Moderately Active (Moderate exercise 3-5 days/week)',
    'Very Active': 'Very Active (Hard exercise 6-7 days/week)'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-800 py-8 text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-neutral-900 rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-neutral-600 text-white p-2 rounded-full cursor-pointer hover:bg-neutral-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-neutral-900 rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  {...register('name')}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Age
                </label>
                <input
                  {...register('age', { valueAsNumber: true })}
                  type="number"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none  bg-neutral-800 focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium  text-white mb-2">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none bg-neutral-800 focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium  text-white mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Height (cm)
                </label>
                <input
                  {...register('height', { valueAsNumber: true })}
                  type="number"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none bg-neutral-800 focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium  text-white mb-2">
                  <Scale className="w-4 h-4 inline mr-1" />
                  Weight (kg)
                </label>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  type="number"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                )}
              </div>

              {/* Activity Level */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium  text-white mb-2">
                  <Activity className="w-4 h-4 inline mr-1" />
                  Activity Level
                </label>
                <select
                  {...register('activityLevel')}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50' : 'bg-neutral-800'
                  }`}
                >
                  {Object.entries(activityLevelLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                {errors.activityLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.activityLevel.message}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleSubmit(updateProfile)}
                  disabled={updating}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{updating ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset(user);
                  }}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-neutral-900 rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Password & Security
            </h2>
            {!isEditingPassword && (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            )}
          </div>

          {isEditingPassword ? (
            <div onSubmit={handlePasswordSubmit(updatePassword)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    {...registerPassword('currentPassword')}
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    {...registerPassword('newPassword')}
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    {...registerPassword('confirmPassword')}
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handlePasswordSubmit(updatePassword)}
                  disabled={updating}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPassword(false);
                    resetPassword();
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Keep your account secure by using a strong password and updating it regularly.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;