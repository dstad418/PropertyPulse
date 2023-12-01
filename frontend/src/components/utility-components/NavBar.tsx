import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import '../../css/utility-css/NavBar.css';
import { useTheme } from './ThemeContext';
import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
		navigate('/propertyreport');
	};

	const navigateToCalendarPage = () => {
		navigate('/calendar');
	};

	const openSettingsModal = () => {
		setIsSettingsModalOpen(true);
	};

	const closeSettingsModal = () => {
		setIsSettingsModalOpen(false);
	};

	return (
		<>
			<div className={`navbar ${theme}-theme`}>
				<div className="left-container">
					<button
						className="home-icon"
						onClick={navigateToHome}
						aria-label="Home"
					>
						<HomeIcon />
					</button>
					<button
						className="property-report"
						onClick={navigateToPropertyReport}
						aria-label="Property Report"
					>
						<ApartmentIcon />
					</button>
					<button
						className="calendar-icon"
						onClick={navigateToCalendarPage}
						aria-label="Calendar"
					>
						<CalendarMonthIcon />
					</button>
				</div>
				<h1>PSU Maintenance Map</h1>
				<div className="right-container">
					<button
						className="settings-icon"
						onClick={openSettingsModal}
						aria-label="Settings"
					>
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
