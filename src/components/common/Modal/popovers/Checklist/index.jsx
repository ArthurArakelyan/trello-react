import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {addCheckListAction} from "../../../../../store/columns/actions";

import Popover from "../../../Popover";

import styles from "./Checklist.module.scss";

const Checklist = ({setPopoverType, popoverRef}) => {
  const dispatch = useDispatch();

  const [checkListValue, setCheckListValue] = useState('Чек-лист');

  const checkListFormSubmit = (e) => {
    e.preventDefault();
    if(checkListValue.trim()) {
      dispatch(addCheckListAction(checkListValue));
      setCheckListValue('Чек-лист');
      setPopoverType(null);
    }
  }

  return (
    <Popover
      heading="Добавление списка задач"
      close={() => setPopoverType(null)}
      popoverRef={popoverRef}
    >
      <form
        className={styles.popover__checkList_form}
        onSubmit={checkListFormSubmit}
      >
        <label htmlFor="checkList" className={styles.popover__checklist_subheading}>
          Название
        </label>
        <input
          id="checkList"
          type="text"
          autoFocus
          value={checkListValue}
          onChange={(e) => setCheckListValue(e.target.value)}
        />
        <button className="form__submit">
          Добавить
        </button>
      </form>
    </Popover>
  );
}

export default Checklist;
