import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🏋️ OctoFit Tracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              👥 Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teams" className="nav-link">
              🏆 Teams
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activities" className="nav-link">
              🏃 Activities
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/workouts" className="nav-link">
              💪 Workouts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">
              🏅 Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
