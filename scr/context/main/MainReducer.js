import { CHANGE_SCREEN, FETCH_QUOTE, FETCH_QUOTES, FILTER_BY_SEARCH } from "../types";

// const handlers = {
//   [CHANGE_SCREEN]: (state, payload) => payload,
//   DEFAULT: state => state,
// };
//
// export const MainReducer = (state, action) => {
//   const handler = handlers[action.type] || handlers.DEFAULT;
//   return handler(state, action.payload);
// };

export const MainReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SCREEN: {
      return {
        ...state,
        quoteId: action.payload.symbol,
        quoteData: action.payload,
      }
    }

    default:
      return state;
  }
};