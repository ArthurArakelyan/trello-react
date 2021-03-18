import {
  ADD_COLUMN,
  ADD_CARD,
  CHANGE_COLUMN_NAME,
  CHANGE_CARD_NAME,
  EDITING_COLUMN,
  CHANGE_CARD_DESCRIPTION,
  ADD_COMMENT,
  DELETE_COMMENT
} from './actionTypes';

export function addColumnAction(value) {
  return {
    type: ADD_COLUMN,
    payload: value
  }
}

export function addCardAction(id, value) {
  return {
    type: ADD_CARD,
    payload: {
      id,
      value
    }
  }
}

export function changeColumnNameAction(id, value) {
  return {
    type: CHANGE_COLUMN_NAME,
    payload: {
      id,
      value
    }
  }
}

export function changeCardNameAction(cardId, columnId, value) {
  return {
    type: CHANGE_CARD_NAME,
    payload: {
      cardId,
      columnId,
      value
    }
  }
}

export function editingColumnAction(column, card) {
  return {
    type: EDITING_COLUMN,
    payload: {
      column,
      card
    }
  }
}

export function changeCardDescriptionAction(cardId, columnId, value) {
  return {
    type: CHANGE_CARD_DESCRIPTION,
    payload: {
      value,
      cardId,
      columnId
    }
  }
}

export function addCommentAction(cardId, columnId, value) {
  return {
    type: ADD_COMMENT,
    payload: {
      cardId,
      columnId,
      value
    }
  }
}

export function deleteCommentAction(cardId) {
  return {
    type: DELETE_COMMENT,
    payload: cardId
  }
}
