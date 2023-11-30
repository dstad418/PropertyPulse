// This shows the toggleable star!
import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface FavoriteStarProps {
  isFavorited: boolean;
  onToggle: () => void;
}

const FavoriteStar: React.FC<FavoriteStarProps> = ({ isFavorited, onToggle }) => (
  <div className="favorite-icon" onClick={onToggle} role="button" tabIndex={0}>
    {isFavorited ? <StarIcon className="animate-bounce" style={{ color: 'yellow' }} /> : <StarBorderIcon />}
  </div>
);

export default FavoriteStar;