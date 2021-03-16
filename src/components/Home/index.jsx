import React from 'react';

import HomeHeader from "../HomeHeader";
import Columns from "../Columns";

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className="wrapper">
        <div className={styles.home__content}>
          <HomeHeader />
          <Columns />
        </div>
      </div>
    </div>
  );
}

export default Home;
