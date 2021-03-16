import {
  ADD_COLUMN,
  ADD_CARD,
  CHANGE_COLUMN_NAME,
  CHANGE_CARD_NAME,
  EDITING_COLUMN,
  CHANGE_CARD_DESCRIPTION
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
