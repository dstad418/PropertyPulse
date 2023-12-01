//Travis Block

/*This component is the property menu, one of the primary pages of the application.
Once the data is processed property information will be populated and give the user the ability to
go to each properties dashboard for more details related to the building itself.
*/

import { useState, useEffect } from 'react';
//import { buildingsData } from './buildingData';
import '../../css/property-report-css/BuildingList.css';
import fetchMenuInfo, { Property } from './src/propertyMenuFunctions';
import { Link } from 'react-router-dom';
//import FavoriteStar from '../utility-components/FavoriteStar';
//import { useFavorites } from '../utility-components/FavoritesContext';



//Function that renders the list of buildings with their status, count of issues, and latest entry
function PropertyMenu() {
    // useState that will contain an object that has the property info..
    const [propertyDetails, setPropertyDetails] = useState<Property[]>([]);

    // not implementing since I do not have time to refactor the code to make it work.
    //const { favorites, toggleFavorite } = useFavorites();

    // retrieves the list of properties that will populate the menu
    useEffect(() => {
        const getProperties = async () => { await fetchMenuInfo(setPropertyDetails);}
        getProperties();
    },[]);

    return (
        <div className="building-list flex-auto justify-evenly" key="building-list" >
            {
                propertyDetails.map((element,index) => (
                <div key={index}className='m-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
                    <Link to={`/property/${element.acronym}`}>
                    <div className='propertyCard'>
                        <h1 className="text-5xl font-extrabold tracking-tigh text-white">{element.acronym}</h1>
                        <p className="text-white">{element.description}</p>
                        <div className='statusSection'>
                            <p className="text-white">Status: {element.status}</p>
                            <p className="text-white">Active Issues: {element.issues}</p>
                            <p className="text-white">Latest: {element.mostRecent}</p>   
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PropertyMenu;