import { useState, useEffect } from 'react';
import { buildingsData } from './buildingData';
import '../../css/property-report-css/BuildingList.css';
import FavoriteStar from '../utility-components/FavoriteStar';
import { useFavorites } from '../utility-components/FavoritesContext';
import { supabase } from '../../db/supabase';

function BuildingList() {
    const [buildingDetails, setBuildingDetails] = useState({});
    const [expandedBuildingId, setExpandedBuildingId] = useState<number | null>(null);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            // Fetching Property Menu Data
            const response = await supabase.from('propertymenudata')
            .select('*')
            .order('acronym',{ascending: true} );

            // Fetching the Latest Issue Type
            const response2 = await supabase.from('latestentry')
            .select('*')
            .order('acronym',{ascending: true} );

            const latestIssues: object[] = response2.data.map((issue: { acronym:string, issue:string, ent_date:string}) => {
                return { 
                    acronym: issue.acronym,
                    issue: issue.craft_code,
                    ent_date: issue.ent_date
                };
            });

            // From the Response build an array of objects holding the building information
            const extractedBuildings: object[] = response.data.map((item: { acronym:string, description:string, issues:number, status:string, mostRecent:string }) => {
                return {
                  acronym: item.acronym,
                  description: item.description.split('- ')[1],
                  issues: item.issues,
                  status: item.status,
                  mostRecent: (() => {
                    const recentIssue = latestIssues.find(obj => obj.acronym === item.acronym);
                    if (recentIssue) {
                      return `${recentIssue.issue} ${recentIssue.ent_date}`;
                    } else {
                      return 'Error or no recent issues?';
                    }
                  })(),
                };
              });

              console.log(extractedBuildings);

            // Set building details in state
            setBuildingDetails(extractedBuildings);

        };

        fetchBuildingDetails();
    }, []);

    useEffect(() => {
        // Load favorites from local storage when component mounts
        const storedFavorites = localStorage.getItem('PropertyPulse_favorites');
        if (storedFavorites) {
            // Set the favorites in context
            toggleFavorite(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        // Update local storage when favorites change
        localStorage.setItem('PropertyPulse_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleBuildingClick = (id) => {
        // Toggles between null and the current id (in buildingData)!
        // If the same building is clicked twice, it will collapse
        setExpandedBuildingId(expandedBuildingId === id ? null : id);
    };

    return (
        <div className="building-list">
            {buildingsData.map((building) => (
                <div key={building.id} className={`building-list-item ${expandedBuildingId === building.id ? 'expanded' : ''}`}>
                    <div className="building-summary" onClick={() => handleBuildingClick(building.id)}>
                        <img src={building.image} alt={building.name} className="building-image" />
                        <div className="building-info">
                            <h2>{building.name}</h2>
                            {/* Uncomment out once API is in place */}
                            <p>Status: {buildingDetails[building.id]?.status || 'Loading...'}</p>
                            <p>Active Issues: {buildingDetails[building.id]?.issues || 'Loading...'}</p>
                            <p>Most Recent: {buildingDetails[building.id]?.mostRecent || 'Loading...'}</p>
                        </div>
                        <FavoriteStar
                            isFavorited={favorites[building.id]}
                            onToggle={() => toggleFavorite(building.id)}
                        />
                    </div>
                    {expandedBuildingId === building.id && (
                        <div className="expanded-info">
                            <div className="extra-tile green-tile">Current Active Issues Content</div>
                            <div className="extra-tile pink-tile">All Work Issues/Donut Graph Content</div> {/* Insert DonutChart.tsx here */}
                            <div className="extra-tile yellow-tile">Fiscal Year Issues Trends Content</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BuildingList;
