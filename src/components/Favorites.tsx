import React from 'react';
import { useSelector } from 'react-redux';
import { Spell as SpellType } from '../redux/reducers';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: any) => state.favorites.favorites);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((spell: SpellType) => (
          <li key={spell.index}>
            <h3>{spell.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
