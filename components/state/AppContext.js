import { useReducer, useContext, createContext } from "react";

const AppContext = createContext();
const DispatchContext = createContext();

export const initialState = {
  data: {},
  address: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        data: action.userInfo,
      };

    case "ADDRESS":
      return {
        ...state,
        address: action.address,
      };

    default:
      return initialState;
  }
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
