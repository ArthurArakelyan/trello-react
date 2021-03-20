import React from 'react';
import {useDispatch} from "react-redux";

import {changeColorAction} from '../../store/board/actions';

import colors from "../../constants/colors";

import styles from './Menu.module.scss';

const Menu = ({menuCollapse, menuOpen, menuClose}) => {
  const dispatch = useDispatch();

  return (
    <div className={`${styles.menu} ${menuOpen ? styles.open : ''} ${menuClose ? styles.hide : ''}`}>
      <div className={styles.menu__wrapper}>
        <div className={styles.menu__content}>
          <div className={styles.menu__header}>
            <h2 className={styles.menu__header_heading}>Цвета</h2>
            <button onClick={menuCollapse} className={styles.menu__header_close}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.menu__body}>
            {colors.map(color => {
              return (
                <div
                  key={color}
                  className={styles.menu__color}
                  style={{backgroundColor: color}}
                  onClick={() => dispatch(changeColorAction(color))}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
