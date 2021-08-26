import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {boardLikeAction, changeBoardNameAction} from '../../store/board/actions';

import Button from "../common/Button";

import useFormCollapse from "../../hooks/useFormCollapse";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEscClick from "../../hooks/useEscClick";

import styles from './HomeHeader.module.scss';

const HomeHeader = ({menuCollapse, menuIsOpen, menuClose}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const board = useSelector(state => state.boardReducer);

  const [nameEditing, setNameEditing] = useState(false);
  const [nameValue, setNameValue] = useState(board.value);

  const nameSubmit = (e) => {
    e.preventDefault();
    if(nameValue.trim() && nameValue.length <= 30) {
      dispatch(changeBoardNameAction(nameValue));
      formCollapse(setNameEditing, setNameValue, board.value);
    } else {
      formCollapse(setNameEditing, setNameValue, board.value);
    }
  }

  const ref = useOutsideClick(nameSubmit);
  useEscClick(nameSubmit, ref);

  return (
    <div className={styles.home__header}>
      <div className={styles.home__header_actions}>
        <Button className={`button ${styles.home__header_board_type}`}>
          <svg className={styles.home__header_board_type_img} width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M2 7v8a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2zm2 0v8h2V7H4zm5 0v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2zm2 0v6h2V7h-2zm5 10V7a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm2 0V7h2v10h-2z" fill="currentColor" />
          </svg>

          <span className="header__board_type_name">Доска</span>

          <svg className={styles.home__header_board_type_dropdown} width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
            <path d="M11.293 16.707l-7.071-7.07a1 1 0 111.414-1.415L12 14.586l6.364-6.364a1 1 0 111.414 1.414l-7.07 7.071a1 1 0 01-1.415 0z" fill="currentColor" />
          </svg>
        </Button>

        {nameEditing ?
          <form className={styles.board__name_form} onSubmit={nameSubmit}>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              minLength={0}
              maxLength={30}
              ref={ref}
              autoFocus
            />
          </form>
          :
          <h1
            className={styles.board__name}
            onClick={() => formCollapse(setNameEditing, setNameValue, board.value)}
          >
            {board.value}
          </h1>
        }

        <Button
          onClick={() => dispatch(boardLikeAction())}
          className={`button ${styles.header__action_star} ${board.liked ? styles.active : ''}`}
        >
          <i className="far fa-star" />
        </Button>

        <div className={styles.divider} />

        <Button className={`button ${styles.home__header__action_board_type}`}>
          <i className="fas fa-lock" />

          <span>Приватная</span>
        </Button>
      </div>

      <div className={styles.home__header_menu}>
        <Button className={`button ${styles.home__header_menu_butler}`}>
          <img src="https://app.butlerfortrello.com/984a62a105424e1f26fa602f0ac926ef9b4d2159/./img/butler-powerup-btn-white.svg" alt="Butler" />

          <span>Butler</span>
        </Button>

        <Button
          className={`button ${styles.home__header_menu_menu}`}
          onClick={() => {
            if(!menuIsOpen && !menuClose) {
              menuCollapse();
            }
          }}
        >
          <i className="fas fa-ellipsis-h" />

          <span>Меню</span>
        </Button>
      </div>
    </div>
  );
}

export default HomeHeader;
