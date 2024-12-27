// How RESELCT Works
// Creates for us a Memoized Selector (Cached in Memory Result(Variable))
// Memoization - A process in which you catche the previous value of somethind.
// So that if the Input has not changed, you return back the same Output.
// Works when you have a PureFunction
// If inputs dont change then outputs should not change.
// const add = (a, b) => a + b;

// add(3, 6); // 9

// With Reselect - Create Input Selectors and Output Selectors
// Input Selectors - Selectors that give us the Parameters that we need in order to determine what our Output should be.

// createSelector - create a memoized selector , takes 2 arguments
// 1st - Array of Input Selectors - []
//     - what do I want as Part of the Parameters that I'm going to use to Produce what the Selector should return back.
//     - what are the slices that I want from REDUX so that I can use them to Produce Something New Outside.
// Looking to get categories  - state.categories
// [selectCategoryReducer] goes in as 1st and will Output whatever it Outputs (state) => state.categories;
// Whatever we want to get as the Output will be the argument for the 2nd
// 2nd - Output Selector - () =>
// selectCategoryReducer is looking to get the categories from the state.
// so that will be what be pass as argument for 2nd as Output
// call it categoriesSlice - thats the slice from the 1st

// EX
/* export const selectCategories = createSelector(
  [selectCategoryReducer, selectCurrentUser], - selecting Current User
  (categoriesSlice, currentUser) => - 2nd arg will be currentUser
)
*/

import {createSelector} from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer], // 1st - what are we trying to get Outputted
  (categoriesSlice) => categoriesSlice.categories // 2nd - Getting categories value from the Slice
) // The only time this will run is if this categoriesSlice object we get back from selectCategoryReducer is different.
// If the Input Value (categories) changes - Only Then - does RESELECT determine a RERUN of this METHOD.
// If the categories object is always the same in memory (which it will be) then the 2nd will always be the same value.

// Because we did not want to run this .reduce if categories had not changed (to increase performance) 

export const selectCategoriesMap = createSelector(
  [selectCategories], // passing this here momoizes it here and up top.
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);


// Whats Happenening here it...
// As long as the [categories] Array Does Not Change - Do Not ReRun This Method except Once ((selectcategoriesMap)).reduce
// Just Give Me Back The Previously Calculated Value.