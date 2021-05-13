import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import Header from './components/Header';
import Home from "./components/Home";

const App = () => {
  const {color, image, selected} = useSelector(state => state.boardReducer);

  useEffect(() => {
    const icon = document.getElementById('icon');

    if(color === 'rgb(0, 121, 191)') {
      icon.href = '/favicon.png';
    } else if(color === 'rgb(210, 144, 52)') {
      icon.href = '/favicon2.png';
    } else if(color === 'rgb(81, 152, 57)') {
      icon.href = '/favicon3.png';
    } else if(color === 'rgb(176, 70, 50)') {
      icon.href = '/favicon4.png';
    } else if(color === 'rgb(137, 96, 158)') {
      icon.href = '/favicon5.png';
    } else if(color === 'rgb(205, 90, 145)') {
      icon.href = '/favicon6.png';
    } else if(color === 'rgb(75, 191, 107)') {
      icon.href = '/favicon7.png';
    } else if(color === 'rgb(0, 174, 204)') {
      icon.href = '/favicon8.png';
    } else if(color === 'rgb(131, 140, 145)') {
      icon.href = '/favicon9.png';
    } else {
      icon.href = '/favicon.png';
    }
  }, [color]);

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
