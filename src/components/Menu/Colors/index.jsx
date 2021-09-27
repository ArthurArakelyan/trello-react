import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {changeColorAction} from "../../../store/board/actions";

import colors from "../../../constants/colors";

import styles from "./Colors.module.scss";
import "../animation.scss";

const Colors = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <div className={`${styles.menu__color_wrapper} animation ${collapsed ? 'collapsed' : ''}`}>
      {colors.map(color => {
        return (
          <div
            key={color}
            className={styles.menu__color}
            style={{background: color}}
            onClick={() => dispatch(changeColorAction(color))}
          />
        );
      })}
    </div>
  )
}

export default Colors;
