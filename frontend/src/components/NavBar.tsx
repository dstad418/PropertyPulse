import { FC, useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import './../css/NavBar.css';
import { useTheme } from '../context/ThemeContext';

const NavBar: FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        document.body.className = `${theme}-theme`;
    }, [theme]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
        <div className={`navbar ${theme}-theme`}>
            <button className="hamburger" onClick={toggleMenu}>☰</button>
            <h1>PSU Maintenance Map</h1>
            <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
        {showMenu && (
            <div className="menu-container" onClick={toggleMenu}>
            <div className={`menu ${theme}-theme`} onClick={e => e.stopPropagation()}>
                <SideMenu />
            </div>
            <div className="menu-dim-background" onClick={toggleMenu}></div>
            </div>
        )}
        </>
    );
};

export default NavBar;