import { useState, useEffect } from "react";
import { $api } from "../../../utils/axios.instance";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [currentFavorite, setCurrentFavorite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await $api.get("/favorites");
      setFavorites(response.data);

      if (response.data.length > 0) {
        showRandomFavorite(response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const showRandomFavorite = (favoritesList = favorites) => {
    if (favoritesList.length === 0) {
      setCurrentFavorite(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * favoritesList.length);
    setCurrentFavorite(favoritesList[randomIndex]);
  };

  const handleNext = () => {
    showRandomFavorite();
  };

  const getImageClassName = (imageURL) => {
    if (!imageURL) return "favorite-image";
    
    if (imageURL.includes("thecatapi.com") || imageURL.includes("cdn2.thecatapi.com")) {
      return "favorite-image cat-picture";
    } else if (imageURL.includes("dog.ceo") || imageURL.includes("images.dog.ceo")) {
      return "favorite-image dog-picture";
    } else if (imageURL.includes("randomfox.ca") || imageURL.includes("randomfox")) {
      return "favorite-image fox-image";
    }
    
    return "favorite-image dog-picture";
  };

  if (loading) {
    return (
      <div className="favorites-container">
        <p>Loading....</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <p>У вас пока нет избранных картинок</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      {currentFavorite ? (
        <>
          <img
            src={currentFavorite.imageURL}
            alt="Избранное"
            className={getImageClassName(currentFavorite.imageURL)}
          />

          {currentFavorite.comment && (
            <div className="favorite-comment">
              <p>
                <strong>Комментарий:</strong>
              </p>
              <p>{currentFavorite.comment}</p>
            </div>
          )}
          <button className="next-button" onClick={handleNext}>
            Следующая картинка
          </button>
        </>
      ) : (
        <p>Нет доступных картинок</p>
      )}
    </div>
  );
}

export default Favorites;