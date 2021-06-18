import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";

import {
  completeCheckListItemAction,
  deleteCheckListItemAction,
  changeCheckListItemAction,
  checkListItemDragStartAction,
  checkListItemDropAction
} from '../../../../store/columns/actions';

import useFormCollapseWithTextarea from "../../../../hooks/useFormCollapseWithTextarea";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import useEscClick from "../../../../hooks/useEscClick";

import styles from './CheckListItem.module.scss';
import modalStyles from "../Modal.module.scss";

const CheckListItem = ({item, checklist}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapseWithTextarea();

  const {id: checklistId, items} = checklist;

  const [formCollapsed, setFormCollapsed] = useState(false);
  const [value, setValue] = useState('');

  const ref = useOutsideClick(() => formCollapse(setFormCollapsed, setValue, item.value, false));
  useEscClick(() => formCollapse(setFormCollapsed, setValue, item.value, false), ref);

  const textareaRef = useRef(null);

  const formSubmit = (e) => {
    e.preventDefault();

    if(value.trim()) {
      dispatch(changeCheckListItemAction(checklistId, item.id, value));
      formCollapse(setFormCollapsed, setValue, item.value, false);
    } else if(value === '') {
      dispatch(deleteCheckListItemAction(checklistId, item.id));
    } else {
      if(textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }

  if(checklist.hide && item.completed) {
    return null;
  }

  return (
    <div
      className={`${modalStyles.modal__card_checklist_container} ${styles.item}`}
      draggable={true}
      onDragStart={() =>
        dispatch(checkListItemDragStartAction(checklist, items.findIndex(i => i.id === item.id), item))
      }
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedItem = items.findIndex(i => i.id === item.id);
        dispatch(checkListItemDropAction(checklistId, droppedItem, item));
      }}
    >
      <div className={modalStyles.modal__card_section}>
        <div
          className={`${styles.item__checkbox} ${item.completed ? styles.completed : ''}`}
          onClick={() => dispatch(completeCheckListItemAction(checklistId, item.id))}
        >
          {item.completed && <span />}
        </div>

        {!formCollapsed ?
          <div className={styles.item__content}>
            <span
              className={styles.item__name}
              onClick={() => formCollapse(setFormCollapsed, setValue, item.value, true)}
              style={{
                textDecoration: item.completed ? 'line-through' : '',
                color: item.completed ? '#5e6c84' : '#172b4d'
              }}
            >
              {item.value}
            </span>

            <div className={styles.item__actions}>
              <button
                onClick={() => dispatch(deleteCheckListItemAction(checklistId, item.id))}
              >
                <i className="far fa-trash-alt" />
              </button>
            </div>
          </div>
          :
          <form
            className={styles.item__form}
            onSubmit={formSubmit}
            ref={ref}
          >
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={textareaRef}
              autoFocus
            />

            <div className={modalStyles.modal__card_description_details_form_actions}>
              <button className={modalStyles.modal__card_description_details_form_actions_save}>
                Сохранить
              </button>
              <button
                type='button'
                className={modalStyles.modal__card_description_details_form_actions_close}
                onClick={() => formCollapse(setFormCollapsed, setValue, item.value, false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}

export default CheckListItem;
