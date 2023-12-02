import { FC, useState, useEffect } from 'react';
import BuildingComponent from '../utility-components/BuildingComponent';
import '../../css/mainpage-css/MainMap.css';
import { useTheme } from '../utility-components/ThemeContext';
import HeatMapComponent from './HeatMapComponent';
import RevisedCampusMap from './src/assets/Maps/RevisedCampusMap.svg';
import React from 'react';

type Building = {
	id: number;
	name: string;
};

// Moving this data out, so it's not re-rendered on every render.
const PSU_Campus_Buildings: Building[] = [
	{ id: 0, name: 'Academic and Student Recreation Center' },
	{ id: 1, name: 'Art Building and Art Annex' },
	{ id: 2, name: 'Blackstone Residence Hall' },
	{ id: 3, name: 'Blumel Bicycle Garage' },
	{ id: 4, name: 'Blumel Residence Hall' },
	{ id: 5, name: 'Broadway Residence Hall' },
	{ id: 6, name: 'Campus Public Safety' },
	{ id: 7, name: 'Corbett Building' },
	{ id: 8, name: 'Cramer Hall' },
	{ id: 9, name: 'East Hall' },
	{ id: 10, name: 'Engineering Building' },
	{ id: 11, name: 'Fariborz Maseeh Hall' },
	{ id: 12, name: 'Fifth Avenue Cinema' },
	{ id: 13, name: 'Fourth Avenue Building' },
	{ id: 14, name: 'George Hoffmann Hall' },
	{ id: 15, name: 'Harder House' },
	{ id: 16, name: 'Helen Gordon Child Development Center' },
	{
		id: 17,
		name: 'Indigenous Traditional Ecological & Cultural Knowledge Center',
	},
	{ id: 18, name: 'Karl Miller Center' },
	{ id: 19, name: 'King Albert Residence Hall' },
	{ id: 20, name: 'Lincoln Hall' },
	{ id: 21, name: 'Millar Library' },
	{ id: 22, name: 'Millar Library Bicycle Garage' },
	{ id: 23, name: 'Montgomery Residence Hall' },
	{ id: 24, name: 'Native American Student and Community Center' },
	{ id: 25, name: 'Ondine Residence Hall' },
	{ id: 26, name: 'Parking Structure 1' },
	{ id: 27, name: 'Parking Structure 2' },
	{ id: 28, name: 'Parking Structure 3' },
	{ id: 29, name: 'Parkmill' },
	{ id: 30, name: 'Parkway Residence Hall' },
	{ id: 31, name: 'Peter Stott Center and Viking Pavilion' },
	{ id: 32, name: 'Research Greenhouse' },
	{ id: 33, name: 'Richard and Maurine Neuberger Center' },
	{ id: 34, name: 'Robertson Life Sciences Building' },
	{ id: 35, name: 'Saint Helens Residence Hall' },
	{ id: 36, name: 'Science and Education Center' },
	{ id: 37, name: 'Science Building One' },
	{ id: 38, name: 'Science Research and Teaching Center' },
	{ id: 39, name: 'Shattuck Hall' },
	{ id: 40, name: 'Simon Benson House' },
	{ id: 41, name: 'Smith Memorial Student Union' },
	{ id: 42, name: 'Stephen Epler Residence Hall' },
	{ id: 43, name: 'University Center Building' },
	{ id: 44, name: 'University Honors' },
	{ id: 45, name: 'University Place Hotel' },
	{ id: 46, name: 'University Pointe' },
	{ id: 47, name: 'University Services Building' },
	{ id: 48, name: 'Urban Center Building' },
	{ id: 49, name: 'Vanport Building' },
	{ id: 50, name: 'West Heating Plant' },
];

const MainMap: FC = () => {
	const { theme } = useTheme();
	const [favorites, setFavorites] = useState<Building[]>([]);
	const [selectedBuilding, setSelectedBuilding] =
		useState<Building | null>(null);

	const toggleFavorite = (building: Building) => {
		if (favorites.find((fav) => fav.id === building.id)) {
			setFavorites(
				favorites.filter((fav) => fav.id !== building.id)
			);
		} else {
			setFavorites([...favorites, building]);
		}
	};

	const handleBuildingClick = (building: Building) => {
		setSelectedBuilding(building);
	};

	useEffect(() => {
		// Potential D3 code to attach event listeners on SVG map
	}, []);

	return (
		<div className={`${theme}-theme`}>
			<div id="map-container" className={`${theme}-theme`}>
				<HeatMapComponent svgPath={RevisedCampusMap} />
			</div>

			{/* 
        
        This should render each building area as a separate clickable element, but this needs to be done once the map is interactive! 
        Right now, it just creates a list of buildings under the map component.

        {PSU_Campus_Buildings.map((building) => (
            <BuildingComponent 
            key={building.id}
            building={building}
            onBuildingClick={handleBuildingClick}
            onToggleFavorite={toggleFavorite}
            />
        ))}
        */}

			{/* INFO WINDOW FOR SELECTED BUILDING */}
			{selectedBuilding && (
				<div className={`${theme}-theme`}>
					{/*<h3>{selectedBuilding.name}</h3>*/}
					{/* Other info here */}
					{/* 
                On click we talked about:
                - Incident count
                - Incident time
                - Avg incident status
                - Incident work
                - Priority/average priority
            */}
				</div>
			)}

			{/* 'Favorites' logic, once I get it implemented.
        <div>
          {favorites.map((fav) => (
            <div key={fav.id}>{fav.name}</div>
          ))}
        </div>
        */}
		</div>
	);
};

export default MainMap;
