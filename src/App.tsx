import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { QuizPage } from './components/QuizPage';
import { CollegeDirectory } from './components/CollegeDirectory';
import { CareerMapping } from './components/CareerMapping';
import { TimelineTracker } from './components/TimelineTracker';
import { ChatBot } from './components/ChatBot';
import { UserProfile } from './types/user';

type Page = 'landing' | 'onboarding' | 'dashboard' | 'quiz' | 'colleges' | 'careers' | 'timeline';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'onboarding':
        return <Onboarding onComplete={handleProfileComplete} />;
      case 'dashboard':
        if (userProfile == null) {
          setCurrentPage('onboarding');
          return null;
        }
        return <Dashboard userProfile={userProfile} onNavigate={navigateTo} />;
      case 'quiz':
        return <QuizPage userProfile={userProfile} onNavigate={navigateTo} />;
      case 'colleges':
        return <CollegeDirectory userProfile={userProfile} onNavigate={navigateTo} />;
      case 'careers':
        return <CareerMapping userProfile={userProfile} onNavigate={navigateTo} />;
      case 'timeline':
        return <TimelineTracker userProfile={userProfile} onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-inter">
      {renderCurrentPage()}
      {userProfile && (
        <ChatBot
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          userProfile={userProfile}
        />
      )}
    </div>
  );
}

export default App;