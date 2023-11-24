import { useState, useEffect } from 'react';
//import { buildingsData } from './buildingData';
import '../../css/property-report-css/BuildingList.css';
import fetchMenuInfo, { Property } from './propertyMenuFunctions';
import { Link } from 'react-router-dom';
import FavoriteStar from '../utility-components/FavoriteStar';
import { useFavorites } from '../utility-components/FavoritesContext';



//Function that renders the list of buildings with their status, count of issues, and latest entry
function PropertyMenu() {
    // useState that will contain an object that has the property info..
    const [propertyDetails, setPropertyDetails] = useState<Property[]>([]);
    const { favorites, toggleFavorite } = useFavorites();

    // retrieves the list of properties that will populate the menu
    useEffect(() => {
        const getProperties = async () => { await fetchMenuInfo(setPropertyDetails);}
        getProperties();
    },[]);

    return (
        <div className="building-list justify-around  m-50 flex flex-wrap">
            {
                propertyDetails.map((element) => (
                <div className='building-card m-5 flex shadow hover:shadow-lg flex-initial p-5 rounded-lg bg-green-900 max-w-100'>
                    <Link key={element.acronym} to={`/property/${element.acronym}`}>
                    <div key={element.acronym} className='propertyCard'>
                        <h1>{element.acronym}</h1>
                        <p>{element.description}</p>
                        <div className='statusSection'>
                            <p>Status: {element.status}</p>
                            <p>Active Issues: {element.issues}</p>
                            <p>Latest: {element.mostRecent}</p>   
                        </div>
                    </div>
                    </Link>
                    <FavoriteStar
                        isFavorited={favorites[element.acronym]}
                        onToggle={() => toggleFavorite(element.acronym)}
                    />
                </div>
            ))}
        </div>
    );
}

export default PropertyMenu;