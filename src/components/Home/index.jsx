import React, {useState} from 'react';

import HomeHeader from "../HomeHeader";
import Columns from "../Columns";
import Menu from "../Menu";

import useOutsideClick from "../../hooks/useOutsideClick";

import styles from './Home.module.scss';

const Home = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuCollapse = () => {
    if(menuIsOpen) {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
  }

  const menuRef = useOutsideClick(() => setMenuIsOpen(false));

  return (
    <div className={styles.home}>
      <div className="wrapper">
        <div className={styles.home__content}>
          <HomeHeader menuCollapse={menuCollapse} />
          <Columns />
          <Menu
            menuCollapse={menuCollapse}
            menuIsOpen={menuIsOpen}
            menuRef={menuRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
