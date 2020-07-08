import { useReducer, useCallback } from 'react';

/**
 * Custom hook to utilize thunk reducer
 * @param {*} reducer 
 * @param {*} initialState 
 */
const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = useCallback(action => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action); // {POJO}
    };
  }, [dispatch]);
  return [state, thunkDispatch];
}

export default useThunkReducer;