import {nanoid} from "nanoid";

import {
  ADD_COLUMN,
  ADD_CARD,
  CHANGE_COLUMN_NAME,
  CHANGE_CARD_NAME,
  EDITING_COLUMN,
  CHANGE_CARD_DESCRIPTION
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
                description: ''
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
    default: {
      return state;
    }
  }
}

export default columnsReducer;
