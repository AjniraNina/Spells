import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpells, addFavorite } from "../redux/actions";
import { Spell as SpellType } from "../redux/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import "./style.css";

const SavedSpell: React.FC<{ spell: SpellType }> = ({ spell }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="SavedSpell">
      <h4 onClick={toggleDetails}>{spell.name}</h4>
      {showDetails && (
        <div>
          <p>Range: {spell.range}</p>
          <p>Duration: {spell.duration}</p>
          <p>Components: {spell.components.join(", ")}</p>
          <p>{spell.desc[0]}</p>
        </div>
      )}
    </div>
  );
};

const Spell: React.FC<{
  spell: SpellType;
  handleSaveClick: (spell: SpellType) => void;
}> = ({ spell, handleSaveClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSave = () => {
    handleSaveClick(spell);
    setIsSaved(true);
  };

  return (
    <div className="Spell">
      <h3 onClick={toggleDetails}>{spell.name}</h3>
      {showDetails && (
        <div>
          <p>Range: {spell.range}</p>
          <p>Duration: {spell.duration}</p>
          <p>Components: {spell.components.join(", ")}</p>
          <p>{spell.desc[0]}</p>
          {spell.higher_level && <p>{spell.higher_level[0]}</p>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={isSaved}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

const SpellList: React.FC = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const spells = useSelector((state: any) => state.spells.spells);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedSpells, setSavedSpells] = useState<SpellType[]>([]);
  const [showSavedSpells, setShowSavedSpells] = useState(false);

  useEffect(() => {
    dispatch(fetchSpells(undefined, currentPage));
  }, [dispatch, currentPage]);

  const handleSaveClick = (spell: SpellType) => {
    dispatch(addFavorite(spell));
    setSavedSpells([...savedSpells, spell]);
  };

  const handlePageChange = (increment: number) => {
    setCurrentPage(currentPage + increment);
  };

  const toggleSavedSpells = () => {
    setShowSavedSpells(!showSavedSpells);
  };

  return (
    <div>
      <div className="heading-container">
        <h3
          onClick={toggleSavedSpells}
          className={savedSpells.length > 0 ? "heading-saved-spells" : ""}
        >
          Saved Spells
        </h3>
        {showSavedSpells && (
          <>
            {savedSpells.length === 0 ? (
              <p>No spells saved.</p>
            ) : (
              <div className="saved-spells-container">
                {savedSpells.map((spell) => (
                  <SavedSpell key={spell.index} spell={spell} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <h2>Spell List</h2>
      {Array.isArray(spells) &&
        spells.map((spell: SpellType) => (
          <Spell
            key={spell.index}
            spell={spell}
            handleSaveClick={handleSaveClick}
          />
        ))}
      <div className="page-count">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page">Page: {currentPage}</span>
        <button onClick={() => handlePageChange(1)}>Next</button>
      </div>
    </div>
  );
};

export default SpellList;
