import React, {useEffect, useState, useRef} from 'react';
import {useDispatch} from "react-redux";

import {
  deleteCheckListAction,
  addCheckListItemAction,
  changeCheckListAction,
  toggleCompletedCheckListItems
} from "../../../../store/columns/actions";

import CheckListItem from "../CheckListItem";

import useFormCollapse from "../../../../hooks/useFormCollapse";
import useFormCollapseWithTextarea from "../../../../hooks/useFormCollapseWithTextarea";
import useOutsideClick from "../../../../hooks/useOutsideClick";

import modalStyles from '../Modal.module.scss';
import styles from './CheckList.module.scss';

const CheckList = ({list}) => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();
  const formCollapseWithTextarea = useFormCollapseWithTextarea();

  const [itemFormCollapsed, setItemFormCollapsed] = useState(false);
  const [itemValue, setItemValue] = useState('');

  const [editingFormCollapsed, setEditingFormCollapsed] = useState(false);
  const [editingValue, setEditingValue] = useState('');

  const completedItems = list.items.filter(item => item.completed).length;
  let percentage = 0;
  if(list.items.length) {
    percentage = Math.round((completedItems / list.items.length) * 100);
  }

  const itemFormRef = useOutsideClick(() => formCollapse(setItemFormCollapsed, setItemValue));
  const itemTextareaRef = useRef(null);
  const editingFormRef = useOutsideClick(() =>
    formCollapseWithTextarea(setEditingFormCollapsed, setEditingValue, list.value, false)
  );

  useEffect(() => {
    if(itemValue === '' && itemTextareaRef.current) {
      itemTextareaRef.current.focus();
    }
  }, [itemValue]);

  const itemFormSubmit = (e) => {
    e.preventDefault();

    if(itemValue.trim()) {
      dispatch(addCheckListItemAction(itemValue, list.id));
      setItemValue('');
    } else {
      if(itemTextareaRef.current) {
        itemTextareaRef.current.focus();
      }
    }
  }

  const editingFormSubmit = (e) => {
    e.preventDefault();

    if(editingValue.trim()) {
      dispatch(changeCheckListAction(list.id, editingValue));
      formCollapse(setEditingFormCollapsed, setEditingValue, list.value)
    }
  }

  return (
    <div className={styles.modal__card_checklist}>
      <div className={styles.modal__card_checklist_container}>
        <div className={modalStyles.modal__card_section}>
          <div className={`${modalStyles.modal__card_detail_icon} ${styles.modal__card_checklist_header_icon} ${editingFormCollapsed ? styles.editing : ''}`}>
            <i className="far fa-check-square" />
          </div>
          {!editingFormCollapsed ?
            <div className={styles.modal__card_checklist_header}>
              <p
                className={`${modalStyles.modal__card_detail_heading} ${styles.modal__card_checklist_heading}`}
                onClick={() => formCollapseWithTextarea(setEditingFormCollapsed, setEditingValue, list.value, true)}
              >
                {list.value}
              </p>
              <div className={styles.modal__card_checklist_actions}>
                {!!completedItems &&
                  <button
                    className={styles.modal__card_checklist_header_hide}
                    onClick={() => dispatch(toggleCompletedCheckListItems(list.id))}
                  >
                    {list.hide ? `Показать отмеченные элементы (${completedItems})` : 'Скрывать отмеченные пункты'}
                  </button>
                }
                <button
                  onClick={() => dispatch(deleteCheckListAction(list.id))}
                >
                  Удалить
                </button>
              </div>
            </div>
            :
            <form
              className={styles.modal__card_checklist_form}
              onSubmit={editingFormSubmit}
              ref={editingFormRef}
            >
              <textarea
                placeholder='Добавить более подробное описание...'
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                autoFocus
              />

              <div className={modalStyles.modal__card_description_details_form_actions}>
                <button className={modalStyles.modal__card_description_details_form_actions_save}>
                  Сохранить
                </button>
                <button
                  type='button'
                  className={modalStyles.modal__card_description_details_form_actions_close}
                  onClick={() => formCollapseWithTextarea(setEditingFormCollapsed, setEditingValue, list.value, false)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </form>
          }
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
            return <CheckListItem key={item.id} checklist={list} item={item} />
          })}
          {completedItems === list.items.length && list.hide ?
            <div className={styles.modal__card_checklist_container}>
              <div className={modalStyles.modal__card_section}>
                <div className={styles.modal__card_checklist_header}>
                  <p className={styles.modal__card_checklist_completed_message}>Отмечены все элементы!</p>
                </div>
              </div>
            </div>
            :
            null
          }
        </div>
      }

      <div className={styles.modal__card_checklist_container}>
        <div className={modalStyles.modal__card_section}>
          {itemFormCollapsed ?
            <form
              className={modalStyles.modal__card_description_details_form}
              onSubmit={itemFormSubmit}
              ref={itemFormRef}
            >
              <textarea
                placeholder='Добавить более подробное описание...'
                className={styles.modal__card_checklist_textarea}
                value={itemValue}
                onChange={(e) => setItemValue(e.target.value)}
                ref={itemTextareaRef}
                autoFocus
              />
              <div className={modalStyles.modal__card_description_details_form_actions}>
                <button className={modalStyles.modal__card_description_details_form_actions_save}>
                  Добавить
                </button>
                <button
                  type='button'
                  className={modalStyles.modal__card_description_details_form_actions_close}
                  onClick={() => formCollapse(setItemFormCollapsed, setItemValue)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </form>
            :
            <button
              className={styles.modal__card_checklist_add_item}
              onClick={() => formCollapse(setItemFormCollapsed, setItemValue)}
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
