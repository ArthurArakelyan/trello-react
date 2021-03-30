import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";

import {
  changeCardNameAction,
  changeCardDescriptionAction,
  addCommentAction,
  changeLabelAction,
  deleteLabelAction,
  createLabelAction,
  addCardCoverAction,
  changeCardCoverTypeAction,
  clearCardCoverAction
} from '../../../store/columns/actions';

import Comment from "./Comment";
import Popover from "../Popover";
import Label from "./Label";

import labelColors from "../../../constants/labelColors";
import coverColors from "../../../constants/coverColors";

import useFormCollapse from "../../../hooks/useFormCollapse";
import useOutsideClick from "../../../hooks/useOutsideClick";

import './styles.scss';
import styles from './Modal.module.scss';

ReactModal.setAppElement('#root');

const Modal = ({modalIsOpen, modalClose}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const {columns, editingColumn, labels} = useSelector(state => state.columnsReducer);
  const column = columns.find(column => column.id === editingColumn.column);
  const card = column?.cardsArray.find(card => card.id === editingColumn.card);

  const [cardNameFormCollapse, setCardNameFormCollapse] = useState(false);
  const [cardNameValue, setCardNameValue] = useState(card?.value);

  const [descriptionFormCollapse, setDescriptionFormCollapse] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(card?.description);

  const [commentFormCollapse, setCommentFormCollapse] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const [popoverType, setPopoverType] = useState(null);

  const [editingLabel, setEditingLabel] = useState({
    id: null,
    value: '',
    color: ''
  });

  const initialNewLabel = {
    id: nanoid(),
    value: '',
    color: '#61bd4f'
  }
  const [newLabel, setNewLabel] = useState(initialNewLabel);

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
      formCollapse(setDescriptionFormCollapse, setDescriptionValue, card?.description);
    }
  }

  const cardNameRef = useOutsideClick(cardNameFormSubmit);
  const cardDescriptionRef = useOutsideClick(() => {
    formCollapse(setDescriptionFormCollapse, setDescriptionValue, card?.description);
  });
  const commentRef = useOutsideClick(() => {
    if(commentFormCollapse && !commentValue.trim()) {
      setCommentFormCollapse(value => !value);
      setCommentValue('');
    }
  });
  const popoverRef = useOutsideClick(() => setPopoverType(null));

  const popover = () => {
    const closePopover = () => setPopoverType(null);

    switch(popoverType) {
      case 'label': {
        return (
          <Popover
            heading="Метки"
            close={closePopover}
            popoverRef={popoverRef}
          >
            <h4 className={`${styles.popover__subheading} ${styles.popover__labels_subheading}`}>Метки</h4>
            <ul className={styles.popover__labels}>
              {labels.map(label => {
                return <Label
                  key={label.id}
                  label={label}
                  card={card}
                  onEdit={(label) => {
                    setPopoverType('editingLabel');
                    setEditingLabel(label);
                  }}
                />;
              })}
            </ul>
            <button
              className={styles.popover__label_create_button}
              onClick={() => setPopoverType('creatingLabel')}
            >
              Создать новую метку
            </button>
          </Popover>
        );
      }
      case 'editingLabel': {
        return (
          <Popover
            heading="Изменение метки"
            close={closePopover}
            back={() => setPopoverType('label')}
            popoverRef={popoverRef}
          >
            <div className={styles.popover__label_editing_name_section}>
              <h4 className={styles.popover__subheading}>Название</h4>
              <input
                type="text"
                value={editingLabel.value}
                onChange={(e) => setEditingLabel(label => ({
                  ...label,
                  value: e.target.value
                }))}
              />
            </div>

            <div className={styles.popover__label_editing_color_section}>
              <h5>Цвета</h5>
              <div className={styles.popover__label_editing_colors}>
                {labelColors.map(color => {
                  return (
                    <div
                      key={color}
                      className={styles.popover__label_editing_color}
                      style={{backgroundColor: color}}
                      onClick={() => setEditingLabel(label => ({
                        ...label,
                        color
                      }))}
                    >
                      {editingLabel.color === color &&
                      <span className={styles.popover__label_editing_color_active}>
                        <i className="fas fa-check" />
                      </span>
                      }
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.popover__label_editing_actions}>
              <button
                className={styles.popover__label_editing_actions_save}
                onClick={() => {
                  dispatch(changeLabelAction(editingLabel));
                  setPopoverType('label');
                }}
              >
                Сохранить
              </button>

              <button
                className={styles.popover__label_editing_actions_delete}
                onClick={() => {
                  dispatch(deleteLabelAction(editingLabel.id));
                  setPopoverType('label');
                }}
              >
                Удалить
              </button>
            </div>
          </Popover>
        );
      }
      case 'creatingLabel': {
        return (
          <Popover
            heading="Создание метки"
            close={closePopover}
            back={() => setPopoverType('label')}
            popoverRef={popoverRef}
          >
            <div className={styles.popover__label_editing_name_section}>
              <h4>Название</h4>
              <input
                type="text"
                value={newLabel.value}
                onChange={(e) => setNewLabel(label => ({
                  ...label,
                  value: e.target.value
                }))}
              />
            </div>

            <div className={styles.popover__label_editing_color_section}>
              <h5>Цвета</h5>
              <div className={styles.popover__label_editing_colors}>
                {labelColors.map(color => {
                  return (
                    <div
                      key={color}
                      className={styles.popover__label_editing_color}
                      style={{backgroundColor: color}}
                      onClick={() => setNewLabel(label => ({
                        ...label,
                        color
                      }))}
                    >
                      {newLabel.color === color &&
                      <span className={styles.popover__label_editing_color_active}>
                        <i className="fas fa-check" />
                      </span>
                      }
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.popover__label_editing_actions}>
              <button
                className={styles.popover__label_editing_actions_save}
                onClick={() => {
                  dispatch(createLabelAction(newLabel));
                  setPopoverType('label');
                  setNewLabel(initialNewLabel);
                }}
              >
                Создать
              </button>
            </div>
          </Popover>
        );
      }
      case 'cover': {
        const defaultColor = '#5e6c84';

        return (
          <Popover
            heading="Обложка"
            close={closePopover}
            popoverRef={popoverRef}
          >
            <h4 className={`${styles.popover__subheading} ${styles.popover__cover_subheading}`}>Размер</h4>
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

            <h4 className={`${styles.popover__subheading} ${styles.popover__labels_subheading}`}>Цвета</h4>
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
      default: {
        return null;
      }
    }
  }

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
            width: '750px',
            borderRadius: '3px',
            height: 'fit-content',
            margin: '0 auto 80px auto',
            padding: '20px 10px',
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

      <div className={styles.modal__card_infos}>
        <div className={styles.modal__card_info}>
          <span className={styles.modal__card_info_icon}>
            <i className="far fa-credit-card" />
          </span>
          <div className={styles.modal__card_info_details}>
            {cardNameFormCollapse ?
              <form
                onSubmit={cardNameFormSubmit}
                className={styles.modal__card_info_details_card_name_form}
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
              <p
                className={styles.modal__card_info_details_card_name}
                onClick={() => formCollapse(setCardNameFormCollapse, setCardNameValue, card?.value)}
              >
                {card?.value}
              </p>
            }

            <span>в колонке {column?.value}</span>

            {!!card?.labels.length &&
            <div className={styles.modal__card_info_details_labels}>
              <h5 className={styles.modal__card_info_details_labels_heading}>
                МЕТКИ
              </h5>
              <div className={styles.modal__card_info_details_labels_container}>
                {card?.labels.map(label => {
                  return (
                    <div
                      key={label.id}
                      className={styles.modal__card_info_details_labels_label}
                      style={{backgroundColor: label.color}}
                      title={label.value}
                    >
                      {label.value &&
                      <p className={styles.modal__card_info_details_labels_label_value}>
                        {label.value.length > 42 ? `${label.value.slice(0, 42)}...` : label.value}
                      </p>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
            }
          </div>
        </div>

        <div className={styles.modal__card_info}>
          <span className={styles.modal__card_info_icon}>
            <i className="fas fa-align-justify" />
          </span>
          <div className={styles.modal__card_info_details}>
            <p>Описание</p>

            {card?.description && !descriptionFormCollapse ?
              <p
                className={styles.modal__card_info_details_description}
                onClick={() => formCollapse(setDescriptionFormCollapse, setDescriptionValue, card?.description)}
              >
                {card?.description}
              </p> :
              !card?.description && !descriptionFormCollapse ?
              <button
                type="button"
                onClick={() => formCollapse(setDescriptionFormCollapse, setDescriptionValue, card?.description)}
                className={styles.modal__card_info_details_button}
              >
                Добавить более подробное описание...
              </button> :
              <form
                className={styles.modal__card_info_details_add}
                onSubmit={cardDescriptionFormSubmit}
                ref={cardDescriptionRef}
              >
                <textarea
                  placeholder='Добавить более подробное описание...'
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                  autoFocus
                />
                <div className={styles.modal__card_info_details_add_actions}>
                  <button className={styles.modal__card_info_details_add_actions_save}>
                    Сохранить
                  </button>
                  <button
                    type='button'
                    className={styles.modal__card_info_details_add_actions_close}
                    onClick={() => formCollapse(setDescriptionFormCollapse, setDescriptionValue, card?.description)}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </form>
            }
          </div>
        </div>

        <div className={`${styles.modal__card_info} ${styles.modal__card_info_actions}`}>
          <div className={styles.modal__card_info_icon_and_details}>
            <span className={styles.modal__card_info_icon}>
              <i className="fas fa-align-left" />
            </span>
            <div className={styles.modal__card_info_details}>
              <p>Действия</p>
            </div>
          </div>

          <div className={styles.modal__card_info_actions_comment}>
            <div className={styles.modal__card_info_actions_comment_avatar_container}>
              <img
                src="https://trello-members.s3.amazonaws.com/60058042b46eb66edeca586b/a96d6a3db08e0252d26932585362b287/30.png"
                alt="Avatar"
              />
            </div>
            <div
              className={`${styles.modal__card_info_actions_comment_container} ${!commentFormCollapse ? styles.hide : ''}`}
              ref={commentRef}
            >
              <textarea
                placeholder='Напишите комментарий...'
                value={commentValue}
                onClick={() => (setCommentFormCollapse(true))}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <button
                className={`${styles.modal__card_info_actions_comment_save} ${!commentValue.trim() ? styles.disabled : ''}`}
                onClick={() => {
                  if(commentValue.trim()) {
                    dispatch(addCommentAction(commentValue));
                    formCollapse(setCommentFormCollapse, setCommentValue);
                  }
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
          {card?.comments.map(comment => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </div>
      </div>

      <div className={styles.modal__card_upgrades_menu}>
        <div className={styles.modal__card_upgrades}>
          <h5 className={styles.modal__card_upgrade_heading}>добавить на карточку</h5>
          <button className={styles.modal__card_upgrade_button}>
            <i className="far fa-user" />
            <p>Участники</p>
          </button>
          <button
            onClick={() => setPopoverType('label')}
            className={styles.modal__card_upgrade_button}
          >
            <i className="fas fa-tag" />
            <p>Метки</p>
          </button>
          <button className={styles.modal__card_upgrade_button}>
            <i className="far fa-check-square" />
            <p>Чек-лист</p>
          </button>
          <button className={styles.modal__card_upgrade_button}>
            <i className="far fa-clock" />
            <p>Срок</p>
          </button>
          <button className={styles.modal__card_upgrade_button}>
            <i className="fas fa-paperclip" />
            <p>Вложение</p>
          </button>
          <button
            onClick={() => setPopoverType('cover')}
            className={styles.modal__card_upgrade_button}
          >
            <i className="far fa-credit-card" />
            <p>Обложка</p>
          </button>
        </div>

        {popover()}
      </div>
    </ReactModal>
  );
}

export default Modal;
