export const chatReducer = (currentState, action) => {
  switch (action.type) {
    case "ADD_ALL_CHATS": {
      return action.payload;
    } 
    case "ADD_CHAT": {
      return [...currentState, action.payload];
    }
    case "DELETE_CHAT": {
      return currentState.filter((chat) => chat.id !== action.payload.id);
    }
    case "UPDATE_CHAT": {
      return currentState.map((chat) =>
        chat.id === action.payload.id ? action.payload : chat
      );
    }
  }
};