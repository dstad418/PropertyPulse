import React, { useState } from 'react';
import './../css/SideMenu.css';

type Building = {
    id: number;
    name: string;
};

type BuildingData = {
    activeIssues: number;
    noResponse: number;
    activeInProgress: number;
    avgClosure: number;
    oldestProblems: string[];
};

const SideMenu: React.FC = () => {
    const [expandedTile, setExpandedTile] = useState<number | null>(null);
    // THIS WILL BE USED TO FAVORITE TILES.
    const [favoriteTiles, setFavoriteTiles] = useState<{ [key: number]: boolean }>({});
    const [buildingData, setBuildingData] = useState<Record<number, BuildingData>>({});

    const buildings: Building[] = [
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
        { id: 17, name: 'Indigenous Traditional Ecological & Cultural Knowledge Center' },
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
        { id: 50, name: 'West Heating Plant' }
    ];

    {/*
        Toggles expanded status for the tile 
    */}
    const toggleTile = (id: number) => {
        setExpandedTile(expandedTile === id ? null : id);
    };

    {/*
        Got some help here from W3, and a stack overflow comment:
        - Accepts building id
        - uses useState to set favorite
        - uses a functional update to add data while keeping old favorites
        - toggles the favorite status if clicked multiple times.
    */}
    const toggleFavorite = (id: number) => {
        setFavoriteTiles(prevFavorites => ({
        ...prevFavorites,
        [id]: !prevFavorites[id]
        }));
    };

    return (
        <div className="side-menu-container">
        {buildings.map((building) => (
            <div
            key={building.id}
            className={`tile ${expandedTile === building.id ? 'expanded' : ''}`}
            onClick={() => toggleTile(building.id)}
            >
            <div className="tile-header">
                {building.name} 
                <span 
                className={`star ${favoriteTiles[building.id] ? 'favorited' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(building.id);
                }}
                >
                ★
                </span>
            </div>
            {/* Got some help from W3 here */}
            {expandedTile === building.id ? (
                <>
                {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                    <div key={num}>{num}</div>
                ))}
                </>
            ) : (
                <>
                {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
                    <div key={num}>{num}</div>
                ))}
                </>
            )}
            </div>
        ))}
        </div>
    );
};

export default SideMenu;





/*

BELOW IS CODE THAT WILL SERVE US MUCH BETTER. 
I JUST REPLACED FOR THE CODE ABOVE SO THAT I COULD TEST THE 
EXPANSION-WHEN-CLICKED FOR THE TILES:

    const fetchDataForBuilding = async (id: number) => {
        try {
            // TEMP API UNTIL WE GET TYLERS
        const response = await fetch(`https://your-api.com/buildings/${id}`);
        const data = await response.json();
        setBuildingData((prevState) => ({
            ...prevState,
            [id]: data,
        }));
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };

    const toggleTile = (id: number) => {
        if (expandedTile !== id && !buildingData[id]) {
        fetchDataForBuilding(id);
        }
        setExpandedTile(expandedTile === id ? null : id);
    };

    return (
        <div className="side-menu-container">
            {buildings.map((building) => (
                <div
                    key={building.id}
                    className={`tile ${expandedTile === building.id ? 'expanded' : ''}`}
                    onClick={() => toggleTile(building.id)}
                >
                    <div className="tile-header">
                        {building.name}
                        <span 
                            className={`star ${favoriteTiles[building.id] ? 'favorited' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation(); // To prevent the click event from bubbling up
                                toggleFavorite(building.id);
                            }}
                        >
                            ★
                        </span>
                    </div>
                    {expandedTile === building.id && buildingData[building.id] && (
                        <>
                        <div>Current, active mtnce issues: {buildingData[building.id].activeIssues}</div>
                        {/* ... other data fields }
                        </>
                    )}
                </div>
            ))}
        </div>
    );

export default SideMenu;

*/