import { useState, useEffect } from 'react';
import '../../css/mainpage-css/FavoriteBuildings.css'
import { buildingsData } from '../property-report-components/buildingData';
import { useFavorites } from '../utility-components/FavoritesContext';
import FavoriteStar from '../utility-components/FavoriteStar';

const FavoriteBuildings = () => {
    const { favorites, toggleFavorite } = useFavorites();
    // Placeholder for assuming we'll save details like this
    const [buildingDetails, setBuildingDetails] = useState({}); 

    useEffect(() => {
        // Mock fetch function or actual API call to get building details from Supabase
        const fetchBuildingDetails = async () => {
            // To be filled in with Travis's DB info
            const response = await fetch('/api/building/details');
            const data = await response.json();
            setBuildingDetails(data);
        };

        fetchBuildingDetails();
    }, []);

    return (
        <ul className="building-list">
            {buildingsData
                .filter((building) => favorites[building.id])
                .map((building) => (
                    <li key={building.id} className="building-list-item">
                        <img src={building.image} alt={building.name} className="building-image" />
                        <div className="building-info">
                            <h2>{building.name}</h2>
                            <p>Status: {/*buildingDetails[building.id]?.status || 'Loading...'*/}</p>
                            <p>Active Issues: {/*buildingDetails[building.id]?.activeIssues || 'Loading...'*/}</p>
                            <p>Most Recent: {/*buildingDetails[building.id]?.mostRecent || 'Loading...'*/}</p>
                        </div>
                        <FavoriteStar
                            isFavorited={favorites[building.id]}
                            onToggle={() => toggleFavorite(building.id.toString())}
                        />
                    </li>
            ))}
        </ul>
    );
};

export default FavoriteBuildings;
