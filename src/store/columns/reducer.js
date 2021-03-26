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
  COLUMN_DRAG_START,
  EDIT_COMMENT,
  ACTIVE_LABEL,
  CHANGE_LABEL,
  DELETE_LABEL,
  CHANGE_COLUMNS_ACTIVE_LABELS,
  CREATE_LABEL
} from './actionTypes';

const initialState = {
  columns: [
    { value: 'To do',  id: nanoid(), cardsArray: [] },
    { value: 'Doing', id: nanoid(), cardsArray: [] },
    { value: 'Done', id: nanoid(), cardsArray: [] }
  ],
  labels: [
    {id: nanoid(), value: '', color: '#61bd4f'},
    {id: nanoid(), value: '', color: '#f2d600'},
    {id: nanoid(), value: '', color: '#ff9f1a'},
    {id: nanoid(), value: '', color: '#eb5a46'},
    {id: nanoid(), value: '', color: '#c377e0'},
    {id: nanoid(), value: '', color: '#0079bf'}
  ],
  columnsActiveLabels: false,
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
                comments: [],
                // labels: state.labels,
                labels: []
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
                      fullTime: moment().format(),
                      changed: false,
                      changedTime: null
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
    case EDIT_COMMENT: {
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
                    comments: card.comments.map(comment => {
                      if(comment.id === action.payload.id) {
                        if(comment.value !== action.payload.value) {
                          return {
                            ...comment,
                            value: action.payload.value,
                            changed: true,
                            changedTime: moment().format()
                          }
                        }

                        return comment;
                      }

                      return comment;
                    })
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
    case ACTIVE_LABEL: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.map(card => {
                if(card.id === state.editingColumn.card) {
                  const label = card.labels.find(label => label.id === action.payload.id);

                  if(label) {
                    return {
                      ...card,
                      labels: card.labels.filter(label => label.id !== action.payload.id)
                    }
                  }

                  return {
                    ...card,
                    labels: [...card.labels, action.payload]
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
    case CHANGE_LABEL: {
      return {
        ...state,
        columns: state.columns.map(column => {
          return {
            ...column,
            cardsArray: column.cardsArray.map(card => {
              return {
                ...card,
                labels: card.labels.map(label => label.id === action.payload.id ? action.payload : label)
              }
            })
          }
        }),
        labels: state.labels.map(label => label.id === action.payload.id ? action.payload : label)
      }
    }
    case DELETE_LABEL: {
      return {
        ...state,
        columns: state.columns.map(column => {
          return {
            ...column,
            cardsArray: column.cardsArray.map(card => {
              return {
                ...card,
                labels: card.labels.filter(label => label.id !== action.payload)
              }
            })
          }
        }),
        labels: state.labels.filter(label => label.id !== action.payload)
      }
    }
    case CHANGE_COLUMNS_ACTIVE_LABELS: {
      return {
        ...state,
        columnsActiveLabels: !state.columnsActiveLabels
      }
    }
    case CREATE_LABEL: {
      return {
        ...state,
        labels: [...state.labels, action.payload]
      }
    }
    default: {
      return state;
    }
  }
}

export default columnsReducer;
