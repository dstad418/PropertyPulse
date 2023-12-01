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
import BuildingMenu from './components/webpages/BuildingMenu';
import { LightDarkMode } from './components/utility-components/ThemeContext';
import { FavoriteStarContext } from './components/utility-components/FavoritesContext';
import { SelectedIssueProvider } from './components/utility-components/SelectedIssueContext.tsx';
import PropertyReport from './components/webpages/PropertyReport';


const App: FC = () => {
  return (
    <Router>
      <LightDarkMode>
        <FavoriteStarContext>
          <SelectedIssueProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buildinglist" element={<BuildingMenu />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/property/:acronym" element={<PropertyReport />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </SelectedIssueProvider>
        </FavoriteStarContext>
      </LightDarkMode>
    </Router>
  );
};

export default App;
