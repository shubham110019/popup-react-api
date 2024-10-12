// src/App.js
import React from 'react';
import PopupComponent from './PopupComponent';

function App() {
  const userId = 1;
  const websiteId = window.datasetWebsite;

  return (
    <>
      <PopupComponent userId={userId} websiteId={websiteId} />
    </>
  );
}

export default App;
