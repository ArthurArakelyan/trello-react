import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {deleteCheckListAction, addCheckListItemAction} from "../../../../store/columns/actions";

import CheckListItem from "../CheckListItem";

import useFormCollapse from "../../../../hooks/useFormCollapse";
import useOutsideClick from "../../../../hooks/useOutsideClick";

import modalStyles from '../Modal.module.scss';
import styles from './CheckList.module.scss';

const CheckList = ({list}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const [formCollapsed, setFormCollapsed] = useState(false);
  const [value, setValue] = useState('');

  const completedItems = list.items.filter(item => item.completed).length;
  let percentage = 0;
  if(list.items.length) {
    percentage = Math.round((completedItems / list.items.length) * 100);
  }

  const formSubmit = (e) => {
    e.preventDefault();

    if(value.trim()) {
      dispatch(addCheckListItemAction(value, list.id));
      formCollapse(setFormCollapsed, setValue);
    }
  }

  const ref = useOutsideClick(() => formCollapse(setFormCollapsed, setValue));

  return (
    <div className={styles.modal__card_checklist}>
      <div className={styles.modal__card_checklist_container}>
        <div className={modalStyles.modal__card_section}>
          <div className={`${modalStyles.modal__card_detail_icon} ${styles.modal__card_checklist_header_icon}`}>
            <i className="far fa-check-square" />
          </div>
          <div className={styles.modal__card_checklist_header}>
            <p className={styles.modal__card_detail_heading}>
              {list.value}
            </p>
            <button
              className={styles.modal__card_checklist_header_delete}
              onClick={() => dispatch(deleteCheckListAction(list.id))}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.modal__card_checklist_container} ${styles.modal__card_checklist_progress}`}>
        <div className={modalStyles.modal__card_section}>
          <div className={styles.modal__card_checklist_progress_percentage}>
            <p>{percentage}%</p>
          </div>
          <div className={styles.modal__card_checklist_progress_bar}>
            <div
              style={{width: `${percentage}%`}}
              className={percentage !== 100 ? '' : styles.completed}
            />
          </div>
        </div>
      </div>

      {!!list.items.length &&
        <div className={styles.modal__card_checklist_items}>
          {list.items.map(item => {
            return <CheckListItem key={item.id} checklistId={list.id} item={item} />
          })}
        </div>
      }

      <div className={styles.modal__card_checklist_container}>
        <div className={modalStyles.modal__card_section}>
          {formCollapsed ?
            <form
              className={modalStyles.modal__card_description_details_form}
              onSubmit={formSubmit}
              ref={ref}
            >
              <textarea
                placeholder='Добавить более подробное описание...'
                className={styles.modal__card_checklist_textarea}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
              <div className={modalStyles.modal__card_description_details_form_actions}>
                <button className={modalStyles.modal__card_description_details_form_actions_save}>
                  Добавить
                </button>
                <button
                  type='button'
                  className={modalStyles.modal__card_description_details_form_actions_close}
                  onClick={() => formCollapse(setFormCollapsed, setValue)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </form>
            :
            <button
              className={styles.modal__card_checklist_add_item}
              onClick={() => formCollapse(setFormCollapsed, setValue)}
            >
              Добавить элемент
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default CheckList;
