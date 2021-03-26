import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
  addCardAction,
  changeColumnNameAction,
  dropColumnAction,
  columnDragStartAction,
  changeColumnsActiveLabels
} from '../../store/columns/actions';

import useFormCollapse from "../../hooks/useFormCollapse";

import styles from './Column.module.scss';

const Column = ({column, modalOpen}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const {columns, columnsActiveLabels} = useSelector(state => state.columnsReducer);

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

  return (
    <div
      className={styles.column}
      draggable={true}
      onDragStart={function() {
        const droppedColumn = columns.findIndex(col => col.id === column.id);
        dispatch(columnDragStartAction(droppedColumn));
      }}
      onDragOver={function(e) {
        e.preventDefault();
      }}
      onDrop={function(e) {
        e.preventDefault();
        e.stopPropagation();
        const droppedColumn = columns.findIndex(col => col.id === column.id);
        dispatch(dropColumnAction(droppedColumn));
      }}
    >
      <div className={styles.column__header}>
        {nameFormCollapse ?
          <form className={styles.column__header_form} onSubmit={nameFormSubmit}>
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
                onClick={() => modalOpen(column.id, card.id)}
              >
                {!!card.labels.length &&
                <div className={styles.column__card_labels}>
                  {card.labels.map(label => {
                    return (
                      <div
                        key={label.id}
                        className={`${styles.column__card_label} ${columnsActiveLabels ? styles.active : ''}`}
                        title={label.value}
                        style={{backgroundColor: label.color}}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(changeColumnsActiveLabels());
                        }}
                      >
                        {columnsActiveLabels &&
                        <span>
                          {label.value.length > 21 ? `${label.value.slice(0, 21)}...` : label.value}
                        </span>
                        }
                      </div>
                    )
                  })}
                </div>
                }

                <span>{card.value}</span>

                {card.description || card.comments.length ?
                  <div className={styles.column__card_badges}>
                    {card.description &&
                      <span title="Эта карточка с описанием." className={styles.column__card_badge}>
                        <i className="fas fa-align-left" />
                      </span>
                    }
                    {!!card.comments.length &&
                      <span title="Комментарии" className={styles.column__card_badge}>
                        <i className="far fa-comment" />
                        <span style={{marginLeft: '4px'}}>{card.comments.length}</span>
                      </span>
                    }
                  </div>
                  : null
                }
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
              autoFocus
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
