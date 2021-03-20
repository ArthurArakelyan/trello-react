import {BOARD_LIKE, CHANGE_COLOR} from './actionTypes';

export function boardLikeAction() {
  return {
    type: BOARD_LIKE
  }
}

export function changeColorAction(color) {
  return {
    type: CHANGE_COLOR,
    payload: color
  }
}
