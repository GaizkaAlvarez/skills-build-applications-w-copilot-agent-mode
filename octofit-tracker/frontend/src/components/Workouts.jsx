import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchFromAPI, postToAPI, deleteFromAPI } from '../api';
import './Workouts.css';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    userId: '',
    name: '',
    exercises: '',
    duration: '',
    difficulty: 'Medium',
  });

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFromAPI(API_ENDPOINTS.workouts);
      // Handle both array and paginated responses
      const workoutList = Array.isArray(data) ? data : data.workouts || data.data || [];
      setWorkouts(workoutList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.userId) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const workoutData = {
        ...newWorkout,
        exercises: newWorkout.exercises
          .split(',')
          .map((ex) => ex.trim())
          .filter((ex) => ex),
        duration: parseInt(newWorkout.duration),
      };
      await postToAPI(API_ENDPOINTS.workouts, workoutData);
      setNewWorkout({
        userId: '',
        name: '',
        exercises: '',
        duration: '',
        difficulty: 'Medium',
      });
      await loadWorkouts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteFromAPI(`${API_ENDPOINTS.workouts}/${workoutId}`);
        await loadWorkouts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="workouts-container">
      <h1>💪 Workouts</h1>

      <form onSubmit={handleAddWorkout} className="workout-form">
        <input
          type="text"
          placeholder="User ID"
          value={newWorkout.userId}
          onChange={(e) => setNewWorkout({ ...newWorkout, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Workout Name"
          value={newWorkout.name}
          onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Exercises (comma-separated)"
          value={newWorkout.exercises}
          onChange={(e) => setNewWorkout({ ...newWorkout, exercises: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newWorkout.duration}
          onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
        />
        <select
          value={newWorkout.difficulty}
          onChange={(e) => setNewWorkout({ ...newWorkout, difficulty: e.target.value })}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button type="submit">Add Workout</button>
      </form>

      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && workouts.length === 0 && <p>No workouts found</p>}

      <div className="workouts-list">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <h3>{workout.name}</h3>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Duration: {workout.duration} minutes</p>
            {workout.exercises && workout.exercises.length > 0 && (
              <p>Exercises: {workout.exercises.join(', ')}</p>
            )}
            <button onClick={() => handleDeleteWorkout(workout._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
