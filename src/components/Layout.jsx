import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import * as Auth from "../context/AuthContext";
import "./AppLayout.css";
import "../pages/Pages.css";

const Icon = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const DashIcon = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </Icon>
);
const TxIcon = () => (
  <Icon>
    <path d="M17 3l4 4-4 4" />
    <path d="M3 7h18" />
    <path d="M7 21l-4-4 4-4" />
    <path d="M21 17H3" />
  </Icon>
);
const WalletIcon = () => (
  <Icon>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </Icon>
);
const LogoutIcon = () => (
  <Icon>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);

const HomeIcon = () => (
  <Icon>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);

const linkClass = ({ isActive }) => "app-link" + (isActive ? " active" : "");

export default function Layout() {
  const navigate = useNavigate();
  const auth = (Auth.useAuth ? Auth.useAuth() : null) || {};
  const name = auth.user?.name || "";

  const logout = () => {
    if (typeof auth.logout === "function") auth.logout();
    else localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="app-top">
        <Link to="/" className="app-brand">
          <span className="app-brand-logo"><WalletIcon /></span>
          Budget Buddy
        </Link>
        <div className="app-user">
          <span>Hi, {name || "there"}</span>
          <button className="app-logout" onClick={logout}><LogoutIcon /> Logout</button>
        </div>
      </header>
      <div className="app-body">
        <nav className="app-side">
          <NavLink to="/" end className={linkClass}><HomeIcon /> Home</NavLink>
          <NavLink to="/dashboard" className={linkClass}><DashIcon /> Dashboard</NavLink>
          <NavLink to="/transactions" className={linkClass}><TxIcon /> Transactions</NavLink>
        </nav>
        <main className="app-content content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

