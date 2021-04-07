import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";

import {
  completeCheckListItemAction,
  deleteCheckListItemAction,
  changeCheckListItemAction
} from '../../../../store/columns/actions';

import useFormCollapse from "../../../../hooks/useFormCollapse";
import useOutsideClick from "../../../../hooks/useOutsideClick";

import styles from './CheckListItem.module.scss';
import modalStyles from "../Modal.module.scss";

const CheckListItem = ({item, checklistId}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const [formCollapsed, setFormCollapsed] = useState(false);
  const [value, setValue] = useState(item.value);

  const defaultFormCollapse = () => formCollapse(setFormCollapsed, setValue, item.value);

  const ref = useOutsideClick(defaultFormCollapse);
  const textareaRef = useRef(null);

  const formSubmit = (e) => {
    e.preventDefault();

    if(value.trim()) {
      dispatch(changeCheckListItemAction(checklistId, item.id, value));
      defaultFormCollapse();
    } else if(value === '') {
      dispatch(deleteCheckListItemAction(checklistId, item.id));
    } else {
      if(textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }

  return (
    <div className={`${modalStyles.modal__card_checklist_container} ${styles.item}`}>
      <div className={modalStyles.modal__card_section}>
        <div className={styles.item__checkbox}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => dispatch(completeCheckListItemAction(checklistId, item.id))}
          />
        </div>

        {!formCollapsed ?
          <div className={styles.item__content}>
            <span
              className={styles.item__name}
              onClick={defaultFormCollapse}
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
                onClick={defaultFormCollapse}
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
