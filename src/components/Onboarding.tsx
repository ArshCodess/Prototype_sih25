import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, GraduationCap, MapPin, Heart } from 'lucide-react';
import { UserProfile } from '../types/user';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    interests: []
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = profile.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    updateProfile({ interests: updatedInterests });
  };

  const interests = [
    'Science & Technology', 'Mathematics', 'Arts & Literature', 'Business & Economics',
    'Medicine & Healthcare', 'Engineering', 'Law & Justice', 'Social Sciences',
    'Sports & Fitness', 'Creative Arts', 'Environment & Nature', 'Psychology'
  ];

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.name && profile.age && profile.gender;
      case 2:
        return profile.class;
      case 3:
        return profile.location && profile.state;
      case 4:
        return profile.interests && profile.interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-poppins font-semibold text-white">Let's Get Started</h2>
            <span className="text-sm text-gray-400">Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-poppins font-semibold text-white mb-2">Personal Information</h3>
                <p className="text-gray-300">Tell us about yourself</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full px-4  text-sm sm:text-base py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                    className="w-full text-sm sm:text-base px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Age"
                    min="14"
                    max="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                  <select
                    value={profile.gender || ''}
                    onChange={(e) => updateProfile({ gender: e.target.value as 'male' | 'female' | 'other' })}
                    className="w-full text-sm sm:text-base px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option className='text-black' value="">Select Gender</option>
                    <option className='text-black' value="male">Male</option>
                    <option className='text-black' value="female">Female</option>
                    <option className='text-black' value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <GraduationCap className="sm:w-16 sm:h-16 w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="sm:text-2xl text-xl font-poppins font-semibold text-white mb-2">Academic Information</h3>
                <p className="text-gray-300 sm:text-base text-sm">What's your current academic status?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Current Class</label>
                <div className="grid grid-cols-2 gap-4">
                  {['10', '12'].map((classLevel) => (
                    <button
                      key={classLevel}
                      onClick={() => updateProfile({ class: classLevel as '10' | '12' })}
                      className={`sm:p-6 p-4 rounded-xl border-2 transition-all duration-300 ${
                        profile.class === classLevel
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                      }`}
                    >
                      <div className="sm:text-2xl text-xl font-bold mb-2">Class {classLevel}</div>
                      <div className="sm:text-sm text-xs">
                        {classLevel === '10' ? 'Planning for 11th & 12th' : 'Planning for College'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <MapPin className="sm:w-16 sm:h-16 w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="sm:text-2xl text-xl font-poppins font-semibold text-white mb-2">Location Details</h3>
                <p className="text-gray-300 text-xs sm:text-base">Help us find colleges near you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City/District</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full text-sm sm:text-base px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your city or district"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                  <select
                    value={profile.state || ''}
                    onChange={(e) => updateProfile({ state: e.target.value })}
                    className="w-full text-sm sm:text-base  px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option className='text-black' value="">Select State</option>
                    <option className='text-black' value="Andhra Pradesh">Andhra Pradesh</option>
                    <option className='text-black' value="Karnataka">Karnataka</option>
                    <option className='text-black' value="Tamil Nadu">Tamil Nadu</option>
                    <option className='text-black' value="Maharashtra">Maharashtra</option>
                    <option className='text-black' value="Delhi">Delhi</option>
                    <option className='text-black' value="West Bengal">West Bengal</option>
                    <option className='text-black' value="Uttar Pradesh">Uttar Pradesh</option>
                    <option className='text-black' value="Gujarat">Gujarat</option>
                    <option className='text-black' value="Rajasthan">Rajasthan</option>
                    <option className='text-black' value="Punjab">Punjab</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                <h3 className="sm:text-2xl text-xl font-poppins font-semibold text-white mb-2">Your Interests</h3>
                <p className="text-gray-300">Select areas that excite you (choose multiple)</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={` p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      profile.interests?.includes(interest)
                        ? 'border-emerald-500 bg-emerald-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-emerald-400 hover:bg-emerald-400/10'
                    }`}
                  >
                    <div className="font-medium text-center text-xs sm:text-sm">{interest}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center space-x-2 sm:px-6 px-4 sm:py-3 py-2 rounded-full transition-all duration-300 ${
                step === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="sm:w-5 sm:h-5 w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center sm:text-base text-sm space-x-2 sm:px-6 px-4 py-2 sm:py-3 rounded-full transition-all duration-300 ${
                isStepValid()
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{step === totalSteps ? 'Complete' : 'Next'}</span>
              <ChevronRight className="sm:w-5 sm:h-5 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};