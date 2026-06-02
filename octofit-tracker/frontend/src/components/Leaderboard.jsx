import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../api';
import './Leaderboard.css';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('weekly');

  useEffect(() => {
    loadLeaderboard();
  }, [period]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = `${API_ENDPOINTS.leaderboard}/${period}`;
      const data = await fetchFromAPI(endpoint);
      // Handle both array and paginated responses
      const leaderboardList = Array.isArray(data) ? data : data.leaderboard || data.data || [];
      setLeaderboard(leaderboardList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>🏅 Leaderboard</h1>

      <div className="period-selector">
        <button
          onClick={() => setPeriod('daily')}
          className={period === 'daily' ? 'active' : ''}
        >
          Daily
        </button>
        <button
          onClick={() => setPeriod('weekly')}
          className={period === 'weekly' ? 'active' : ''}
        >
          Weekly
        </button>
        <button
          onClick={() => setPeriod('monthly')}
          className={period === 'monthly' ? 'active' : ''}
        >
          Monthly
        </button>
      </div>

      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && leaderboard.length === 0 && <p>No leaderboard data found</p>}

      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id} className={index === 0 ? 'first-place' : ''}>
                <td className="rank">{index + 1}</td>
                <td className="user-name">{entry.userName}</td>
                <td className="score">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
