import React from 'react';

import styles from './Menu.module.scss';

const Menu = ({children, setPopoverType, cardDelete}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__upgrades}>
        <h5 className={styles.menu__upgrades_heading}>добавить на карточку</h5>
        <button className={styles.menu__upgrades_button}>
          <i className="far fa-user" />
          <p>Участники</p>
        </button>
        <button
          onClick={() => setPopoverType('label')}
          className={styles.menu__upgrades_button}
        >
          <i className="fas fa-tag" />
          <p>Метки</p>
        </button>
        <button
          onClick={() => setPopoverType('checkList')}
          className={styles.menu__upgrades_button}
        >
          <i className="far fa-check-square" />
          <p>Чек-лист</p>
        </button>
        <button className={styles.menu__upgrades_button}>
          <i className="far fa-clock" />
          <p>Даты</p>
        </button>
        <button className={styles.menu__upgrades_button}>
          <i className="fas fa-paperclip" />
          <p>Вложение</p>
        </button>
        <button
          onClick={() => setPopoverType('cover')}
          className={styles.menu__upgrades_button}
        >
          <i className="far fa-credit-card" />
          <p>Обложка</p>
        </button>
      </div>

      <div className={styles.menu__actions}>
        <h5 className={styles.menu__upgrades_heading}>Действия</h5>
        <button
          className={styles.menu__upgrades_button}
          onClick={cardDelete}
        >
          <i className="far fa-trash-alt" />
          <p>Удалить</p>
        </button>
      </div>

      {children}
    </div>
  );
}

export default Menu;
