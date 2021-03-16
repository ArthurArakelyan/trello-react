import React, {useState, useRef, useEffect} from 'react';
import {useDispatch} from "react-redux";

import {addCardAction, changeColumnNameAction} from '../../store/columns/actions';

import useFormCollapse from "../../hooks/useFormCollapse";

import styles from './Column.module.scss';

const Column = ({column, modalOpen}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const [nameFormCollapse, setNameFormCollapse] = useState(false);
  const [nameValue, setNameValue] = useState(column.value);

  const [cardFormCollapse, setCardFormCollapse] = useState(false);
  const [cardValue, setCardValue] = useState('');

  useEffect(() => {
    if(textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [cardFormCollapse]);

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameFormCollapse]);

  const cardFormSubmit = (e) => {
    e.preventDefault();

    if(cardValue.trim()) {
      dispatch(addCardAction(column.id, cardValue));
      formCollapse(setCardFormCollapse, setCardValue);
    }
  }

  const nameFormSubmit = (e) => {
    e.preventDefault();

    if(nameValue.trim()) {
      dispatch(changeColumnNameAction(column.id, nameValue));
      formCollapse(setNameFormCollapse, setNameValue, column.value);
    }
  }

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {nameFormCollapse ?
          <form className={styles.column__header_form} onSubmit={nameFormSubmit}>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              ref={inputRef}
            />
          </form>
          :
          <p
            onClick={() => formCollapse(setNameFormCollapse, setNameValue, column.value)}
            className={styles.column__header_name}
          >
            {column.value}
          </p>
        }

        <div className={styles.column__header_extras_section}>
          <button className={styles.column__header_extras}>
            <i className="fas fa-ellipsis-h" />
          </button>
        </div>
      </div>

      {!!column.cardsArray.length &&
        <div className={styles.column__cards}>
          {column.cardsArray.map(card => {
            return (
              <button
                key={card.id}
                className={styles.column__card}
                onClick={() => modalOpen(column, card)}
              >
                <span>{card.value}</span>
              </button>
            )
          })}
        </div>
      }

      <div className={styles.column__cards_creating}>
        {cardFormCollapse ?
          <form className={styles.column__cards_form} onSubmit={cardFormSubmit}>
            <textarea
              value={cardValue}
              onChange={(e) => setCardValue(e.target.value)}
              placeholder="Ввести заголовок для этой карточки"
              ref={textareaRef}
            />
            <div className={styles.column__cards_buttons}>
              <button className={styles.column__cards_submit}>
                Добавить карточку
              </button>
              <button
                onClick={() => formCollapse(setCardFormCollapse, setCardValue)}
                type="button"
                className={styles.column__cards_close}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </form>
          :
          <button
            onClick={() => formCollapse(setCardFormCollapse, setCardValue)}
            className={styles.column__cards_creating_button}
          >
            <i className="fas fa-plus" />
            <span>Добавить карточку</span>
          </button>
        }
      </div>
    </div>
  );
}

export default Column;
