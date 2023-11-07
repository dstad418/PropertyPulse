/*
    This is the light/dark theme that I came up with. It took me an embarrasingly long
    time to get it working, and I had to rely on W3 Schools and a few other websites to get it right.
    
    If you look at App.tsx, you can see how I wrapped the theme around the components, a la React Router
    or a protected route. That wway the parent will have the theme. The themes themselves are in the global
    css file, App.css

    You can access the colors in any css menu by using:
        background/text/whatever-color: var(--prefix-color)
        bg   = body background
        text = text
        menu = any background to a div that has text on it

            --bg-color: white;
            --text-color: black;
            --menu-color: lightgray;
*/

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within LightDarkMode!!!!');
    }
    return context;
};

export const LightDarkMode = ({ children }) => {
    // Default theme
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};