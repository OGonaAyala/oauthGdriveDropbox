import {
  GET_FILES,
  UPLOAD_FILE,
  DELETE_FILES,
} from '../../constants/constants';

const initialState = {
  files: [],
};

export default (state = initialState, action) => {
  console.log(action.payload);
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

    default:
      return { ...state };
  }
};
