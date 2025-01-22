import { createContext, useReducer } from "react";
import TodoItemsReducer from "./TodoItemsReducer";

export const TodoItemsContext = createContext();

export const TodoItemsProvider = ({children}) => {

  return <TodoItemsContext.Provider value={{todoItems, addTodoItem, deleteTodoItem, addAllTodoItems}}>
    {children}
  </TodoItemsContext.Provider>
}