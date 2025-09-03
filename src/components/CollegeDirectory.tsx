import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, BookOpen, Home, Phone, ExternalLink } from 'lucide-react';
import { UserProfile, College } from '../types/user';
import { Navigation } from './Navigation';

interface CollegeDirectoryProps {
  userProfile: UserProfile | null;
  onNavigate: (page: any) => void;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({ userProfile, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock college data
  const colleges: College[] = [
    {
      id: '1',
      name: 'Government College of Engineering',
      location: 'Chennai, Tamil Nadu',
      courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical', 'B.Tech Civil'],
      facilities: ['Hostel', 'Library', 'Labs', 'Sports Complex', 'Wifi'],
      ranking: 15,
      fees: 75000,
      admissionProcess: 'JEE Main + State CET',
      contactInfo: '+91-9876543210'
    },
    {
      id: '2',
      name: 'State University of Commerce',
      location: 'Mumbai, Maharashtra',
      courses: ['B.Com', 'BBA', 'B.Com (Honors)', 'Economics'],
      facilities: ['Hostel', 'Library', 'Computer Lab', 'Auditorium'],
      ranking: 8,
      fees: 45000,
      admissionProcess: 'Merit Based + Entrance',
      contactInfo: '+91-9876543211'
    },
    {
      id: '3',
      name: 'Government Arts & Science College',
      location: 'Bangalore, Karnataka',
      courses: ['BA Psychology', 'BA Literature', 'B.Sc Mathematics', 'BA Political Science'],
      facilities: ['Library', 'Labs', 'Cafeteria', 'Sports Ground'],
      ranking: 12,
      fees: 35000,
      admissionProcess: 'Merit Based',
      contactInfo: '+91-9876543212'
    },
    {
      id: '4',
      name: 'Medical College & Hospital',
      location: 'Delhi',
      courses: ['MBBS', 'B.Pharm', 'B.Sc Nursing', 'BPT'],
      facilities: ['Hostel', 'Hospital', 'Library', 'Research Labs', 'Wifi'],
      ranking: 5,
      fees: 125000,
      admissionProcess: 'NEET',
      contactInfo: '+91-9876543213'
    },
    {
      id: '5',
      name: 'Institute of Technology',
      location: 'Hyderabad, Telangana',
      courses: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech IT', 'B.Tech Data Science'],
      facilities: ['Hostel', 'Library', 'Advanced Labs', 'Placement Cell', 'Wifi', 'Sports'],
      ranking: 7,
      fees: 95000,
      admissionProcess: 'JEE Main + TS EAMCET',
      contactInfo: '+91-9876543214'
    },
    {
      id: '6',
      name: 'National Law University',
      location: 'Pune, Maharashtra',
      courses: ['BA LLB', 'BBA LLB', 'B.Com LLB'],
      facilities: ['Hostel', 'Library', 'Moot Court', 'Wifi'],
      ranking: 3,
      fees: 85000,
      admissionProcess: 'CLAT',
      contactInfo: '+91-9876543215'
    }
  ];

  const allCourses = [...new Set(colleges.flatMap(college => college.courses))];
  const allLocations = [...new Set(colleges.map(college => college.location.split(', ')[1]))];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCourse = !selectedCourse || college.courses.some(course => course.includes(selectedCourse));
    const matchesLocation = !selectedLocation || college.location.includes(selectedLocation);
    
    return matchesSearch && matchesCourse && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation currentPage="colleges" onNavigate={onNavigate} userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
            College <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Directory</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover government colleges and universities that match your career aspirations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search colleges, courses, or locations..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Courses</option>
                  {allCourses.slice(0, 10).map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All States</option>
                  {allLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing <span className="text-blue-400 font-semibold">{filteredColleges.length}</span> colleges
            {userProfile?.location && ` near ${userProfile.location}`}
          </p>
        </div>

        {/* College Cards */}
        <div className="grid gap-6">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                {/* College Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-poppins font-semibold text-white mb-2">{college.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-300 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">Rank #{college.ranking}</span>
                        <span className="text-gray-400">• Govt. College</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">₹{college.fees.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Annual Fees</div>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Available Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.courses.map((course, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.facilities.map((facility, index) => (
                        <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Admission Process */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-2">Admission Process</h4>
                    <p className="text-gray-300">{college.admissionProcess}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="lg:w-48 space-y-3">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                  <button className="w-full py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300">
                    Save to Tracker
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{college.contactInfo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No colleges found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};