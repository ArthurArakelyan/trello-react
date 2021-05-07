import React from 'react';
import {useSelector} from "react-redux";

import Header from './components/Header';
import Home from "./components/Home";

const App = () => {
  const {color, image, selected} = useSelector(state => state.boardReducer);

  return (
    <div className="App" style={
      selected === 'color' ? {
        backgroundColor: color
      } : image && selected === 'image' ? {
        backgroundImage: `url(${image})`
      } : {
        backgroundColor: color
      }
    }>
      <Header />

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
