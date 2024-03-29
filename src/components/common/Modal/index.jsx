import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";

import {
  deleteCardAction,
  changeCardNameAction,
  changeCardDescriptionAction,
  addCommentAction
} from '../../../store/columns/actions';

import Comment from "./Comment";
import CheckList from "./CheckList";
import Menu from './Menu';
import ModalPopover from './popovers/index';

import useFormCollapse from "../../../hooks/useFormCollapse";
import useFormCollapseWithTextarea from "../../../hooks/useFormCollapseWithTextarea";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useEscClick from "../../../hooks/useEscClick";

import user from '../../../assets/images/user.png';

import './styles.scss';
import styles from './Modal.module.scss';

ReactModal.setAppElement('#root');

const Modal = ({modalIsOpen, modalClose}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();
  const formCollapseWithTextarea = useFormCollapseWithTextarea();

  const {columns, editingColumn} = useSelector(state => state.columnsReducer);
  const column = columns.find(column => column.id === editingColumn.column);
  const card = column?.cardsArray.find(card => card.id === editingColumn.card);

  const [cardNameFormCollapse, setCardNameFormCollapse] = useState(false);
  const [cardNameValue, setCardNameValue] = useState(card?.value);

  const [descriptionFormCollapse, setDescriptionFormCollapse] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');

  const [commentFormCollapse, setCommentFormCollapse] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const [popoverType, setPopoverType] = useState(null);

  useEffect(() => {
    if(!modalIsOpen) {
      setPopoverType(null);
    }
  }, [modalIsOpen]);

  const cardNameFormSubmit = (e) => {
    e.preventDefault();

    if(cardNameValue.trim()) {
      dispatch(changeCardNameAction(cardNameValue));
      formCollapse(setCardNameFormCollapse, setCardNameValue, card?.value);
    }
  }

  const cardDescriptionFormSubmit = (e) => {
    e.preventDefault();

    if(descriptionValue.trim() || descriptionValue === '') {
      dispatch(changeCardDescriptionAction(descriptionValue));
      formCollapse(setDescriptionFormCollapse, setDescriptionValue);
    }
  }

  const cardCommentsFormSubmit = (e) => {
    e.preventDefault();

    if(commentValue.trim()) {
      dispatch(addCommentAction(commentValue));
      formCollapse(setCommentFormCollapse, setCommentValue);
    }
  }

  const cardDelete = () => {
    modalClose();
    setTimeout(() => {
      dispatch(deleteCardAction(card?.id));
    }, 300);
  }

  const cardNameRef = useOutsideClick(cardNameFormSubmit);
  useEscClick(() => formCollapse(setCardNameFormCollapse, setCardNameValue, card?.value), cardNameRef);

  const cardDescriptionRef = useOutsideClick(cardDescriptionFormSubmit);
  useEscClick(() => formCollapse(setDescriptionFormCollapse, setDescriptionValue), cardDescriptionRef);

  const commentRef = useOutsideClick(() => {
    if(commentFormCollapse && !commentValue.trim()) {
      setCommentFormCollapse(value => !value);
      setCommentValue('');
    }
  });

  const popoverRef = useOutsideClick(() => setPopoverType(null));
  useEscClick(() => setPopoverType(null), popoverRef);

  return (
    <ReactModal
      closeTimeoutMS={300}
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={modalClose}
      style={
        {
          content: {
            position: 'relative',
            width: '760px',
            borderRadius: '3px',
            height: 'fit-content',
            margin: '0 auto 80px auto',
            padding: '20px 0',
            border: 'none',
            backgroundColor: '#EBECF0',
            zIndex: '1000',
            overflow: 'none',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            inset: '0'
          },
          overlay: {
            zIndex: '1000',
            overflow: 'auto'
          }
        }
      }
    >
      <span
        className={styles.modal__close}
        onClick={modalClose}
      >
        <i className="fas fa-times" />
      </span>

      <div className={styles.modal__card_details}>
        <div className={styles.modal__card_detail}>
          <div className={`${styles.modal__card_detail_icon} ${styles.modal__card_name_detail_icon}`}>
            <i className="far fa-credit-card" />
          </div>

          <div className={styles.modal__card_detail_content}>
            <div className={styles.modal__card_detail_header}>
              {cardNameFormCollapse ?
              <form
                onSubmit={cardNameFormSubmit}
                className={styles.modal__card_name_detail_form}
                ref={cardNameRef}
              >
                <input
                  type='text'
                  value={cardNameValue}
                  onChange={(e) => setCardNameValue(e.target.value)}
                  autoFocus
                />
              </form>
              :
              <h2
                className={`${styles.modal__card_detail_heading} ${styles.modal__card_name_detail_heading}`}
                onClick={() => formCollapse(setCardNameFormCollapse, setCardNameValue, card?.value)}
              >
                {card?.value}
              </h2>
              }
            </div>

            <div className={styles.modal__card_detail_main}>
              <span className={styles.modal__card_name_detail_column_name}>
                в колонке {column?.value}
              </span>
            </div>

            {!!card?.labels.length &&
            <div className={styles.modal__card_labels}>
              <p className={styles.modal__card_labels_heading}>
                МЕТКИ
              </p>
              <div className={styles.modal__card_labels_container}>
                {card?.labels.map(label => {
                  return (
                    <div
                      key={label.id}
                      className={styles.modal__card_label}
                      style={{backgroundColor: label.color}}
                      title={label.value}
                    >
                      {label.value &&
                      <span className={styles.modal__card_label_value}>
                        {label.value}
                      </span>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
            }
          </div>
        </div>


        <div className={styles.modal__card_detail}>
          <div className={styles.modal__card_detail_icon}>
            <i className="fas fa-align-justify" />
          </div>

          <div className={styles.modal__card_detail_content}>
            <div className={styles.modal__card_detail_header}>
              <p className={styles.modal__card_detail_heading}>Описание</p>
            </div>

            <div className={styles.modal__card_detail_main}>
              {card?.description && !descriptionFormCollapse ?
              <p
                className={styles.modal__card_description_details}
                onClick={() => formCollapseWithTextarea(setDescriptionFormCollapse, setDescriptionValue, card?.description, true)}
              >
                {card?.description}
              </p> :
              !card?.description && !descriptionFormCollapse ?
              <button
                type="button"
                onClick={() => formCollapseWithTextarea(setDescriptionFormCollapse, setDescriptionValue, card?.description, true)}
                className={styles.modal__card_description_details_button}
              >
                Добавить более подробное описание...
              </button> :
              <form
                className={styles.modal__card_description_details_form}
                onSubmit={cardDescriptionFormSubmit}
                ref={cardDescriptionRef}
              >
                <textarea
                  placeholder='Добавить более подробное описание...'
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                  autoFocus
                />
                <div className={styles.modal__card_description_details_form_actions}>
                  <button className="form__submit">
                    Сохранить
                  </button>
                  <button
                    type='button'
                    className="form__close"
                    onClick={() => {
                      formCollapse(setDescriptionFormCollapse, setDescriptionValue);
                    }}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </form>
              }
            </div>
          </div>
        </div>

        {!!card?.checklist.length &&
        <div className={styles.modal__card_checklists}>
          {card?.checklist.map(list => {
            return <CheckList key={list.id} list={list} />
          })}
        </div>
        }

        <div className={styles.modal__card_comments}>
          <div className={styles.modal__card_comments_details_container}>
            <div className={styles.modal__card_section}>
              <span className={styles.modal__card_detail_icon}>
                <i className="fas fa-align-left" />
              </span>
              <p className={styles.modal__card_detail_heading}>Действия</p>
            </div>
          </div>

          <div className={styles.modal__card_comments_details_container}>
            <div className={styles.modal__card_section}>
              <div className={styles.modal__card_comments_avatar}>
                <img
                  src={user}
                  alt="Avatar"
                />
              </div>

              <form
                className={`${styles.modal__card_comments_create_form} ${!commentFormCollapse ? styles.hide : ''}`}
                ref={commentRef}
                onSubmit={cardCommentsFormSubmit}
                onClick={() => {
                  if(!commentFormCollapse) {
                    setCommentFormCollapse(true);
                    if(commentRef.current) {
                      commentRef.current.firstChild.focus();
                    }
                  }
                }}
              >
                <textarea
                  placeholder='Напишите комментарий...'
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
                <button
                  className={`${styles.modal__card_comments_create_save} ${!commentValue.trim() ? styles.disabled : ''}`}
                >
                  Сохранить
                </button>
              </form>
            </div>
          </div>

          <div className={styles.modal__card_comments_comments}>
            {card?.comments.map(comment => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
        </div>
      </div>

      <Menu
        setPopoverType={setPopoverType}
        cardDelete={cardDelete}
      >
        <ModalPopover
          popoverType={popoverType}
          setPopoverType={setPopoverType}
          popoverRef={popoverRef}
          card={card}
        />
      </Menu>
    </ReactModal>
  );
}

export default Modal;
