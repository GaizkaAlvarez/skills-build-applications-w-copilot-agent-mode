import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchFromAPI, postToAPI, deleteFromAPI } from '../api';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFromAPI(API_ENDPOINTS.users);
      // Handle both array and paginated responses
      const userList = Array.isArray(data) ? data : data.users || data.data || [];
      setUsers(userList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await postToAPI(API_ENDPOINTS.users, newUser);
      setNewUser({ name: '', email: '' });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteFromAPI(`${API_ENDPOINTS.users}/${userId}`);
        await loadUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="users-container">
      <h1>👥 Users</h1>
      
      <form onSubmit={handleAddUser} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && users.length === 0 && <p>No users found</p>}

      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
