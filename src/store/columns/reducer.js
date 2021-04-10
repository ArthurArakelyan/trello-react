import {nanoid} from "nanoid";
import moment from 'moment';

import {
  ADD_COLUMN,
  ADD_CARD,
  DELETE_CARD,
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
  const move = (array, oldIndex, newIndex) => {
    if(newIndex >= array.length) {
      newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }

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
                labels: [],
                cover: {
                  type: 1,
                  color: null
                },
                checklist: []
              }]
            }
          }

          return column;
        })
      }
    }
    case DELETE_CARD: {
      return {
        ...state,
        columns: state.columns.map(column => {
          if(column.id === state.editingColumn.column) {
            return {
              ...column,
              cardsArray: column.cardsArray.filter(card => card.id !== action.payload)
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
    case ADD_CARD_COVER: {
      return {
        ...state,
        columns: state.columns.map(column => {
          return {
            ...column,
            cardsArray: column.cardsArray.map(card => {
              if(card.id === state.editingColumn.card) {
                if(card.cover.color === action.payload) {
                  return {
                    ...card,
                    cover: {
                      ...card.cover,
                      color: null
                    }
                  }
                }

                return {
                  ...card,
                  cover: {
                    ...card.cover,
                    color: action.payload
                  }
                }
              }

              return card;
            })
          }
        })
      }
    }
    case CHANGE_CARD_COVER_TYPE: {
      return {
        ...state,
        columns: state.columns.map(column => {
          return {
            ...column,
            cardsArray: column.cardsArray.map(card => {
              if(card.id === state.editingColumn.card) {
                return {
                  ...card,
                  cover: {
                    ...card.cover,
                    type: action.payload
                  }
                }
              }

              return card;
            })
          }
        })
      }
    }
    case CLEAR_CARD_COVER: {
      return {
        ...state,
        columns: state.columns.map(column => {
          return {
            ...column,
            cardsArray: column.cardsArray.map(card => {
              if(card.id === state.editingColumn.card) {
                return {
                  ...card,
                  cover: {
                    ...card.cover,
                    color: null
                  }
                }
              }

              return card;
            })
          }
        })
      }
    }
    case ADD_CHECK_LIST: {
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
                    checklist: [...card.checklist, {
                      id: nanoid(),
                      value: action.payload,
                      items: []
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
    case CHANGE_CHECK_LIST: {
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
                    checklist: card.checklist.map(list => {
                      if(list.id === action.payload.id) {
                        return {
                          ...list,
                          value: action.payload.value
                        }
                      }

                      return list;
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
    case DELETE_CHECK_LIST: {
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
                    checklist: card.checklist.filter(card => card.id !== action.payload)
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
    case ADD_CHECK_LIST_ITEM: {
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
                    checklist: card.checklist.map(list => {
                      if(list.id === action.payload.id) {
                        return {
                          ...list,
                          items: [...list.items, {
                            id: nanoid(),
                            value: action.payload.value,
                            completed: false
                          }]
                        }
                      }

                      return list;
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
    case COMPLETE_CHECK_LIST_ITEM: {
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
                    checklist: card.checklist.map(list => {
                      if(list.id === action.payload.checklistId) {
                        return {
                          ...list,
                          items: list.items.map(item => {
                            if(item.id === action.payload.id) {
                              return {
                                ...item,
                                completed: !item.completed
                              }
                            }

                            return item;
                          })
                        }
                      }

                      return list;
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
    case DELETE_CHECK_LIST_ITEM: {
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
                    checklist: card.checklist.map(list => {
                      if(list.id === action.payload.checklistId) {
                        return {
                          ...list,
                          items: list.items.filter(item => item.id !== action.payload.id)
                        }
                      }

                      return list;
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
    case CHANGE_CHECK_LIST_ITEM: {
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
                    checklist: card.checklist.map(list => {
                      if(list.id === action.payload.checklistId) {
                        return {
                          ...list,
                          items: list.items.map(item => {
                            if(item.id === action.payload.id) {
                              return {
                                ...item,
                                value: action.payload.value
                              }
                            }

                            return item;
                          })
                        }
                      }

                      return list;
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
    case CHECK_LIST_ITEM_DRAG_START: {
      return {
        ...state,
        draggedChecklistItem: action.payload
      }
    }
    case CHECK_LIST_ITEM_DROP: {
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
                    checklist: card.checklist.map(list => {
                      if(state.draggedChecklistItem.checklist.id !== action.payload.checklistId) {
                        if(list.id === action.payload.checklistId) {
                          const drop = (array, index) => {
                            index += 1;
                            array.splice(index, 0, state.draggedChecklistItem.item);
                            return array;
                          }

                          const items = drop(list.items, action.payload.index);

                          return {
                            ...list,
                            items
                          }
                        }

                        return {
                          ...list,
                          items: list.items.filter(item => item.id !== state.draggedChecklistItem.item.id)
                        }
                      }

                      if(list.id === action.payload.checklistId) {
                        const items = move(
                          list.items,
                          state.draggedChecklistItem.index,
                          action.payload.index
                        );

                        return {
                          ...list,
                          items
                        }
                      }

                      return list;
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
    default: {
      return state;
    }
  }
}

export default columnsReducer;
