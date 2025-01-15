import { Link } from 'react-router-dom';
import '../../styles/Header.css';
import '../../styles/buttons.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-container">
          <img src="/public/smart-steps-logo.svg" alt="Smart Steps Logo" className="logo-icon" />
          <div className="logo-text">
            <span>Teach</span><br/>
            <span className="orange-text">Smart Steps</span>
          </div>
        </Link>
        
        <div className="auth-buttons">
          <button className="btn-primary">
            Sign In
          </button>
          <button className="btn-secondary">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 