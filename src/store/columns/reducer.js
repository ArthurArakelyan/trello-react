import {nanoid} from "nanoid";
import moment from 'moment';

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
  COLUMN_DRAG_START
} from './actionTypes';

const initialState = {
  columns: [
    { value: 'To do',  id: nanoid(), cardsArray: [] },
    { value: 'Doing', id: nanoid(), cardsArray: [] },
    { value: 'Done', id: nanoid(), cardsArray: [] }
  ],
  editingColumn: {
    column: null,
    card: null
  }
}

const columnsReducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_COLUMN: {
      return {
        ...state,
        columns: [...state.columns, {
          value: action.payload,
          id: nanoid(),
          cardsArray: []
        }]
      }
    }
    case ADD_CARD: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === action.payload.id) {
            return {
              ...column,
              cardsArray: [...column.cardsArray, {
                value: action.payload.value,
                id: nanoid(),
                description: '',
                comments: []
              }]
            }
          }

          return column;
        })
      }
    }
    case CHANGE_COLUMN_NAME: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === action.payload.id) {
            return {
              ...column,
              value: action.payload.value
            }
          }

          return column;
        })
      }
    }
    case EDITING_COLUMN: {
      return {
        ...state,
        editingColumn: {
          column: action.payload.column,
          card: action.payload.card
        }
      }
    }
    case CHANGE_CARD_NAME: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === state.editingColumn.card) {
                  return {
                    ...card,
                    value: action.payload
                  }
                }

                return card;
              })
            }
          }

          return column;
        })
      }
    }
    case CHANGE_CARD_DESCRIPTION: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === state.editingColumn.card) {
                  return {
                    ...card,
                    description: action.payload
                  }
                }

                return card;
              })
            }
          }

          return column;
        })
      }
    }
    case ADD_COMMENT: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === state.editingColumn.card) {
                  return {
                    ...card,
                    comments: [...card.comments, {
                      id: nanoid(),
                      value: action.payload,
                      time: moment().format('MMMM Do YYYY, h:mm a'),
                      fullTime: moment().format()
                    }]
                  }
                }

                return card;
              })
            }
          }

          return column;
        })
      }
    }
    case DELETE_COMMENT: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === state.editingColumn.card) {
                  return {
                    ...card,
                    comments: card.comments.filter(comment => comment.id !== action.payload)
                  }
                }

                return card;
              })
            }
          }

          return column;
        })
      }
    }
    case COLUMN_DRAG_START: {
      return {
        ...state,
        draggedColumn: action.payload
      }
    }
    case DROP_COLUMN: {
      const move = (array, oldIndex, newIndex) => {
        if(newIndex >= array.length) {
          newIndex = array.length - 1;
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array;
      }

      const newColumns = move(state.columns, state.draggedColumn, action.payload).map(col => col);

      return {
        ...state,
        columns: newColumns
      }
    }
    default: {
      return state;
    }
  }
}

export default columnsReducer;
