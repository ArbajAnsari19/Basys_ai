import React, { useState } from 'react';
import { Home, Users, FileText, Settings } from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <h2 className="text-3xl font-bold mb-6 text-black">Basys.ai</h2>
      <nav>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left p-2 rounded-lg transition-colors duration-150 ease-in-out ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;