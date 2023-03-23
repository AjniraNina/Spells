export interface Spell {
  index: string;
  name: string;
  url: string;
}

export interface SpellsState {
  spells: Spell[];
  loading: boolean;
  error: string | null;
}

export const FETCH_SPELLS_REQUEST = "FETCH_SPELLS_REQUEST";
export const FETCH_SPELLS_SUCCESS = "FETCH_SPELLS_SUCCESS";
export const FETCH_SPELLS_FAILURE = "FETCH_SPELLS_FAILURE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

interface FetchSpellsRequestAction {
  type: typeof FETCH_SPELLS_REQUEST;
}

interface FetchSpellsSuccessAction {
  type: typeof FETCH_SPELLS_SUCCESS;
  payload: Spell[];
}

interface FetchSpellsFailureAction {
  type: typeof FETCH_SPELLS_FAILURE;
  payload: string;
}

interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: Spell;
}

interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string;
}

export type Action =
  | FetchSpellsRequestAction
  | FetchSpellsSuccessAction
  | FetchSpellsFailureAction
  | AddFavoriteAction
  | RemoveFavoriteAction;

  export type SpellsActionTypes =
  | typeof FETCH_SPELLS_REQUEST
  | typeof FETCH_SPELLS_SUCCESS
  | typeof FETCH_SPELLS_FAILURE
  | typeof ADD_FAVORITE
  | typeof REMOVE_FAVORITE;
