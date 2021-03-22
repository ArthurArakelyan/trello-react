import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import moment from "moment";

import {deleteCommentAction, editCommentAction} from "../../../../store/columns/actions";

import useFormCollapse from "../../../../hooks/useFormCollapse";

import styles from './Comment.module.scss';

const Comment = ({comment}) => {
  const {time, fullTime, value} = comment;
  const dispatch = useDispatch();
  const formCollapse = useFormCollapse();

  const [commentEditingCollapse, setCommentEditingCollapse] = useState(false);
  const [commentValue, setCommentValue] = useState(value);

  const commentSave = () => {
    if(commentValue.trim()) {
      dispatch(editCommentAction(comment.id, commentValue));
      formCollapse(setCommentEditingCollapse, setCommentValue, value);
    }
  }

  return (
    <div className={styles.modal__card_info_actions_comment_comment} key={comment.id}>
      <div className={styles.modal__card_info_actions_comment_comment_avatar_section}>
        <img src="https://trello-members.s3.amazonaws.com/60058042b46eb66edeca586b/a96d6a3db08e0252d26932585362b287/30.png" alt="Avatar"/>
      </div>
      <div className={styles.modal__card_info_actions_comment_comment_info_section}>
        <div className={styles.modal__card_comment_time}>
          <p className={styles.modal__card_comment_time_username}>
            user
          </p>
          <div title={time} className={styles.modal__card_comment_created_time}>
            <span>{moment(fullTime).fromNow()}</span>
          </div>
        </div>

        {!commentEditingCollapse && <p className={styles.modal__card_comment_value}>{value}</p>}

        {commentEditingCollapse ?
          <div className={styles.modal__card_comment_edit}>
            <textarea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              autoFocus
            />
            <div className={styles.modal__card_comment_edit_actions}>
              <button
                onClick={commentSave}
                className={styles.modal__card_comment_edit_save}
              >
                Сохранить
              </button>
              <button
                onClick={() => formCollapse(setCommentEditingCollapse, setCommentValue, commentValue)}
                className={styles.modal__card_comment_edit_close}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          :
          <div className={styles.modal__card_comment_actions}>
            <button
              onClick={() => formCollapse(setCommentEditingCollapse, setCommentValue, commentValue)}
            >
              Изменить
            </button>
            <span>-</span>
            <button
              onClick={() => dispatch(deleteCommentAction(comment.id))}
            >
              Удалить
            </button>
          </div>}
      </div>
    </div>
  );
}

export default Comment;
