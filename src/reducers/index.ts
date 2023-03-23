import { combineReducers } from 'redux';
import spellsReducer from './spellsReducer';

const rootReducer = combineReducers({
  spells: spellsReducer,
});

export default rootReducer;
