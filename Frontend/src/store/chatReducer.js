export const chatReducer = (currentState, action) => {
  switch (action.type) {
    case "ADD_ALL_CHATS": {
      return action.payload;
    }
    case "ADD_CHAT": {
      return [...currentState, action.payload];
    }
    case "DELETE_CHAT": {
      return currentState.filter((chat) => chat._id !== action.payload);
    }
    case "UPDATE_CHAT": {
      return currentState.map((chat) =>
        chat.id === action.payload._id ? action.payload : chat
      );
    }
    case "FETCH_CHATS": {
      return currentState.find((chat) => chat._id === action.payload);
    }
    default: {
      return currentState;
    }
  }
};