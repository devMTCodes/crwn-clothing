import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// The Actual Value you want to Access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*
EX>
	1. const userReducer = (state, action) => {
		1. return {
			1. currentUser: null or user we get back from Firebase.
		2. }
	2. 
	3. }
1. Pretty much just Functions that Return Back a New Object.
2. That's how React Determines Something has Changed/Updated In-Order to Re-Render the Page.
3. The Object is the State in the Reducer.
4. The State Allows you to Reference the Current Value in the Reducer in order to Derive what the Next Value Should be.
5. Reducers Change the Object and Properties and Values based on the Action Performed on it.
6. Also Receive back the Current State
7. Based on the State and Action it Determines what Values on the Object we want to Give Back.
*/
