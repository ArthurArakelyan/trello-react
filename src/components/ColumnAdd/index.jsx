import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {addColumnAction} from '../../store/columns/actions';

import useFormCollapse from "../../hooks/useFormCollapse";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEscClick from "../../hooks/useEscClick";

import Button from "../common/Button";

import styles from './ColumnAdd.module.scss';

const ColumnAdd = () => {
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const [formCollapsed, setFormCollapsed] = useState(false);
  const [value, setValue] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();

    if(value.trim()) {
      dispatch(addColumnAction(value));
      formCollapse(setFormCollapsed, setValue);
    }
  }

  const ref = useOutsideClick(() => setFormCollapsed(collapsed => !collapsed));
  useEscClick(() => setFormCollapsed(collapsed => !collapsed), ref);

  if(formCollapsed) {
    return (
      <div className={styles.column__add}>
        <form ref={ref} className={styles.column__add_form} onSubmit={formSubmit}>
          <input
            type="text"
            className={styles.column__add_input}
            placeholder='Ввести загаловок списка'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <div className={styles.column__add_buttons}>
            <button className={styles.column__add_submit}>
              Добавить список
            </button>

            <button
              onClick={() => setFormCollapsed(collapsed => !collapsed)}
              className={styles.column__add_close}
              type='button'
            >
              <i className='fas fa-times' />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.column__add}>
      <Button
        onClick={() => setFormCollapsed(collapsed => !collapsed)}
        className={`button ${styles.column__add_button}`}
      >
        <i className="fas fa-plus" />
        <span>Добавить ещё одну колонку</span>
      </Button>
    </div>
  );
}

export default ColumnAdd;
