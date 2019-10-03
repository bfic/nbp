import {loadState, saveState} from './../helpers/localStorage'

export const initialState = {
  favouriteCurrencies: []
}

/* After each action we are storing new state in localStorage */
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FAVOURITES':
          // ta akcje zapisuje w storze initialState pobrany z localStorage
          return {
            ...state,
            favouriteCurrencies: action.favouriteCurrencies
          }
        case 'DELETE_FAVOURITE':
          let copy = [...state.favouriteCurrencies];
          let favourites = copy.filter(function (code) {
            return code !== action.code;
          });
          saveState({
            ...state,
            favouriteCurrencies: favourites
          })
          return {
            ...state,
            favouriteCurrencies: favourites
          };
        case 'DELETE_ALL_FAVOURITES':
          saveState({
            ...state,
            favouriteCurrencies: []
          })
          return {
            ...state,
            favouriteCurrencies: []
          };
        case 'ADD_FAVOURITE':
          let copy2 = [...state.favouriteCurrencies];
          copy2.push(action.code);
          saveState({
            ...state,
            favouriteCurrencies: copy2
          })
          return {
            ...state,
            favouriteCurrencies: copy2
          };
        default:
            return state
    }
};
