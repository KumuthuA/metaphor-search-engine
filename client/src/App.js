import React from 'react';
import Header from './components/Header';
import SearchResultTable from './components/SearchResultTable';
import WebsiteHeader from './components/WebsiteHeader';

function App() {
   return (
    <div>
      <Header />
      <WebsiteHeader title="Metaphor Search Engine" subtitle="Unlocking Sinhala's Metaphorical Riches: Your Ultimate Resource for Poets, Enthusiasts, and Researchers" />
      <SearchResultTable />
    </div>
  );
}

export default App;
