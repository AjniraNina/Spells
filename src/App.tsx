import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpellList from './components/SpellList';
import SpellDetails from './components/SpellDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpellList />} />
          <Route path="/spells/:index" element={<SpellDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
