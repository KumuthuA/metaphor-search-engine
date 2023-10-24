// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import SearchResultTable from './components/SearchResultTable';

function App() {
   return (
    <div>
      <Header />
      <SearchResultTable />
    </div>
  );
}

export default App;
