import React, { useReducer } from 'react';
import { CHANGE_SCREEN } from '../types';
import { MainContext } from "./MainContext";
import { MainReducer } from "./MainReducer";

const MainState = ({children}) => {
  const [state, dispatch] = useReducer(MainReducer, null);

  const changeScreen = id => dispatch({type: CHANGE_SCREEN, payload: id});

  return (
    <MainContext.Provider
      value={{
        changeScreen,
        quoteId: state,
      }}
    >
      {children}
    </MainContext.Provider>
  )
};

export default MainState;