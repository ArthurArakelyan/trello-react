import React, {useState, useRef, useEffect} from 'react';
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [coordinates, setCoordinates] = useState({
    clientX: 0,
    scrollLeft: 0
  });

  const scroller = useRef(null);
  const scrollerContent = useRef(null);

  const handleMouseDown = (e) => {
    const {scrollLeft} = scroller.current;

    if(e.target === scroller.current || e.target === scrollerContent.current) {
      setIsScrolling(true);
      setCoordinates({
        clientX: e.clientX,
        scrollLeft
      });
    }
  }

  const handleMouseMove = (e) => {
    const {clientX, scrollLeft} = coordinates;

    if(isScrolling && scroller && scroller.current) {
      scroller.current.scrollLeft = scrollLeft - clientX + e.clientX;
    }
  }

  const modalOpen = (column, card) => {
    dispatch(editingColumnAction(column, card));
    setModalIsOpen(true);
  }

  useEffect(() => {
    function stopScrolling() {
      setIsScrolling(false);
      setCoordinates({
        clientX: 0,
        scrollLeft: 0
      });
    }

    window.addEventListener('mouseup', stopScrolling);
    return () => window.removeEventListener('mouseup', stopScrolling);
  }, []);

  return (
    <>
      <div
        className={styles.home__columns}
        ref={scroller}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.home__columns_content} ref={scrollerContent}>
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
