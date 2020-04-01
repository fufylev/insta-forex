import React, { useReducer } from 'react';
import axios from 'axios'
import { DetailsContext } from "./DetailsContext";
import { DetailsReducer } from "./DetailsReducer";
import {
  CLEAR_ERROR,
  FETCH_QUOTE,
  FETCH_QUOTES,
  FILTER_BY_SEARCH,
  HIDE_LOADER,
  SHOW_ERROR,
  SHOW_LOADER
} from '../types';

const DetailsState = ({children}) => {
  const initialSate = {
    quotes: [],
    quote: [],
    quotesFiltered: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(DetailsReducer, initialSate);

  const fetchQuote = async (quoteId) => {
    const query = quoteId.replace('#','%23');
    showLoader();
    clearError();
    try {
      const response = await axios.get(`https://quotes.instaforex.com/api/quotesTick?q=${query}`);
      const quote = response.data;
      dispatch({type: FETCH_QUOTE, payload: quote});
    } catch (e) {
      showError('Something went wrong, try again');
      console.log('Error', e);
    } finally {
      hideLoader();
    }
  };

  const fetchQuotes = async () => {
    showLoader();
    clearError();
    try {
      const response = await axios.get('https://quotes.instaforex.com/api/quotesList')
      const quotes = response.data.quotesList.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
      dispatch({type: FETCH_QUOTES, payload: quotes});
    } catch (e) {
      showError('Something went wrong, try again');
      console.log('Error', e);
    } finally {
      hideLoader();
    }
  };

  const filterQuotes = (text = '') => {
    dispatch({type: FILTER_BY_SEARCH, payload: text})
  };

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});

  const showError = error => dispatch({type: SHOW_ERROR, error});
  const clearError = error => dispatch({type: CLEAR_ERROR});

  return (
    <DetailsContext.Provider
      value={{
        quotes: state.quotes,
        quote: state.quote,
        quotesFiltered: state.quotesFiltered,
        loading: state.loading,
        error: state.error,
        fetchQuotes,
        fetchQuote,
        filterQuotes
      }}
    >
      {children}
    </DetailsContext.Provider>
  )
};

export default DetailsState;