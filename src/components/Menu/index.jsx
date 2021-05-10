import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
  changeColorAction,
  uploadImageAction,
  selectImageAction,
  deleteImageAction
} from '../../store/board/actions';

import colorsImage from './colors.jpg';

import colors from "../../constants/colors";

import styles from './Menu.module.scss';

const Menu = ({menuCollapse, menuOpen, menuClose, menuRef}) => {
  const dispatch = useDispatch();
  const {image} = useSelector(state => state.boardReducer);

  const [menuType, setMenuType] = useState('backgroundChange');

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

  const backButton = () => {
    if(menuType === 'colors') {
      return (
        <button onClick={() => setMenuType('backgroundChange')} className={styles.menu__header_back}>
          <i className="fas fa-angle-left" />
        </button>
      );
    }

    return null;
  }

  const menuContent = () => {
    if(menuType === 'backgroundChange') {
      return (
        <div className={styles.menu__backgrounds_section}>
          <div className={styles.menu__backgrounds}>
            {image ?
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
    } else if(menuType === 'colors') {
      return colors.map(color => {
        return (
          <div
            key={color}
            className={styles.menu__color}
            style={{background: color}}
            onClick={() => dispatch(changeColorAction(color))}
          />
        )
      });
    }

    return null;
  }

  return (
    <div
      ref={menuRef}
      className={`${styles.menu} ${menuOpen ? styles.open : ''} ${menuClose ? styles.hide : ''}`}
    >
      <div className={styles.menu__wrapper}>
        <div className={styles.menu__content}>
          <div className={styles.menu__header}>
            {backButton()}
            <h2 className={styles.menu__header_heading}>
              {menuType === 'backgroundChange' ? 'Смена фона' : 'Цвета'}
            </h2>
            <button onClick={menuCollapse} className={styles.menu__header_close}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.menu__body}>
            {menuContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
