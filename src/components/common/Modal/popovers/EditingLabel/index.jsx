import React from 'react';
import {useDispatch} from "react-redux";

import {changeLabelAction, deleteLabelAction} from "../../../../../store/columns/actions";

import Popover from "../../../Popover";

import labelColors from "../../../../../constants/labelColors";

import styles from "./EditingLabel.module.scss";

const EditingLabel = ({setPopoverType, popoverRef, editingLabel, setEditingLabel}) => {
  const dispatch = useDispatch();

  return (
    <Popover
      heading="Изменение метки"
      close={() => setPopoverType(null)}
      back={() => setPopoverType('label')}
      popoverRef={popoverRef}
    >
      <div className={styles.popover__label_editing_name_section}>
        <h4 className={styles.popover__label_editing_subheading}>Название</h4>
        <input
          type="text"
          value={editingLabel.value}
          onChange={(e) => setEditingLabel(label => ({
            ...label,
            value: e.target.value
          }))}
          autoFocus
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

export default EditingLabel;
