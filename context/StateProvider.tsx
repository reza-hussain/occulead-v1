import { createContext, useContext, useState } from "react";

interface ContextType {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

const initialState: ContextType = {
  currentUser: {},
  setCurrentUser: () => {}
};

const StateContext = createContext(initialState);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  return (
    <StateContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useStateValue = () => useContext(StateContext);
