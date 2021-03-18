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
  DELETE_COMMENT
} from './actionTypes';

const initialState = {
  columns: [
    { value: 'To do',  id: nanoid(), cardsArray: [] },
    { value: 'Doing', id: nanoid(), cardsArray: [] },
    { value: 'Done', id: nanoid(), cardsArray: [] }
  ],
  editingColumn: {}
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
    case CHANGE_CARD_NAME: {
      return {
        ...state,
        editingColumn: {
          ...state.editingColumn,
          card: {
            ...state.editingColumn.card,
            value: action.payload.value
          }
        },
        columns: state.columns.map(column => {
          if(column.id === action.payload.columnId) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === action.payload.cardId) {
                  return {
                    ...card,
                    value: action.payload.value
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
    case EDITING_COLUMN: {
      return {
        ...state,
        editingColumn: {
          column: action.payload.column,
          card: action.payload.card
        }
      }
    }
    case CHANGE_CARD_DESCRIPTION: {
      return {
        ...state,
        editingColumn: {
          ...state.editingColumn,
          card: {
            ...state.editingColumn.card,
            description: action.payload.value
          }
        },
        columns: state.columns.map(column => {
          if(column.id === action.payload.columnId) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === action.payload.cardId) {
                  return {
                    ...card,
                    description: action.payload.value
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
      const newComment = {
        id: nanoid(),
        value: action.payload.value,
        time: moment().format('MMMM Do YYYY, h:mm a'),
        fullTime: moment().format()
      }

      return {
        ...state,
        editingColumn: {
          ...state.editingColumn,
          card: {
            ...state.editingColumn.card,
            comments: [...state.editingColumn.card.comments, newComment]
          }
        },
        columns: state.columns.map(column => {
          if(column.id === action.payload.columnId) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === action.payload.cardId) {
                  return {
                    ...card,
                    comments: [...card.comments, newComment]
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
    default: {
      return state;
    }
  }
}

export default columnsReducer;
