import React from 'react';
import { Globe, BookOpen, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'onboarding' | 'quiz' | 'colleges' | 'careers') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-100"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-[2000]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mdp-6 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="md:w-10 md:h-10 w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Globe className="md:w-6 w-5 h-5 md:h-6 text-white" />
            </div>
            <span className="md:text-2xl text-lg font-poppins font-bold text-white">FuturePathAI</span>
          </div>
          <button 
            onClick={() => onNavigate('onboarding')}
            className="px-6 py-3 md:scale-100 scale-[.85] bg-gradient-to-r from-blue-500 to-cyan-500 text-sm text-white md:text-base md:font-medium rounded-full hover:shadow-lg text-nowrap hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-24">
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl lg:text-7xl font-poppins font-bold text-white mb-8 leading-tight">
            Your Personalized
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Career Navigator
            </span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover your perfect career path with AI-powered recommendations, explore government colleges, 
            and make informed decisions about your future with personalized guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button 
              onClick={() => onNavigate('quiz')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Start Career Quiz
            </button>
            <button 
              onClick={() => onNavigate('colleges')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Explore Colleges
            </button>
            <button 
              onClick={() => onNavigate('careers')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              View Career Paths
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-white mb-4">Smart Recommendations</h3>
              <p className="text-gray-300 leading-relaxed">
                AI-powered career guidance based on your interests, aptitude, and academic performance to find your perfect path.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-white mb-4">Career Mapping</h3>
              <p className="text-gray-300 leading-relaxed">
                Visualize your career journey with interactive flowcharts showing all possible paths from your chosen stream.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-white mb-4">College Directory</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover government colleges near you with detailed information about courses, facilities, and admission processes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
};