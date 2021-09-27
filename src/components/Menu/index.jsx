import React, {useState} from 'react';

import Backgrounds from "./Backgrounds";
import Colors from "./Colors";
import BackButton from "./BackButton";

import styles from './Menu.module.scss';

const Menu = ({menuCollapse, menuIsOpen, menuRef}) => {
  const [menuType, setMenuType] = useState('backgrounds');

  const menuContent = () => {
    switch(menuType) {
      case 'backgrounds': {
        return <Backgrounds menuIsOpen={menuIsOpen} setMenuType={setMenuType} />;
      }
      case 'colors': {
        return <Colors />;
      }
      default: {
        return null;
      }
    }
  }

  return (
    <div
      ref={menuRef}
      className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}
    >
      <div className={styles.menu__wrapper}>
        <div className={styles.menu__content}>
          <div className={styles.menu__header}>
            <BackButton menuType={menuType} setMenuType={setMenuType} />
            <h2 className={styles.menu__header_heading}>
              {menuType === 'backgrounds' ? 'Смена фона' : 'Цвета'}
            </h2>
            <button onClick={menuCollapse} className={styles.menu__header_close}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.menu__body}>
            {menuContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
