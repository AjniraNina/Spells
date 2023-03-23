import { Spell } from '../types/types';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const fetchSpellsRequest = (): AnyAction => ({
  type: 'FETCH_SPELLS_REQUEST',
});

export const fetchSpellsSuccess = (spells: Spell[] | Spell): AnyAction => ({
  type: 'FETCH_SPELLS_SUCCESS',
  payload: spells,
});

export const fetchSpellsFailure = (error: string): AnyAction => ({
  type: 'FETCH_SPELLS_FAILURE',
  payload: error,
});

export const addFavorite = (spell: Spell): AnyAction => ({
  type: 'ADD_FAVORITE',
  payload: spell,
});

export const removeFavorite = (spell: Spell): AnyAction => ({
  type: 'REMOVE_FAVORITE',
  payload: spell,
});

export const fetchSpells = (index?: string, page?: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<AnyAction> => {
    if (index) {
      const url = `https://www.dnd5eapi.co/api/spells/${index}`;
      dispatch(fetchSpellsRequest());
      try {
        const response = await axios.get(url);
        const spell = response.data;
        dispatch(fetchSpellsSuccess(spell));
        return fetchSpellsSuccess(spell);
      } catch (error: unknown) {
        const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
        dispatch(fetchSpellsFailure(errorMessage));
        return fetchSpellsFailure(errorMessage);
      }
    } else {
      const url = 'https://www.dnd5eapi.co/api/spells';
      dispatch(fetchSpellsRequest());
      try {
        const response = await axios.get(url);
        const allSpells = response.data.results;
        const startIndex = (page || 1) * 5 - 5;
        const endIndex = startIndex + 5;
        const spells = allSpells.slice(startIndex, endIndex);

        const spellsWithDetails = await Promise.all(
          spells.map(async (spell: Spell) => {
            const details = await axios.get(`https://www.dnd5eapi.co${spell.url}`);
            return details.data;
          })
        );

        dispatch(fetchSpellsSuccess(spellsWithDetails));
        return fetchSpellsSuccess(spellsWithDetails);
      } catch (error: unknown) {
        const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
        dispatch(fetchSpellsFailure(errorMessage));
        return fetchSpellsFailure(errorMessage);
      }
    }
  };
};

