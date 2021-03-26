import React from 'react';

import styles from './Popover.module.scss'

const Popover = ({heading, children, back, close}) => {
  return (
    <div className={styles.popover}>
      <div className={styles.popover__wrapper}>
        <div className={styles.popover__content}>
          <div className={styles.popover__header}>
            {back &&
            <button
              onClick={back}
              className={styles.popover__header_back}
            >
              <i className="fas fa-angle-left" />
            </button>
            }
            <h3 className={styles.popover__header_heading}>{heading}</h3>
            <button
              onClick={close}
              className={styles.popover__header_close}
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.popover__body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popover;
