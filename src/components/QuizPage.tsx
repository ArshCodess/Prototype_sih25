import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { UserProfile } from '../types/user';
import { Navigation } from './Navigation';

interface QuizPageProps {
  userProfile: UserProfile | null;
  onNavigate: (page: any) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

export const QuizPage: React.FC<QuizPageProps> = ({ userProfile, onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const questions: Question[] = [
    {
      id: 1,
      question: "Which activity do you find most engaging?",
      options: ["Solving mathematical problems", "Reading and writing stories", "Conducting experiments", "Organizing events"],
      category: "interest"
    },
    {
      id: 2,
      question: "What type of work environment appeals to you?",
      options: ["Laboratory or research facility", "Office with team collaboration", "Outdoor fieldwork", "Creative studio"],
      category: "work_style"
    },
    {
      id: 3,
      question: "Which subject do you excel at most?",
      options: ["Mathematics", "Science", "Languages", "Social Studies"],
      category: "aptitude"
    },
    {
      id: 4,
      question: "How do you prefer to solve problems?",
      options: ["Logical step-by-step analysis", "Creative brainstorming", "Research and experimentation", "Discussion with others"],
      category: "problem_solving"
    },
    {
      id: 5,
      question: "What motivates you the most?",
      options: ["Helping others", "Creating something new", "Solving complex challenges", "Leading a team"],
      category: "motivation"
    },
    {
      id: 6,
      question: "Which career outcome is most important to you?",
      options: ["High salary potential", "Job security", "Social impact", "Work-life balance"],
      category: "values"
    },
    {
      id: 7,
      question: "How do you handle pressure and deadlines?",
      options: ["I thrive under pressure", "I prefer steady, planned work", "I work best with some pressure", "I like flexible timelines"],
      category: "work_style"
    },
    {
      id: 8,
      question: "What type of learning do you prefer?",
      options: ["Hands-on practical work", "Theoretical concepts", "Visual and creative methods", "Group discussions"],
      category: "learning_style"
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateResults = () => {
    // Simple scoring algorithm
    let scienceScore = 0;
    let commerceScore = 0;
    let artsScore = 0;

    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const question = questions[parseInt(questionIndex)];
      
      if (question.category === 'aptitude' || question.category === 'interest') {
        if (answerIndex === 0 || answerIndex === 2) scienceScore += 2;
        if (answerIndex === 1) artsScore += 2;
        if (answerIndex === 3) commerceScore += 2;
      }
    });

    const total = scienceScore + commerceScore + artsScore;
    return {
      science: Math.round((scienceScore / total) * 100) || 33,
      commerce: Math.round((commerceScore / total) * 100) || 33,
      arts: Math.round((artsScore / total) * 100) || 34
    };
  };

  const getRecommendations = () => {
    const scores = calculateResults();
    const maxScore = Math.max(scores.science, scores.commerce, scores.arts);
    
    if (maxScore === scores.science) {
      return {
        primary: "Science Stream",
        subjects: "Physics, Chemistry, Mathematics/Biology",
        careers: ["Engineering", "Medicine", "Research", "Technology"],
        description: "Your analytical thinking and problem-solving skills align perfectly with science fields."
      };
    } else if (maxScore === scores.commerce) {
      return {
        primary: "Commerce Stream",
        subjects: "Accountancy, Business Studies, Economics",
        careers: ["Business Management", "Finance", "Accounting", "Entrepreneurship"],
        description: "Your interest in business and economics makes commerce an ideal choice for you."
      };
    } else {
      return {
        primary: "Arts/Humanities Stream",
        subjects: "History, Political Science, Psychology, Literature",
        careers: ["Law", "Psychology", "Journalism", "Civil Services"],
        description: "Your creative thinking and social awareness align with humanities subjects."
      };
    }
  };

  if (showResults) {
    const scores = calculateResults();
    const recommendation = getRecommendations();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation currentPage="quiz" onNavigate={onNavigate} userProfile={userProfile} />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center mb-12">
            <div className="sm:w-20 h-16 w-16 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="sm:w-10 w-8 h-8 sm:h-10 text-white" />
            </div>
            <h1 className="sm:text-4xl text-2xl font-poppins font-bold text-white mb-4">Quiz Complete!</h1>
            <p className="sm:text-xl text-gray-300">Here are your personalized recommendations</p>
          </div>

          {/* Results Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Primary Recommendation */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl sm:p-8 p-6 border border-white/20 col-span-full">
              <h2 className="sm:text-2xl text-xl font-poppins font-semibold text-white mb-4">Recommended Stream</h2>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30 mb-4">
                <h3 className="sm:text-3xl text-2xl font-bold text-blue-400 mb-2">{recommendation.primary}</h3>
                <p className="text-gray-300 mb-4 sm:text-base text-sm">{recommendation.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold sm:text-base text-sm text-white mb-2">Suggested Subjects:</h4>
                  <p className="text-blue-300 sm:text-base text-sm">{recommendation.subjects}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Career Opportunities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.careers.map((career, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-6">Aptitude Scores</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Science</span>
                    <span className="text-blue-400 font-semibold">{scores.science}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${scores.science}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Commerce</span>
                    <span className="text-emerald-400 font-semibold">{scores.commerce}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000 delay-300"
                      style={{ width: `${scores.commerce}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Arts</span>
                    <span className="text-yellow-400 font-semibold">{scores.arts}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-1000 delay-500"
                      style={{ width: `${scores.arts}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-6">Next Steps</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => onNavigate('colleges')}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-left"
                >
                  <div className="font-semibold mb-1">Explore Colleges</div>
                  <div className="text-sm opacity-90">Find institutions offering your recommended stream</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('careers')}
                  className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-left"
                >
                  <div className="font-semibold mb-1">View Career Paths</div>
                  <div className="text-sm opacity-90">See detailed career roadmaps</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('timeline')}
                  className="w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-left"
                >
                  <div className="font-semibold mb-1">Setup Timeline</div>
                  <div className="text-sm opacity-90">Track important dates and deadlines</div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 my-8 ">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="sm:px-8 sm:py-3 px-4 text-sm text-nowrap py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="sm:px-8 px-5 py-3 text-sm sm:py-3 text-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="quiz" onNavigate={onNavigate} userProfile={userProfile} />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Quiz Header */}
        <div className="text-center mb-12">
          <div className="sm:w-20 w-16 h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="sm:w-10 w-8 h-8 sm:h-10 text-white" />
          </div>
          <h1 className="sm:text-4xl text-2xl font-poppins font-bold text-white mb-4">Career Aptitude Quiz</h1>
          <p className="sm:text-xl text-base text-gray-300 mb-6">Discover your ideal career path through our AI-powered assessment</p>
          
          {/* Progress and Timer */}
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="w-full max-w-2xl mx-auto bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto">
          <h2 className="sm:text-2xl text-xl font-poppins font-semibold text-white mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full sm:p-6 p-4 bg-white/5 border border-white/20 rounded-xl text-left text-white hover:bg-white/10 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="sm:w-8 w-7 h-7 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-300">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="sm:text-lg text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Info */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This quiz uses advanced algorithms to analyze your responses and provide personalized career recommendations
          </p>
        </div>
      </div>
    </div>
  );
};