import React, { useReducer, useContext } from 'react';
import axios from 'axios'
import { StyleSheet, View } from 'react-native';
import { DetailsContext } from "./DetailsContext";
import {DetailsReducer} from "./DetailsReducer";
import { MainContext } from "../main/MainContext";
import { SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_QUOTES } from '../types';

const DetailsState = ({children}) => {
  const initialSate = {
    quotes: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(DetailsReducer, initialSate);
  const { changeScreen } = useContext(MainContext);

  const fetchQuotes = async () => {
    showLoader();
    clearError();
    try {
      const response = await axios.get('https://quotes.instaforex.com/api/quotesList')
      const quotes = response.data.quotesList.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
      dispatch({ type: FETCH_QUOTES, payload: quotes });
    } catch (e) {
      showError('Something went wrong, try again');
      console.log('Error', e);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = error => dispatch({ type: CLEAR_ERROR });

  return (
    <DetailsContext.Provider
      value={{
        quotes: state.quotes,
        loading: state.loading,
        error: state.error,
        fetchQuotes
      }}
    >
      {children}
    </DetailsContext.Provider>
  )
};

DetailsState.propTypes = {};

const styles = StyleSheet.create({
  container: {}
});

export default DetailsState;