import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {createLabelAction} from "../../../../../store/columns/actions";

import labelColors from "../../../../../constants/labelColors";

import Popover from "../../../Popover";

import styles from "../EditingLabel/EditingLabel.module.scss";
import {nanoid} from "nanoid";

const CreatingLabel = ({setPopoverType, popoverRef, searchValue, setSearchValue}) => {
  const dispatch = useDispatch();

  const initialNewLabel = {
    id: nanoid(),
    value: searchValue.trim() && searchValue !== ' ' ? searchValue : '',
    color: '#61bd4f'
  }
  const [newLabel, setNewLabel] = useState(initialNewLabel);

  const create = (e) => {
    e.preventDefault();

    dispatch(createLabelAction({
      ...newLabel,
      value: newLabel.value.trim()
    }));
    setSearchValue('');
    setPopoverType('label');
    setNewLabel(initialNewLabel);
  }

  return (
    <Popover
      heading="Создание метки"
      close={() => setPopoverType(null)}
      back={() => setPopoverType('label')}
      popoverRef={popoverRef}
    >
      <form className={styles.popover__label_editing_name_section} onSubmit={create}>
        <label htmlFor="name">Название</label>
        <input
          type="text"
          id="name"
          value={newLabel.value}
          onChange={(e) => setNewLabel(label => ({
            ...label,
            value: e.target.value
          }))}
          autoFocus
        />
      </form>

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
          className={`${styles.popover__label_editing_actions_save} form__submit`}
          onClick={create}
        >
          Создать
        </button>
      </div>
    </Popover>
  );
}

export default CreatingLabel;
