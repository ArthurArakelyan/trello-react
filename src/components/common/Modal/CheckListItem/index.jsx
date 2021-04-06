import React from 'react';
import {useDispatch} from "react-redux";

import {completeCheckListItemAction, deleteCheckListItemAction} from '../../../../store/columns/actions';

import styles from './CheckListItem.module.scss';
import modalStyles from "../Modal.module.scss";

const CheckListItem = ({item, checklistId}) => {
  const dispatch = useDispatch();

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

        <div className={styles.item__content}>
          <span
            className={styles.item__name}
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
      </div>
    </div>
  );
}

export default CheckListItem;
