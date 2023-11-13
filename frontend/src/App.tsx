import { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/utility-components/NavBar';
import HomePage from './components/webpages/HomePage';
import CalendarPage from './components/webpages/CalendarPage';
import PropertyReport from './components/webpages/PropertyReport';
import { LightDarkMode } from './components/utility-components/ThemeContext';
import { FavoriteStarContext } from './components/utility-components/FavoritesContext';

const App: FC = () => {
  return (
    <Router>
      <LightDarkMode>
        <FavoriteStarContext>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/propertyreport"
              element={<PropertyReport />}
            />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </FavoriteStarContext>
      </LightDarkMode>
    </Router>
  );
};

export default App;
