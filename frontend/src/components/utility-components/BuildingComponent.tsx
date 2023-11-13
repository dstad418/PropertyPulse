// THIS IS THE GENERAL CODE TO DISPLAY A SINGLE BLOCK OF BUILDING DATA WHEN CLICKED!
import { FC } from 'react';

type Building = {
    id: number;
    name: string;
};

type BuildingComponentProps = {
    building: Building;
    onBuildingClick: (building: Building) => void;
    onToggleFavorite: (building: Building) => void;
};

const BuildingComponent: FC<BuildingComponentProps> = ({ building, onBuildingClick, onToggleFavorite }) => {
    return (
        <div onClick={() => onBuildingClick(building)}>
        {/* This can be an SVG element or any other representation of the building. Tyler mentioned making icons for each building, or an overlay of interactive elements! */}
        <span>{building.name}</span>
        <button onClick={() => onToggleFavorite(building)}>Toggle Favorite</button>
        </div>
    );
};

export default BuildingComponent;
