import {
  CHANGE_BOARD_NAME,
  BOARD_LIKE,
  CHANGE_COLOR,
  IMAGE_UPLOAD,
  SELECT_IMAGE,
  DELETE_IMAGE
} from './actionTypes';

export function changeBoardNameAction(value) {
  return {
    type: CHANGE_BOARD_NAME,
    payload: value
  }
}

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

export function uploadImageAction(img) {
  return {
    type: IMAGE_UPLOAD,
    payload: img
  }
}

export function selectImageAction() {
  return {
    type: SELECT_IMAGE
  }
}

export function deleteImageAction() {
  return {
    type: DELETE_IMAGE
  }
}
