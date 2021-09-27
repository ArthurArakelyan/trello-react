import React, {useEffect, useState} from 'react';

import styles from './BackButton.module.scss';

const BackButton = ({menuType, setMenuType}) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if(menuType === 'colors') {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [menuType]);

  return (
    <button
      onClick={() => setMenuType('backgrounds')}
      className={`${styles.menu__header_back} ${isHidden ? styles.hidden : ''}`}
    >
      <i className="fas fa-angle-left" />
    </button>
  );
}

export default BackButton;
