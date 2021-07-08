import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Card from "../Card";

import Textarea from "../common/Textarea";

import {
  addCardAction,
  changeColumnNameAction,
  dropColumnAction,
  columnDragStartAction,
  columnDragEndAction,
  cardDropOnEmptyColumnAction
} from '../../store/columns/actions';

import useFormCollapse from "../../hooks/useFormCollapse";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEscClick from "../../hooks/useEscClick";

import styles from './Column.module.scss';

const Column = ({column, modalOpen}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const {columns, draggedCard} = useSelector(state => state.columnsReducer);

  const [nameFormCollapse, setNameFormCollapse] = useState(false);
  const [nameValue, setNameValue] = useState(column.value);

  const [cardFormCollapse, setCardFormCollapse] = useState(false);
  const [cardValue, setCardValue] = useState('');

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

  const cardFormRef = useOutsideClick(() => formCollapse(setCardFormCollapse, setCardValue));
  useEscClick(() => formCollapse(setCardFormCollapse, setCardValue), cardFormRef);

  const nameFormRef = useOutsideClick(nameFormSubmit);
  useEscClick(nameFormSubmit, nameFormRef);

  return (
    <div
      className={styles.column}
      draggable={true}
      onDragStart={() => dispatch(columnDragStartAction(columns.findIndex(col => col.id === column.id)))}
      onDragEnd={() => dispatch(columnDragEndAction())}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(!draggedCard) {
          const droppedColumn = columns.findIndex(col => col.id === column.id);
          dispatch(dropColumnAction(droppedColumn));
        } else {
          const droppedColumn = columns.find(col => col.id === column.id);
          if(droppedColumn.cardsArray.length === 0) {
            dispatch(cardDropOnEmptyColumnAction(droppedColumn));
          }
        }
      }}
    >
      <div className={styles.column__header}>
        {nameFormCollapse ?
          <form
            ref={nameFormRef}
            className={styles.column__header_form}
            onSubmit={nameFormSubmit}
          >
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              autoFocus
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
      </div>

      {!!column.cardsArray.length &&
        <div className={styles.column__cards}>
          {column.cardsArray.map(card => {
            return <Card
              key={card.id}
              card={card}
              column={column}
              modalOpen={modalOpen}
            />
          })}
        </div>
      }

      <div className={styles.column__cards_creating}>
        {cardFormCollapse ?
          <form
            ref={cardFormRef}
            className={styles.column__cards_form}
            onSubmit={cardFormSubmit}
          >
            <Textarea
              enterClick={cardFormSubmit}
              value={cardValue}
              onChange={(e) => setCardValue(e.target.value)}
              placeholder="Ввести заголовок для этой карточки"
              autoFocus
            />
            <div className={styles.column__cards_buttons}>
              <button className="form__submit">
                Добавить карточку
              </button>
              <button
                onClick={() => formCollapse(setCardFormCollapse, setCardValue)}
                type="button"
                className="form__close"
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
