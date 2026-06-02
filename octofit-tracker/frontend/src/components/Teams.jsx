import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchFromAPI, postToAPI, deleteFromAPI } from '../api';
import './Teams.css';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFromAPI(API_ENDPOINTS.teams);
      // Handle both array and paginated responses
      const teamList = Array.isArray(data) ? data : data.teams || data.data || [];
      setTeams(teamList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading teams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeam.name) {
      alert('Please enter a team name');
      return;
    }

    try {
      await postToAPI(API_ENDPOINTS.teams, newTeam);
      setNewTeam({ name: '', description: '' });
      await loadTeams();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteFromAPI(`${API_ENDPOINTS.teams}/${teamId}`);
        await loadTeams();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="teams-container">
      <h1>🏆 Teams</h1>

      <form onSubmit={handleAddTeam} className="team-form">
        <input
          type="text"
          placeholder="Team Name"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTeam.description}
          onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
        />
        <button type="submit">Add Team</button>
      </form>

      {loading && <p>Loading teams...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && teams.length === 0 && <p>No teams found</p>}

      <div className="teams-list">
        {teams.map((team) => (
          <div key={team._id} className="team-card">
            <h3>{team.name}</h3>
            {team.description && <p>{team.description}</p>}
            <button onClick={() => handleDeleteTeam(team._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
