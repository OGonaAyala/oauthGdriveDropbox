import {
  GET_FILES,
  UPLOAD_FILE,
  DELETE_FILES,
  SHARE_LINK,
} from '../../constants/constants';

const initialState = {
  files: [],
  link: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
      };

    case UPLOAD_FILE:
      return { ...state, files: [action.payload, ...state.files] };

    case DELETE_FILES:
      return {
        ...state,
        files: [...state.files.filter(file => file.id !== action.payload.id)],
      };

    case SHARE_LINK:
      return {
        ...state,
        link: [action.payload, ...state.link],
      };

    default:
      return { ...state };
  }
};
