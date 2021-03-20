import React from 'react';
import {useSelector} from "react-redux";

import Header from './components/Header';
import Home from "./components/Home";

const App = () => {
  const color = useSelector(state => state.boardReducer.color);

  return (
    <div className="App" style={{backgroundColor: color}}>
      <Header />

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
