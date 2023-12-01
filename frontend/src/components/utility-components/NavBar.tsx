import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import '../../css/utility-css/NavBar.css';
import { useTheme } from './ThemeContext';
import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
//import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';

const NavBar: FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();
	const [isSettingsModalOpen, setIsSettingsModalOpen] =
		useState(false);
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	useEffect(() => {
		document.body.className = `${theme}-theme`;
	}, [theme]);

    const navigateToHome = () => {
        navigate('/'); // Function to navigate to the home page
    };
    
    const navigateToPropertyReport = () => {
        navigate('/buildinglist'); 
    };
    /* Not used as we decided to narrow the scope
    const navigateToCalendarPage = () => {
        navigate('/calendar');
    };
    */
    const openSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };
    
    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    return (
        <>
            <div className='flex justify-between p-4 bg-white border border-gray-200 dark:bg-gray-500 dark:border-gray-700 sticky top-0'>
            <h1 className=" text-4xl italic font-extrabold tracking-tigh text-white" onClick={navigateToHome}>PSU Property Pulse</h1>
                <div className="w-sm shadow-lg bg-white border border-gray-200 rounded-lg shadow p-2 dark:border-gray-700 right-container flex justify-around gap-x-6">
                <button className="home-icon" onClick={navigateToHome} aria-label="Home">
                        <HomeIcon />
                    </button>
                    <button className="property-report" onClick={navigateToPropertyReport} aria-label="Property Report">
                        <ApartmentIcon />
                    </button>
                    <button className="settings-icon" onClick={openSettingsModal}>
                        <SettingsIcon />
                    </button>
                    {showDropDown && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>X</li>
                                <li>Y</li>
                                <li>Z</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <SettingsModal 
                isOpen={isSettingsModalOpen} 
                onClose={closeSettingsModal}
                toggleTheme={() => {}}
                theme={theme}
                resetFavorites={() => {}} 
            />
        </>
    );
};

export default NavBar;
