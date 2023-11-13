import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ClearIcon from '@mui/icons-material/Clear'; // You can import an icon for clearing cache, this is just a placeholder
import PrintIcon from '@mui/icons-material/Print'; // Import an icon for printing
import '../../css/utility-css/SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  theme: string;
  resetFavorites: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  toggleTheme,
  theme,
  resetFavorites,
}) => {
  if (!isOpen) return null;

  const clearCache = () => {
    // Clear the specific keys from local storage, both filters, selectedOptions from the Mainpage and favorite buildings from PropertyList
    localStorage.removeItem('favorites');
    localStorage.removeItem('selectedOptions');
    localStorage.removeItem('filters');
    resetFavorites();
  };

  const printScreen = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-item">
          <span>Theme</span>
          <button onClick={toggleTheme}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </div>
        <div className="modal-item">
          <span>Clear Cache</span>
          <button onClick={clearCache}>
            <ClearIcon />
          </button>
        </div>
        <div className="modal-item">
          <span>Print Screen</span>
          <button onClick={printScreen}>
            <PrintIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
