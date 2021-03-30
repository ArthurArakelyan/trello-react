import React, {useState} from 'react';

import HomeHeader from "../HomeHeader";
import Columns from "../Columns";
import Menu from "../Menu";

import useOutsideClick from "../../hooks/useOutsideClick";

import styles from './Home.module.scss';

const Home = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClose, setMenuClose] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuClose(true);
    setTimeout(() => setMenuIsOpen(value => !value), 300);
  }

  const menuRef = useOutsideClick(closeMenu);

  const menuCollapse = () => {
    if(menuIsOpen && menuOpen) {
      closeMenu();
    } else if(!menuIsOpen) {
      setTimeout(() => {
        setMenuClose(false);
        setMenuOpen(true);
      }, 10);
      setMenuIsOpen(value => !value);
    } else {
      setMenuOpen(false);
      setMenuClose(false);
      setMenuIsOpen(false);
    }
  }

  return (
    <div className={styles.home}>
      <div className="wrapper">
        <div className={styles.home__content}>
          <HomeHeader menuCollapse={menuCollapse} />
          <Columns />
          {menuIsOpen && <Menu
            menuCollapse={menuCollapse}
            menuOpen={menuOpen}
            menuClose={menuClose}
            menuRef={menuRef}
          />}
        </div>
      </div>
    </div>
  );
}

export default Home;
