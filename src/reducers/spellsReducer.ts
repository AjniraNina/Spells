import { SpellsState, Action } from '../types/types';

const initialState: SpellsState = {
  spells: [],
  loading: false,
  error: null,
};

const spellsReducer = (state = initialState, action: Action): SpellsState => {
  switch (action.type) {
    case "FETCH_SPELLS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SPELLS_SUCCESS":
      return {
        ...state,
        spells: action.payload,
        loading: false,
      };
    case "FETCH_SPELLS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        spells: state.spells.map((spell) => {
          if (spell.index === action.payload.index) {
            return {
              ...spell,
              isFavorite: true,
            };
          }
          return spell;
        }),
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        spells: state.spells.map((spell) => {
          if (spell.index === action.payload) {
            return {
              ...spell,
              isFavorite: false,
            };
          }
          return spell;
        }),
      };
    default:
      return state;
  }
};

export default spellsReducer;
