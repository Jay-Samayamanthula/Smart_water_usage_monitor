import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { Droplets, AlertTriangle, LineChart as ChartIcon, Settings, Bell, Sun, Moon, Smartphone, Monitor, LogOut, ShowerHead as Shower, Droplet, ThermometerSun, Timer } from 'lucide-react';
import toast from 'react-hot-toast';
import { SensorData, Alert, Recommendation, User, WaterUsageStats, WaterQuality, UsageByDevice } from '../types';

const mockSensorData: SensorData[] = [
  { id: '1', type: 'flow', value: 2.5, timestamp: '2024-03-10T10:00:00', location: 'Main Line', status: 'normal' },
  { id: '2', type: 'turbidity', value: 1.2, timestamp: '2024-03-10T10:00:00', location: 'Main Line', status: 'warning' },
  { id: '3', type: 'ph', value: 7.1, timestamp: '2024-03-10T10:00:00', location: 'Main Line', status: 'normal' },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'leak',
    message: 'Potential leak detected in kitchen pipeline',
    severity: 'high',
    timestamp: '2024-03-10T09:45:00',
    isRead: false,
  },
  {
    id: '2',
    type: 'quality',
    message: 'pH levels slightly above normal range',
    severity: 'medium',
    timestamp: '2024-03-10T10:15:00',
    isRead: false,
  },
];

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Install Water-Efficient Fixtures',
    description: 'Replace old faucets with water-efficient models',
    potentialSavings: 15000,
    difficulty: 'medium',
    implemented: false,
  },
  {
    id: '2',
    title: 'Fix Dripping Faucets',
    description: 'Repair leaking faucets in bathroom and kitchen',
    potentialSavings: 5000,
    difficulty: 'easy',
    implemented: false,
  },
];

const usageData = [
  { time: '00:00', usage: 120, predicted: 115 },
  { time: '04:00', usage: 80, predicted: 85 },
  { time: '08:00', usage: 250, predicted: 240 },
  { time: '12:00', usage: 180, predicted: 185 },
  { time: '16:00', usage: 310, predicted: 300 },
  { time: '20:00', usage: 190, predicted: 195 },
];

const mockWaterUsageStats: WaterUsageStats = {
  daily: 450,
  weekly: 3150,
  monthly: 13500,
  yearlyAverage: 162000,
  previousDay: 480,
  change: -6.25
};

const mockWaterQuality: WaterQuality = {
  ph: 7.1,
  turbidity: 1.2,
  chlorine: 0.5,
  temperature: 20.5,
  lastUpdated: '2024-03-10T10:30:00'
};

const mockUsageByDevice: UsageByDevice[] = [
  { device: 'Shower', usage: 150, percentage: 33.33 },
  { device: 'Toilet', usage: 100, percentage: 22.22 },
  { device: 'Washing Machine', usage: 90, percentage: 20 },
  { device: 'Dishwasher', usage: 60, percentage: 13.33 },
  { device: 'Faucets', usage: 50, percentage: 11.11 }
];

const weeklyUsage = [
  { day: 'Mon', usage: 450 },
  { day: 'Tue', usage: 480 },
  { day: 'Wed', usage: 420 },
  { day: 'Thu', usage: 460 },
  { day: 'Fri', usage: 440 },
  { day: 'Sat', usage: 500 },
  { day: 'Sun', usage: 400 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogin = () => {
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe'
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    toast.success('Successfully logged in!');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    toast.success('Successfully logged out!');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(`Switched to ${darkMode ? 'light' : 'dark'} mode`);
  };

  const toggleView = () => {
    setIsMobileView(!isMobileView);
    toast.success(`Switched to ${isMobileView ? 'desktop' : 'mobile'} view`);
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex items-center justify-center`}>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Smart Water Monitor</h2>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login with Demo Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} 
      ${isMobileView ? 'max-w-md mx-auto' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">Smart Water Monitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>
              <button 
                onClick={toggleView}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isMobileView ? "Switch to Desktop View" : "Switch to Mobile View"}
              >
                {isMobileView ? <Monitor className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="h-6 w-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('sensors')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'sensors'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Sensors
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'analytics'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Section */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Daily Usage Stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Daily Usage</h3>
                <Timer className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold">{mockWaterUsageStats.daily} L</div>
              <div className={`text-sm ${mockWaterUsageStats.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockWaterUsageStats.change}% vs yesterday
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Weekly</div>
                  <div className="font-semibold">{mockWaterUsageStats.weekly}L</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Monthly</div>
                  <div className="font-semibold">{mockWaterUsageStats.monthly}L</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Yearly Avg</div>
                  <div className="font-semibold">{mockWaterUsageStats.yearlyAverage}L</div>
                </div>
              </div>
            </div>

            {/* Water Quality */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Water Quality</h3>
                <Droplet className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">pH Level</span>
                  <span className="font-semibold">{mockWaterQuality.ph}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Turbidity</span>
                  <span className="font-semibold">{mockWaterQuality.turbidity} NTU</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Chlorine</span>
                  <span className="font-semibold">{mockWaterQuality.chlorine} mg/L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Temperature</span>
                  <span className="font-semibold">{mockWaterQuality.temperature}°C</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Last updated: {new Date(mockWaterQuality.lastUpdated).toLocaleTimeString()}
              </div>
            </div>

            {/* Usage by Device */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Usage by Device</h3>
                <Shower className="h-6 w-6 text-blue-500" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockUsageByDevice}
                      dataKey="usage"
                      nameKey="device"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {mockUsageByDevice.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Usage Trend */}
            <div className="col-span-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Weekly Usage Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="day" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <YAxis 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: darkMode ? '#F3F4F6' : '#111827'
                      }}
                    />
                    <Bar dataKey="usage" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Active Alerts</h3>
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              {mockAlerts.map(alert => (
                <div key={alert.id} className="mb-2 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">{alert.message}</div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-300">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Recommendations</h3>
                <ChartIcon className="h-6 w-6 text-green-500" />
              </div>
              {mockRecommendations.map(rec => (
                <div key={rec.id} className="mb-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
                  <div className="font-medium text-green-800 dark:text-green-200">{rec.title}</div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    Potential savings: {rec.potentialSavings}L/year
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sensors Section */}
        {activeTab === 'sensors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSensorData.map(sensor => (
              <div key={sensor.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">
                    {sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} Sensor
                  </h3>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      sensor.status === 'normal'
                        ? 'bg-green-500'
                        : sensor.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
                <div className="text-3xl font-bold">{sensor.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{sensor.location}</div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Predictive Analysis</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="time" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <YAxis 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: darkMode ? '#F3F4F6' : '#111827'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Actual Usage"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Predicted Usage"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}