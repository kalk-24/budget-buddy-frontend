import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import * as Auth from "../context/AuthContext";
import "./PublicLayout.css";

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const WalletIcon = ({ size }) => (
  <Icon size={size}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </Icon>
);
const HomeIcon = () => (
  <Icon>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);
const InfoIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Icon>
);
const MailIcon = () => (
  <Icon>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </Icon>
);
const LoginIcon = () => (
  <Icon>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </Icon>
);
const LogoutIcon = () => (
  <Icon>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);
const UserPlusIcon = () => (
  <Icon>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </Icon>
);
const DashIcon = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </Icon>
);

const linkClass = ({ isActive }) => "pnav-link" + (isActive ? " active" : "");

export default function PublicLayout() {
  const navigate = useNavigate();
  const auth = (Auth.useAuth ? Auth.useAuth() : null) || {};

  let loggedIn = Boolean(auth.user || auth.token);
  if (!loggedIn) {
    try {
      loggedIn = Object.keys(localStorage).some((k) => k.toLowerCase().includes("token"));
    } catch {
      loggedIn = false;
    }
  }

  const logout = () => {
    if (typeof auth.logout === "function") {
      auth.logout();
      navigate("/login");
    } else {
      localStorage.clear();
      window.location.assign("/login");
    }
  };

  return (
    <div>
      <header className="pnav-wrap">
        <div className="pnav">
          <Link to="/" className="pnav-brand">
            <span className="pnav-logo"><WalletIcon size={22} /></span>
            <span className="pnav-name">Budget Buddy</span>
          </Link>
          <nav className="pnav-links">
            <NavLink to="/" end className={linkClass}><HomeIcon /><span className="pnav-text">Home</span></NavLink>
            <NavLink to="/about" className={linkClass}><InfoIcon /><span className="pnav-text">About</span></NavLink>
            <NavLink to="/contact" className={linkClass}><MailIcon /><span className="pnav-text">Contact</span></NavLink>
            <span className="pnav-sep" />
            {loggedIn ? (
              <>
                <button className="pnav-link" onClick={logout} style={{ border: 0, background: "transparent", cursor: "pointer", font: "inherit", fontWeight: 600 }}>
                  <LogoutIcon /><span className="pnav-text">Logout</span>
                </button>
                <Link to="/dashboard" className="pnav-btn"><DashIcon /><span>Dashboard</span></Link>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}><LoginIcon /><span className="pnav-text">Login</span></NavLink>
                <Link to="/register" className="pnav-btn"><UserPlusIcon /><span>Register</span></Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="pfoot">Budget Buddy &middot; Built with React, Node.js and MongoDB</footer>
    </div>
  );
}
