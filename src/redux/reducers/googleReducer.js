import { GET_FILES } from '../../constants/constants';

const initialState = {
  files: [],
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
      };

    default:
      return { ...state };
  }
};
