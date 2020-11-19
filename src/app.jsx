import React from 'react';
import images from './assets/1-0.jpg';
import './app.scss';

function App() {
  return (
    <div className="app">
      <img className="imgs" src={images} alt="" />
    </div>
  );
}

export default App;
