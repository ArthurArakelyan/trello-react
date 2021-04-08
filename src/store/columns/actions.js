import {
  ADD_COLUMN,
  ADD_CARD,
  CHANGE_COLUMN_NAME,
  CHANGE_CARD_NAME,
  EDITING_COLUMN,
  CHANGE_CARD_DESCRIPTION,
  ADD_COMMENT,
  DELETE_COMMENT,
  DROP_COLUMN,
  COLUMN_DRAG_START,
  EDIT_COMMENT,
  ACTIVE_LABEL,
  CHANGE_LABEL,
  DELETE_LABEL,
  CHANGE_COLUMNS_ACTIVE_LABELS,
  CREATE_LABEL,
  ADD_CARD_COVER,
  CHANGE_CARD_COVER_TYPE,
  CLEAR_CARD_COVER,
  ADD_CHECK_LIST,
  CHANGE_CHECK_LIST,
  DELETE_CHECK_LIST,
  ADD_CHECK_LIST_ITEM,
  DELETE_CHECK_LIST_ITEM,
  COMPLETE_CHECK_LIST_ITEM,
  CHANGE_CHECK_LIST_ITEM,
  CHECK_LIST_ITEM_DRAG_START,
  CHECK_LIST_ITEM_DROP
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

export function editingColumnAction(column, card) {
  return {
    type: EDITING_COLUMN,
    payload: {
      column,
      card
    }
  }
}

export function changeCardNameAction(value) {
  return {
    type: CHANGE_CARD_NAME,
    payload: value
  }
}

export function changeCardDescriptionAction(value) {
  return {
    type: CHANGE_CARD_DESCRIPTION,
    payload: value
  }
}

export function addCommentAction(value) {
  return {
    type: ADD_COMMENT,
    payload: value
  }
}

export function deleteCommentAction(comment) {
  return {
    type: DELETE_COMMENT,
    payload: comment
  }
}

export function columnDragStartAction(index) {
  return {
    type: COLUMN_DRAG_START,
    payload: index
  }
}

export function dropColumnAction(index) {
  return {
    type: DROP_COLUMN,
    payload: index
  }
}

export function editCommentAction(id, value) {
  return {
    type: EDIT_COMMENT,
    payload: {
      id,
      value
    }
  }
}

export function activeLabelAction(label) {
  return {
    type: ACTIVE_LABEL,
    payload: label
  }
}

export function changeLabelAction(label) {
  return {
    type: CHANGE_LABEL,
    payload: label
  }
}

export function deleteLabelAction(id) {
  return {
    type: DELETE_LABEL,
    payload: id
  }
}

export function changeColumnsActiveLabels() {
  return {
    type: CHANGE_COLUMNS_ACTIVE_LABELS
  }
}

export function createLabelAction(label) {
  return {
    type: CREATE_LABEL,
    payload: label
  }
}

export function addCardCoverAction(color) {
  return {
    type: ADD_CARD_COVER,
    payload: color
  }
}

export function changeCardCoverTypeAction(type) {
  return {
    type: CHANGE_CARD_COVER_TYPE,
    payload: type
  }
}

export function clearCardCoverAction() {
  return {
    type: CLEAR_CARD_COVER
  }
}

export function addCheckListAction(value) {
  return {
    type: ADD_CHECK_LIST,
    payload: value
  }
}

export function changeCheckListAction(id, value) {
  return {
    type: CHANGE_CHECK_LIST,
    payload: {
      id,
      value
    }
  }
}

export function deleteCheckListAction(id) {
  return {
    type: DELETE_CHECK_LIST,
    payload: id
  }
}

export function addCheckListItemAction(value, id) {
  return {
    type: ADD_CHECK_LIST_ITEM,
    payload: {
      value,
      id
    }
  }
}

export function deleteCheckListItemAction(checklistId, id) {
  return {
    type: DELETE_CHECK_LIST_ITEM,
    payload: {
      checklistId,
      id
    }
  }
}

export function completeCheckListItemAction(checklistId, id) {
  return {
    type: COMPLETE_CHECK_LIST_ITEM,
    payload: {
      checklistId,
      id
    }
  }
}

export function changeCheckListItemAction(checklistId, id, value) {
  return {
    type: CHANGE_CHECK_LIST_ITEM,
    payload: {
      checklistId,
      id,
      value
    }
  }
}

export function checkListItemDragStartAction(checklist, index, item) {
  return {
    type: CHECK_LIST_ITEM_DRAG_START,
    payload: {
      checklist,
      index,
      item
    }
  }
}

export function checkListItemDropAction(checklistId, index, item) {
  return {
    type: CHECK_LIST_ITEM_DROP,
    payload: {
      checklistId,
      index,
      item
    }
  }
}
