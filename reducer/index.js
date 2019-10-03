export const initialState = {
  shows: [],
  selectedShow: {},
  messages: [
    {
      id: 1,
      username: 'admin',
      created: '2019-09-09 24:00:00',
      message: 'ble ble ble',
      active: false,
    },
    {
      id: 2,
      username: 'admin',
      created: '2019-09-09 24:00:00',
      message: 'ble ble ble',
      active: false,
    }
  ],
  favouriteCurrencies: ['USD', 'CHF', 'EUR', 'NOK']
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_FAVOURITE':
          let copy = [...state.favouriteCurrencies];
          let favourites = copy.filter(function (code) {
            return code !== action.code;
          });

          return {
            ...state,
            favouriteCurrencies: favourites
          };
        case 'DELETE_ALL_FAVOURITES':
          return {
            ...state,
            favouriteCurrencies: []
          };
        case 'ADD_FAVOURITE':
          let copy2 = [...state.favouriteCurrencies];
          copy2.push(action.code);
          return {
            ...state,
            favouriteCurrencies: copy2
          };




        case 'SET_SHOWS':
          // you can do something with payload now
          return {
            ...state,
            shows: action.shows
          };
        case 'SET_SELECTED_SHOW':
          // you can do something with payload now
          return {
            ...state,
            selectedShow: action.selectedShow
          };
        case 'SET_MESSAGES':
          // you can do something with payload now
          return {
            ...state,
            messages: action.messages
          };
        case 'ADD_MESSAGE':
          let temp = [...state.messages];
          temp.push(action.message);
          return {
            ...state,
            messages: temp
          };
        case 'DELETE_MESSAGE':
          let temp2 = [...state.messages];
          var messages = temp2.filter(function (msg) {
            return msg.id !== action.id;
          });

          return {
            ...state,
            messages: messages
          };
        case 'UPDATE_MESSAGE':
          let temp3 = [...state.messages];
          let index = 0;
          temp3.map((o, i) => {
            if (o.id === action.message.id) {
              index = i
            }
          })
          temp3[index] = action.message;
          return {
            ...state,
            messages: temp3
          };
        default:
            return state
    }
};
