import { FC } from 'react';
import MainMap from '../mainpage-components/MainMap';
import FilterBox from '../mainpage-components/FilterBox';  
import FavoriteBuildings from '../mainpage-components/FavoriteBuildings';

const HomePage: FC = () => {
  return (
    <div className="static">
      <MainMap />
      <FilterBox />
      <FavoriteBuildings />
    </div>
  );
};

export default HomePage;
