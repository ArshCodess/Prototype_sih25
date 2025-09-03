import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Plus, Bell } from 'lucide-react';
import { UserProfile, TimelineEvent } from '../types/user';
import { Navigation } from './Navigation';

interface TimelineTrackerProps {
  userProfile: UserProfile | null;
  onNavigate: (page: any) => void;
}

export const TimelineTracker: React.FC<TimelineTrackerProps> = ({ userProfile, onNavigate }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Mock timeline events
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'JEE Main Registration Opens',
      description: 'Register for JEE Main 2025 examination',
      date: new Date('2025-02-15'),
      type: 'exam',
      importance: 'high',
      isCompleted: false
    },
    {
      id: '2',
      title: 'NEET Application Deadline',
      description: 'Last date to apply for NEET 2025',
      date: new Date('2025-03-01'),
      type: 'deadline',
      importance: 'high',
      isCompleted: false
    },
    {
      id: '3',
      title: 'State CET Registration',
      description: 'Registration for State Common Entrance Test',
      date: new Date('2025-02-28'),
      type: 'exam',
      importance: 'medium',
      isCompleted: false
    },
    {
      id: '4',
      title: 'Merit Scholarship Application',
      description: 'Apply for government merit scholarships',
      date: new Date('2025-02-20'),
      type: 'scholarship',
      importance: 'medium',
      isCompleted: false
    },
    {
      id: '5',
      title: 'College Admission Counseling',
      description: 'Participate in admission counseling process',
      date: new Date('2025-06-15'),
      type: 'admission',
      importance: 'high',
      isCompleted: false
    },
    {
      id: '6',
      title: 'Document Verification',
      description: 'Submit required documents for admission',
      date: new Date('2025-07-01'),
      type: 'deadline',
      importance: 'high',
      isCompleted: false
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'from-red-500 to-pink-500';
      case 'admission':
        return 'from-blue-500 to-cyan-500';
      case 'scholarship':
        return 'from-yellow-500 to-orange-500';
      case 'deadline':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-red-500 bg-red-500/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/20';
      case 'low':
        return 'border-green-500 bg-green-500/20';
      default:
        return 'border-gray-500 bg-gray-500/20';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
  });

  const upcomingEvents = timelineEvents
    .filter(event => new Date(event.date) > new Date() && !event.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="timeline" onNavigate={onNavigate} userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
            Timeline <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tracker</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay on top of important dates, deadlines, and milestones in your academic journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timeline */}
          <div className="lg:col-span-2">
            {/* Month/Year Selector */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <h2 className="text-xl font-poppins font-semibold text-white">Calendar View</h2>
                <div className="flex gap-4">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {months.map((month, index) => (
                      <option className='text-black' key={index} value={index}>{month}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option className='text-black' value={2025}>2025</option>
                    <option className='text-black' value={2026}>2026</option>
                    <option className='text-black' value={2027}>2027</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getEventColor(event.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {event.isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Calendar className="w-6 h-6 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-poppins font-semibold text-white">{event.title}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getImportanceColor(event.importance)}`}>
                            {event.importance.toUpperCase()}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{event.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{event.date.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-300">
                              <Bell className="w-4 h-4" />
                            </button>
                            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm">
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No events this month</h3>
                  <p className="text-gray-400">Select a different month or add your own events</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Add */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">Quick Actions</h3>
              <button 
                onClick={() => setShowAddEvent(true)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Add Event</span>
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-white/5 rounded-xl">
                    <div className="font-medium text-white text-sm mb-1">{event.title}</div>
                    <div className="text-xs text-gray-400 flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{event.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">
                    {timelineEvents.filter(e => e.isCompleted).length}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    {upcomingEvents.length}
                  </div>
                  <div className="text-sm text-gray-400">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">
                    {timelineEvents.filter(e => e.importance === 'high' && !e.isCompleted).length}
                  </div>
                  <div className="text-sm text-gray-400">High Priority</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};