import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            
        case 'UPDATE':
            
        case 'DELETE':
            
        case 'SET':
            return {
                todos: action.payload
            }
        default:
        return todos
    }
}

// Create the provider component
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    todos: null
  });
  // Function to fetch global data
  const getGlobalData = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
      dispatch({type: "SET", payload: data});
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch global data on component mount
  useEffect(() => {
    getGlobalData();
  }, []);

  return (
    <GlobalContext.Provider value={{...state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};