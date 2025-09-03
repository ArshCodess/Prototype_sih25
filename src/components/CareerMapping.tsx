import React, { useState } from 'react';
import { ArrowRight, DollarSign, BookOpen, Users, Target } from 'lucide-react';
import { UserProfile, CareerPath } from '../types/user';
import { Navigation } from './Navigation';

interface CareerMappingProps {
  userProfile: UserProfile | null;
  onNavigate: (page: any) => void;
}

export const CareerMapping: React.FC<CareerMappingProps> = ({ userProfile, onNavigate }) => {
  const [selectedStream, setSelectedStream] = useState('Science');
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  const careerPaths: Record<string, CareerPath[]> = {
    Science: [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        description: 'Design and develop software applications, websites, and systems',
        requiredEducation: ['B.Tech Computer Science', 'B.Sc Computer Science', 'BCA'],
        skillsRequired: ['Programming', 'Problem Solving', 'Logical Thinking', 'Mathematics'],
        averageSalary: '₹8-25 LPA',
        growthProspects: 'Excellent - High demand in tech industry',
        relatedCareers: ['Data Scientist', 'DevOps Engineer', 'Product Manager']
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make better decisions',
        requiredEducation: ['B.Tech/B.E.', 'B.Sc Statistics/Mathematics', 'BCA with specialization'],
        skillsRequired: ['Statistics', 'Programming', 'Machine Learning', 'Analytics'],
        averageSalary: '₹10-30 LPA',
        growthProspects: 'Exceptional - Fastest growing field',
        relatedCareers: ['Machine Learning Engineer', 'Business Analyst', 'Research Scientist']
      },
      {
        id: 'doctor',
        title: 'Medical Doctor',
        description: 'Diagnose and treat patients, improve public health',
        requiredEducation: ['MBBS', 'MD/MS (Specialization)'],
        skillsRequired: ['Medical Knowledge', 'Empathy', 'Decision Making', 'Communication'],
        averageSalary: '₹12-50 LPA',
        growthProspects: 'Stable - Always in demand',
        relatedCareers: ['Surgeon', 'Specialist', 'Medical Researcher']
      }
    ],
    Commerce: [
      {
        id: 'chartered-accountant',
        title: 'Chartered Accountant',
        description: 'Manage financial records, audit, and provide financial advice',
        requiredEducation: ['B.Com', 'CA Foundation', 'CA Final'],
        skillsRequired: ['Accounting', 'Financial Analysis', 'Attention to Detail', 'Ethics'],
        averageSalary: '₹15-40 LPA',
        growthProspects: 'Excellent - High respect and demand',
        relatedCareers: ['Financial Advisor', 'Tax Consultant', 'Investment Banker']
      },
      {
        id: 'business-manager',
        title: 'Business Manager',
        description: 'Lead teams and manage business operations',
        requiredEducation: ['BBA', 'MBA', 'B.Com'],
        skillsRequired: ['Leadership', 'Communication', 'Strategic Thinking', 'Team Management'],
        averageSalary: '₹8-35 LPA',
        growthProspects: 'Very Good - Leadership roles always needed',
        relatedCareers: ['Entrepreneur', 'Consultant', 'Operations Manager']
      },
      {
        id: 'investment-banker',
        title: 'Investment Banker',
        description: 'Help companies and governments raise capital through financial markets',
        requiredEducation: ['B.Com', 'BBA', 'MBA (Finance)'],
        skillsRequired: ['Financial Modeling', 'Analysis', 'Communication', 'Market Knowledge'],
        averageSalary: '₹20-60 LPA',
        growthProspects: 'Excellent - High earning potential',
        relatedCareers: ['Financial Analyst', 'Portfolio Manager', 'Corporate Finance']
      }
    ],
    Arts: [
      {
        id: 'civil-servant',
        title: 'Civil Servant (IAS/IPS)',
        description: 'Serve the public through government administration and policy',
        requiredEducation: ['Any Graduation', 'UPSC Exam'],
        skillsRequired: ['General Knowledge', 'Leadership', 'Public Service', 'Decision Making'],
        averageSalary: '₹15-50 LPA',
        growthProspects: 'Excellent - Prestigious career with impact',
        relatedCareers: ['Diplomat', 'Policy Analyst', 'Public Administrator']
      },
      {
        id: 'lawyer',
        title: 'Lawyer',
        description: 'Represent clients in legal matters and uphold justice',
        requiredEducation: ['BA LLB', 'LLB', 'LLM'],
        skillsRequired: ['Legal Knowledge', 'Communication', 'Research', 'Critical Thinking'],
        averageSalary: '₹8-40 LPA',
        growthProspects: 'Very Good - Always needed in society',
        relatedCareers: ['Judge', 'Legal Advisor', 'Corporate Lawyer']
      },
      {
        id: 'psychologist',
        title: 'Psychologist',
        description: 'Help people understand and improve their mental health',
        requiredEducation: ['BA Psychology', 'MA Psychology', 'M.Phil/PhD'],
        skillsRequired: ['Empathy', 'Listening', 'Analysis', 'Communication'],
        averageSalary: '₹6-25 LPA',
        growthProspects: 'Good - Growing awareness of mental health',
        relatedCareers: ['Counselor', 'Therapist', 'Researcher']
      }
    ]
  };

  const streams = Object.keys(careerPaths);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="careers" onNavigate={onNavigate} userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
            Career <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Pathways</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore detailed career roadmaps and find your perfect professional journey
          </p>
        </div>

        {/* Stream Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex space-x-2">
              {streams.map((stream) => (
                <button
                  key={stream}
                  onClick={() => {
                    setSelectedStream(stream);
                    setSelectedCareer(null);
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedStream === stream
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Career Cards Grid */}
        {!selectedCareer ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths[selectedStream].map((career) => (
              <div 
                key={career.id} 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group transform hover:scale-105"
                onClick={() => setSelectedCareer(career)}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-poppins font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {career.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{career.description}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Salary Range</span>
                    <span className="text-emerald-400 font-semibold">{career.averageSalary}</span>
                  </div>
                  <div className="text-xs text-gray-400">{career.growthProspects}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {career.skillsRequired.slice(0, 3).map((_, index) => (
                      <div key={index} className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-slate-900"></div>
                    ))}
                    {career.skillsRequired.length > 3 && (
                      <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs text-white">
                        +{career.skillsRequired.length - 3}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Career View */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCareer(null)}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Career List</span>
            </button>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-poppins font-bold text-white mb-4">{selectedCareer.title}</h2>
                <p className="text-xl text-gray-300">{selectedCareer.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Education Path */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Education Requirements</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedCareer.requiredEducation.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Required */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-semibold text-white">Key Skills</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedCareer.skillsRequired.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary & Growth */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Compensation</h3>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{selectedCareer.averageSalary}</div>
                  <p className="text-gray-300 text-sm">{selectedCareer.growthProspects}</p>
                </div>

                {/* Related Careers */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Related Careers</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedCareer.relatedCareers.map((career, index) => (
                      <button 
                        key={index}
                        className="block w-full text-left px-3 py-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                      >
                        {career}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => onNavigate('colleges')}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Find Relevant Colleges
                </button>
                <button 
                  onClick={() => onNavigate('timeline')}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Add to Timeline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};