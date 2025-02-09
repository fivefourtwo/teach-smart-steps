import FloatingSettings from './FloatingSettings';
import FloatingStatus from './FloatingStatus';
import './FloatingMenu.css';

const FloatingMenu = () => {
  return (
    <div className="floating-menu">
        <FloatingSettings />
        <FloatingStatus />
    </div>
  );
};

export default FloatingMenu;