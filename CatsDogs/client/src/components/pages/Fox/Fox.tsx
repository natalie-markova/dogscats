import { useEffect, useState } from 'react';
import Button from '../../button/Button';
import TypeHere from '../../typeHere/TypeHere';
import { addToBlacklist, isBlacklisted } from '../../blacklist/blacklist';
import { $api } from '../../../utils/axios.instance';

const Fox = () => {
  const [fox, setFox] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const loadFox = () => {
    fetch('https://randomfox.ca/floof')
      .then(response => response.json())
      .then(data => {
        if (data.image && isBlacklisted(data.image)) {
          loadFox();
        } else {
          setFox(data);
        }
      })
      .catch(error => console.error('Ошибка:', error));
  };

  useEffect(() => {
    loadFox();
  }, []);

  const handleSubmit = async (comment) => {
    try {
      if (!fox || !fox.image) {
        console.log('Нет картинки для добавления');
        return;
      }
      await $api.post("/favorites", {
        imageURL: fox.image,
        comment: comment,
      });

      setShowInput(false);

      loadFox();

      console.log('Картинка добавлена в избранное!');
    } catch (err) {
      if (err.response) {
        console.log(`Ошибка: ${err.response.data?.error || err.message}`);
      } else if (err.request) {
        console.log("Ошибка: не удалось подключиться к серверу");
      } else {
        console.log(`Ошибка: ${err.message}`);
      }
    }
  };

  function handleClick(type) {
    switch (type) {
      case "like":
        setShowInput(true);
        break;
      case "neutral":
        loadFox();
        break;
      case "dislike":

        if (fox && fox.image) {
          addToBlacklist(fox.image);
        }
        loadFox();
        break;
      default:
        break;
    }
  }

  return (
    <div className="fox-container">
      {fox ? (
        <>
          <h2>Кошки и собаки - зло. Лисички - няшки:</h2>
          <img src={fox.image} className="fox-image" alt="Random Fox" />

          {showInput && (
            <TypeHere
              imageURL={fox.image}
              onSubmit={handleSubmit}
              onCancel={() => setShowInput(false)}
            />
          )}

          {!showInput && <Button handleClick={handleClick} />}
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default Fox;
