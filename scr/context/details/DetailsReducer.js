import { FETCH_QUOTES, FILTER_BY_SEARCH, FETCH_QUOTE } from "../types";

export const DetailsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_QUOTES: {
      return {
        ...state,
        quotes: [
          ...action.payload
        ],
        quotesFiltered: [
          ...action.payload
        ],
      }
    }

    case FILTER_BY_SEARCH: {
      const matchesFilter = new RegExp(action.payload, 'i')

      return {
        ...state,
        quotesFiltered: [
          ...state.quotes.filter(quote => matchesFilter.test(quote.symbol))
        ],
      }
    }

    case FETCH_QUOTE: {
      return {
        ...state,
        quote: [
          ...action.payload
        ],
      }
    }

    default:
      return state;
  }
};