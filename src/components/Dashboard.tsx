import React from 'react';
import { MapPin, TrendingUp, Calendar, Brain, Target} from 'lucide-react';
import { UserProfile } from '../types/user';
import { Navigation } from './Navigation';

interface DashboardProps {
  userProfile: UserProfile | null;
  onNavigate: (page: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onNavigate }) => {
  if (!userProfile) return null;

  const getRecommendedStreams = () => {
    const { interests, class: currentClass } = userProfile;
    const recommendations = [];

    if (currentClass === '10') {
      if (interests.includes('Science & Technology') || interests.includes('Mathematics') || interests.includes('Engineering')) {
        recommendations.push('Science (PCM)', 'Science (PCB)');
      }
      if (interests.includes('Business & Economics') || interests.includes('Mathematics')) {
        recommendations.push('Commerce');
      }
      if (interests.includes('Arts & Literature') || interests.includes('Social Sciences') || interests.includes('Psychology')) {
        recommendations.push('Arts/Humanities');
      }
    } else {
      if (interests.includes('Science & Technology') || interests.includes('Engineering')) {
        recommendations.push('B.Tech/B.E.', 'B.Sc Computer Science');
      }
      if (interests.includes('Medicine & Healthcare')) {
        recommendations.push('MBBS', 'B.Pharm', 'B.Sc Nursing');
      }
      if (interests.includes('Business & Economics')) {
        recommendations.push('B.Com', 'BBA', 'Economics');
      }
      if (interests.includes('Arts & Literature') || interests.includes('Social Sciences')) {
        recommendations.push('BA Literature', 'BA Political Science', 'BA Psychology');
      }
    }

    return recommendations.slice(0, 3);
  };

  const upcomingEvents = [
    { title: 'JEE Main Registration', date: '2025-02-15', type: 'exam' },
    { title: 'NEET Application', date: '2025-03-01', type: 'exam' },
    { title: 'State CET Registration', date: '2025-02-28', type: 'exam' },
    { title: 'Scholarship Deadline', date: '2025-02-20', type: 'scholarship' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="dashboard" onNavigate={onNavigate} userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{userProfile.name}</span>
          </h1>
          <p className="text-xl text-gray-300">Here's your personalized career guidance dashboard</p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Primary Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Streams */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-white">Recommended Streams</h3>
                  <p className="text-gray-400">Based on your interests and aptitude</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {getRecommendedStreams().map((stream, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                    <div className="font-semibold text-white mb-1">{stream}</div>
                    <div className="text-sm text-blue-300">92% match</div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => onNavigate('quiz')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Take Detailed Aptitude Quiz
              </button>
            </div>

            {/* Career Pathways */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-white">Career Pathways</h3>
                  <p className="text-gray-400">Explore future opportunities</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <div className="font-semibold text-white">Software Engineer</div>
                    <div className="text-sm text-gray-400">High demand • ₹8-25 LPA</div>
                  </div>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <div className="font-semibold text-white">Data Scientist</div>
                    <div className="text-sm text-gray-400">Growing field • ₹10-30 LPA</div>
                  </div>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('careers')}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Explore All Career Paths
              </button>
            </div>
          </div>

          {/* Right Column - Secondary Cards */}
          <div className="space-y-8">
            {/* Nearby Colleges */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white">Nearby Colleges</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-white text-sm">Government College of Engineering</div>
                  <div className="text-xs text-gray-400">5.2 km away • Engineering</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-white text-sm">State University</div>
                  <div className="text-xs text-gray-400">8.1 km away • Multiple streams</div>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('colleges')}
                className="w-full py-2 bg-yellow-500 text-slate-900 font-medium rounded-lg hover:bg-yellow-400 transition-all duration-300 text-sm"
              >
                View All Colleges
              </button>
            </div>

            {/* Timeline Tracker */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white">Upcoming Deadlines</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                {upcomingEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'exam' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{event.title}</div>
                      <div className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => onNavigate('timeline')}
                className="w-full py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-400 transition-all duration-300 text-sm"
              >
                View Full Timeline
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">Your Progress</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Profile Completion</span>
                  <span className="text-emerald-400 font-semibold">100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{userProfile.interests.length}</div>
                    <div className="text-xs text-gray-400">Interests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">87%</div>
                    <div className="text-xs text-gray-400">Match Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};