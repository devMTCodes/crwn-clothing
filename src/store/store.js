import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// Currying = A funciton that returns you back another function.
// Three funcitons that return from one another

const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action);
  }
  next(action);  
}


const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
