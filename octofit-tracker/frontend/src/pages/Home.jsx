import { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../api';
import './Home.css';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiUrl, setApiUrl] = useState('');
  const [codespaceName, setCodespaceName] = useState('');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const csName = import.meta.env.VITE_CODESPACE_NAME;
      setCodespaceName(csName || 'Not set');

      // Get the API base URL
      const url = API_ENDPOINTS.health.split('/health')[0];
      setApiUrl(url);

      // Check health endpoint
      const response = await fetchFromAPI(API_ENDPOINTS.health);
      if (response.status === 'OK') {
        setApiStatus('✅ Connected to API');
      } else {
        setApiStatus('⚠️ API not responding properly');
      }
    } catch (error) {
      setApiStatus('❌ Cannot connect to API');
      console.error('API check failed:', error);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>🏋️ Welcome to OctoFit Tracker</h1>
        <p className="subtitle">A modern multi-tier fitness tracking application</p>
      </section>

      <section className="status-section">
        <div className="status-card">
          <h2>API Status</h2>
          <p className="status-badge">{apiStatus}</p>
          <p className="api-url">
            <strong>API URL:</strong> <code>{apiUrl}</code>
          </p>
          <p className="codespace-name">
            <strong>Codespace:</strong> <code>{codespaceName}</code>
          </p>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>👥 User Management</h3>
            <p>Create and manage user profiles for team members.</p>
          </div>
          <div className="feature-card">
            <h3>🏆 Teams</h3>
            <p>Organize users into teams and track team progress.</p>
          </div>
          <div className="feature-card">
            <h3>🏃 Activities</h3>
            <p>Log and track fitness activities with metrics.</p>
          </div>
          <div className="feature-card">
            <h3>💪 Workouts</h3>
            <p>Create and manage workout plans with exercises.</p>
          </div>
          <div className="feature-card">
            <h3>🏅 Leaderboard</h3>
            <p>View user rankings and scores across time periods.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Real-time Updates</h3>
            <p>Get instant updates on user activities and scores.</p>
          </div>
        </div>
      </section>

      <section className="tech-stack-section">
        <h2>Technology Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <strong>Frontend:</strong> React 19 + Vite
          </div>
          <div className="tech-item">
            <strong>Backend:</strong> Node.js + Express + TypeScript
          </div>
          <div className="tech-item">
            <strong>Database:</strong> MongoDB
          </div>
          <div className="tech-item">
            <strong>Routing:</strong> React Router DOM
          </div>
          <div className="tech-item">
            <strong>Hosting:</strong> GitHub Codespaces / Localhost
          </div>
        </div>
      </section>

      <section className="getting-started-section">
        <h2>Getting Started</h2>
        <ol>
          <li>Navigate to different sections using the menu above</li>
          <li>Create users, teams, and track activities</li>
          <li>View your performance on the leaderboard</li>
          <li>Monitor your fitness progress over time</li>
        </ol>
      </section>
    </div>
  );
}
