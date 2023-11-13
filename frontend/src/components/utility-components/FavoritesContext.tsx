import React, { createContext, useState, useContext, useEffect } from 'react';

// Context help from W3 Schools!

// Define the shape of the context
interface FavoritesContextProps {
  favorites: { [key: string]: boolean };
  toggleFavorite: (id: string) => void;
  resetFavorites: () => void;
}

// Create the context with a default value
const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: {},
  toggleFavorite: () => {},
  resetFavorites: () => {},
});


export const useFavorites = () => useContext(FavoritesContext);

export const FavoriteStarContext: React.FC = ({ children }) => {
  // Initialize state from local storage!
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  // NOTE: This removes both the favorite buildings AND the checkboxes. 
  // Called from Settings Modal!
  const resetFavorites = () => {
    setFavorites({});
    localStorage.removeItem('favorites');
    localStorage.removeItem('checkboxes');
  };

  // This runs when the state changes
  useEffect(() => {
    // Save favorite buildings to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, resetFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
