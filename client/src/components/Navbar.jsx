import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logoutUser } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function UserDropdown({ user = { name: 'Alex', email: 'alex@example.com' }, onLogout, onMyStories }) {
  return (
    <div className="dropdown">
      <button
        className="btn d-flex align-items-center p-0 border-0 bg-transparent"
        type="button"
        id="userMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center"
          style={{ width: 36, height: 36, fontWeight: 600, backgroundColor: 'var(--orange)' }}
        >
          {(user.name || user.email || 'U').toUpperCase().charAt(0)}
        </div>
      </button>
      <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userMenuButton">
        <li>
          <div className="px-3 py-2">
            <div className="fw-semibold" style={{ lineHeight: 1.1 }}>
              {user.name || 'User'}
            </div>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
              {user.email}
            </div>
          </div>
        </li>
        <li>
          <button className="dropdown-item" onClick={onMyStories}>
            My Stories
          </button>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (_) {
      // ignore
    }
  };

  const handleMyStories = () => {
    navigate('/explore?filter=my');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">True<span>Travel</span>Moments</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/explore">Explore</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <UserDropdown user={{ name: user.name, email: user.email }} onLogout={handleLogout} onMyStories={handleMyStories} />
            ) : (
              <>
                <Link to="/login" className="btn btn-orange">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
