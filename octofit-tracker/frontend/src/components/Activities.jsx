import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchFromAPI, postToAPI, deleteFromAPI } from '../api';
import './Activities.css';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    userId: '',
    type: '',
    duration: '',
    distance: '',
    calories: '',
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFromAPI(API_ENDPOINTS.activities);
      // Handle both array and paginated responses
      const activityList = Array.isArray(data) ? data : data.activities || data.data || [];
      setActivities(activityList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newActivity.type || !newActivity.duration || !newActivity.userId) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const activityData = {
        ...newActivity,
        duration: parseInt(newActivity.duration),
        ...(newActivity.distance && { distance: parseFloat(newActivity.distance) }),
        ...(newActivity.calories && { calories: parseInt(newActivity.calories) }),
      };
      await postToAPI(API_ENDPOINTS.activities, activityData);
      setNewActivity({ userId: '', type: '', duration: '', distance: '', calories: '' });
      await loadActivities();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteFromAPI(`${API_ENDPOINTS.activities}/${activityId}`);
        await loadActivities();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="activities-container">
      <h1>🏃 Activities</h1>

      <form onSubmit={handleAddActivity} className="activity-form">
        <input
          type="text"
          placeholder="User ID"
          value={newActivity.userId}
          onChange={(e) => setNewActivity({ ...newActivity, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type (e.g., Running)"
          value={newActivity.type}
          onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newActivity.duration}
          onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={newActivity.distance}
          onChange={(e) => setNewActivity({ ...newActivity, distance: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories"
          value={newActivity.calories}
          onChange={(e) => setNewActivity({ ...newActivity, calories: e.target.value })}
        />
        <button type="submit">Add Activity</button>
      </form>

      {loading && <p>Loading activities...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && activities.length === 0 && <p>No activities found</p>}

      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity._id} className="activity-card">
            <h3>{activity.type}</h3>
            <p>Duration: {activity.duration} minutes</p>
            {activity.distance && <p>Distance: {activity.distance} km</p>}
            {activity.calories && <p>Calories: {activity.calories}</p>}
            <button onClick={() => handleDeleteActivity(activity._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
