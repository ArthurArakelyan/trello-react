import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import Column from "../Column";
import ColumnAdd from "../ColumnAdd";
import Modal from "../common/Modal";

import {editingColumnAction} from '../../store/columns/actions';

import styles from './Columns.module.scss';

const Columns = () => {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columnsReducer.columns);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalOpen = (column, card) => {
    dispatch(editingColumnAction(column, card));
    setModalIsOpen(true);
  }

  return (
    <>
      <div className={styles.home__columns}>
        <div className={styles.home__columns_content}>
          {columns.map(column => {
            return (
              <Column
                key={column.id}
                column={column}
                modalOpen={modalOpen}
              />
            )
          })}
          <ColumnAdd />
        </div>
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        modalClose={() => setModalIsOpen(false)}
      />
    </>
  );
}

export default Columns;
