import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Dashboard from './Dashboard';
import Patients from './Patients';
import Reports from './Reports';
import Setting from './Setting';


const HealthcareDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard/>;
      case 'patients':
        return <Patients/>;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Setting />;
      default:
        return <Dashboard/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onTabChange={handleTabChange} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HealthcareDashboard;