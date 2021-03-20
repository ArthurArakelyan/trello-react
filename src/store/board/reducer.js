import {BOARD_LIKE, CHANGE_COLOR} from "./actionTypes";

const initialState = {
  color: 'rgb(0, 121, 191)',
  value: 'Rate',
  liked: false
}

const boardReducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case BOARD_LIKE: {
      return {
        ...state,
        liked: !state.liked
      }
    }
    case CHANGE_COLOR: {
      return {
        ...state,
        color: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default boardReducer;
