import { FETCH_QUOTES } from "../types";

// const handlers = {
//   [FETCH_QUOTES]: (state, action) => ({ ...state, quotes: action.payload }),
//   DEFAULT: state => state,
// };
//
// export const DetailsReducer = (state, action) => {
//   const handler = handlers[action.type] || handlers.DEFAULT;
//   return handler(state, action.payload);
// };
export const DetailsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return {
        ...state,
        quotes: [
          ...action.payload
        ],
      };
    default:
      return state;
  }
};