import React from 'react';
import {useDispatch} from "react-redux";

import {
  addCardCoverAction,
  changeCardCoverTypeAction,
  clearCardCoverAction
} from "../../../../../store/columns/actions";

import Popover from "../../../Popover";

import coverColors from "../../../../../constants/coverColors";

import styles from "./Cover.module.scss";

const Cover = ({setPopoverType, popoverRef, card}) => {
  const dispatch = useDispatch();

  const defaultColor = '#5e6c84';

  return (

    <Popover
      heading="Обложка"
      close={() => setPopoverType(null)}
      popoverRef={popoverRef}
    >
      <h4 className={styles.popover__cover_subheading}>Размер</h4>
      <div className={styles.popover__cover_types}>
        <div
          className={`${styles.popover__cover_type} ${card?.cover.color && card?.cover.type === 1 ? styles.active : ''}`}
          style={{cursor: card?.cover.color ? 'pointer' : 'default'}}
          onClick={() => card?.cover.color ? dispatch(changeCardCoverTypeAction(1)) : {}}
        >
          <div
            className={styles.type1__header}
            style={{
              backgroundColor: card?.cover.color ? card?.cover.color : defaultColor,
              opacity: card?.cover.color ? '1' : '0.3'
            }}
          />

          <div className={styles.type1__body}>
            <div className={styles.type1__text1} style={{opacity: card?.cover.color ? '1' : '0.3'}} />
            <div className={styles.type1__text2} style={{opacity: card?.cover.color ? '1' : '0.3'}} />

            <div className={styles.type1__footer}>
              <div style={{opacity: card?.cover.color ? '1' : '0.3'}} />
              <div style={{opacity: card?.cover.color ? '1' : '0.3'}} />
              <div className={styles.type1__button} style={{opacity: card?.cover.color ? '1' : '0.3'}} />
            </div>
          </div>
        </div>

        <div
          className={`${styles.popover__cover_type} ${card?.cover.color && card?.cover.type === 2 ? styles.active : ''}`}
          style={{cursor: card?.cover.color ? 'pointer' : 'default'}}
          onClick={() => card?.cover.color ? dispatch(changeCardCoverTypeAction(2)) : {}}
        >
          <div style={{
            backgroundColor: card?.cover.color ? card?.cover.color : defaultColor,
            opacity: card?.cover.color ? '1' : '0.3'
          }}>
            <div className={styles.type2__body}>
              <div
                className={styles.type2_text1}
                style={{backgroundColor: card?.cover.color ? '#5e6c84' : '#fff'}}
              />
              <div
                className={styles.type2_text2}
                style={{backgroundColor: card?.cover.color ? '#5e6c84' : '#fff'}}
              />
            </div>
          </div>
        </div>
      </div>

      {card?.cover.color &&
      <button
        className={styles.popover__cover_clear}
        onClick={() => dispatch(clearCardCoverAction())}
      >
        Убрать обложку
      </button>
      }

      <h4 className={`${styles.popover__cover_subheading} ${styles.popover__cover_color_subheading}`}>Цвета</h4>
      <div className={styles.popover__cover_colors}>
        {coverColors.map(color => {
          return <div
            key={color}
            className={`${styles.popover__cover_color} ${card?.cover.color === color ? styles.active : ''}`}
            style={{backgroundColor: color}}
            onClick={() => dispatch(addCardCoverAction(color))}
          />
        })}
      </div>
    </Popover>
  );
}

export default Cover;
