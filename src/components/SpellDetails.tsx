import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpells } from '../redux/actions';
import { Spell } from '../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const SpellDetails: React.FC = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const spell = useSelector((state: any) => state.spells.spell);
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSpells(index));
  }, [dispatch, index]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!spell) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{spell.name}</h2>
      <p>Range: {spell.range}</p>
      <p>Duration: {spell.duration}</p>
      <p>Components: {spell.components.join(', ')}</p>
      <p>{spell.desc[0]}</p>
      {spell.higher_level && <p>{spell.higher_level[0]}</p>}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SpellDetails;
