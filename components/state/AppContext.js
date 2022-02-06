import { useReducer, useContext, createContext } from "react";


const AppContext = createContext();
const DispatchContext = createContext();

export const initialState = {
  data: {
  }
};

const reducer = (state, userInfo) => {
  return {
    ...state,
    data : userInfo
  };
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
      <DispatchContext.Provider value={dispatch}>
        <AppContext.Provider value={state}>{children}</AppContext.Provider>
      </DispatchContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export const useDispatchContext = () => useContext(DispatchContext);

