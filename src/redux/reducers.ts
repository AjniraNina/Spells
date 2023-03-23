export interface Spell {
    index: string;
    name: string;
    desc: string[];
    higher_level: string[];
    page: string;
    range: string;
    components: string[];
    material?: string;
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    level: number;
    school: {
      name: string;
      url: string;
    };
    classes: {
      name: string;
      url: string;
    }[];
    subclasses: {
      name: string;
      url: string;
    }[];
    url: string;
  }
  
  export interface SpellsState {
    spells: Spell[];
    loading: boolean;
    error: string | null;
  }
  
  export interface FavoritesState {
    favorites: Spell[];
  }
  
  export enum SpellsActionTypes {
    FETCH_SPELLS_REQUEST = 'FETCH_SPELLS_REQUEST',
    FETCH_SPELLS_SUCCESS = 'FETCH_SPELLS_SUCCESS',
    FETCH_SPELLS_FAILURE = 'FETCH_SPELLS_FAILURE',
    ADD_FAVORITE = 'ADD_FAVORITE',
    REMOVE_FAVORITE = 'REMOVE_FAVORITE',
  }
  
  export interface FetchSpellsRequestAction {
    type: SpellsActionTypes.FETCH_SPELLS_REQUEST;
  }
  
  export interface FetchSpellsSuccessAction {
    type: SpellsActionTypes.FETCH_SPELLS_SUCCESS;
    payload: Spell[];
  }
  
  export interface FetchSpellsFailureAction {
    type: SpellsActionTypes.FETCH_SPELLS_FAILURE;
    payload: string;
  }
  
  export interface AddFavoriteAction {
    type: SpellsActionTypes.ADD_FAVORITE;
    payload: Spell;
  }
  
  export interface RemoveFavoriteAction {
    type: SpellsActionTypes.REMOVE_FAVORITE;
    payload: string;
  }
  
  export type Action =
    | FetchSpellsRequestAction
    | FetchSpellsSuccessAction
    | FetchSpellsFailureAction
    | AddFavoriteAction
    | RemoveFavoriteAction;
  