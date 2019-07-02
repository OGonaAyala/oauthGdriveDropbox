import { SAVE_TOKEN } from '../../constants/constants';

const initialState = {
  token: '',
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return { ...state };
  }
};
