import {
  BOARD_LIKE,
  CHANGE_COLOR,
  IMAGE_UPLOAD,
  SELECT_IMAGE,
  DELETE_IMAGE
} from './actionTypes';

const initialState = {
  color: 'rgb(0, 121, 191)',
  selected: 'color',
  image: '',
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
        color: action.payload,
        selected: 'color'
      }
    }
    case IMAGE_UPLOAD: {
      return {
        ...state,
        image: action.payload,
        selected: 'image'
      }
    }
    case SELECT_IMAGE: {
      return {
        ...state,
        selected: 'image'
      }
    }
    case DELETE_IMAGE: {
      return {
        ...state,
        image: '',
        selected: 'color'
      }
    }
    default: {
      return state;
    }
  }
}

export default boardReducer;
