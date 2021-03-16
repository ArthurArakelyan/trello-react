import {BOARD_LIKE} from "./actionTypes";

const initialState = {
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
    default: {
      return state;
    }
  }
}

export default boardReducer;
