import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {deleteImageAction, selectImageAction, uploadImageAction} from "../../../store/board/actions";

import colorsImage from "../colors.jpg";

import styles from "./Backgrounds.module.scss";
import "../animation.scss";

const Backgrounds = ({menuIsOpen, setMenuType}) => {
  const dispatch = useDispatch();
  const {image} = useSelector(state => state.boardReducer);

  const [collapsed, setCollapsed] = useState(false);
  const [showImage, setShowImage] = useState(true)

  useEffect(() => {
    if(!menuIsOpen) {
      setTimeout(() => setShowImage(false), 300);
    } else {
      setShowImage(true);
    }
  }, [menuIsOpen]);

  useEffect(() => {
    setCollapsed(true);
  }, []);

  const imageUpload = (e) => {
    if(e.target.files && e.target.files[0]) {
      if(e.target.files[0].size <= 5000000 && e.target.files[0].type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => dispatch(uploadImageAction(e.target.result));
        reader.readAsDataURL(e.target.files[0]);
      } else if(!e.target.files[0].type.includes('image')) {
        alert('Only images');
      } else {
        alert('No more 5MB');
      }
    }
  }

  return (
    <div className={`${styles.menu__backgrounds_wrapper} animation ${collapsed ? 'collapsed' :''}`}>
      <div className={styles.menu__backgrounds}>
        {image && showImage ?
          <div
            className={styles.menu__background}
            onClick={() => dispatch(selectImageAction())}
          >
            <img className={styles.menu__background_image} src={image} alt="Background"/>
            <p className={styles.menu__background_title}>Фотография</p>
          </div>
          :
          <label
            className={styles.menu__background}
            onChange={imageUpload}
            htmlFor="image"
          >
            <div className={styles.menu__background_add_image}>
              <input type="file" id="image" />
              <i className="fas fa-plus" />
            </div>
            <p className={styles.menu__background_title}>Добавить фотографию</p>
          </label>
        }

        <div
          className={styles.menu__background}
          onClick={() => setMenuType('colors')}
        >
          <img className={styles.menu__background_image} src={colorsImage} alt="Colors"/>
          <p className={styles.menu__background_title}>Цвета</p>
        </div>
      </div>

      {image &&
        <button
          className={styles.menu__backgrounds_delete_image}
          onClick={() => dispatch(deleteImageAction())}
        >
          Удалить фотографию
        </button>
      }
    </div>
  );
}

export default Backgrounds;
