import { FC } from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import MainMap from './components/MainMap';
import FilterBox from './components/FilterBox'
import { LightDarkMode } from './context/ThemeContext';

const App: FC = () => {
  return (
    <LightDarkMode>
      <NavBar />
      <MainMap />
      <FilterBox />
    </LightDarkMode>
  );
};

export default App;