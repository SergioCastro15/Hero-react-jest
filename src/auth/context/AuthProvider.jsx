import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./AuthReducer"

import { types } from '../types/types'

const initialState = {}

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return {
    // si el usuario existe, por eso se usa doble negacion
    logged: !!user,
    user: user
  }
}

export const AuthProvider = ({ children }) => {

  // el init es el initializer es una funcion que se va a ejecutar cuando se inicialice el proceso
  const [ authState, dispatch ] = useReducer(authReducer, initialState, init)

  const login = (name = '') => {
    const user = { id: 'ABC', name}
    dispatch({
      type: types.login,
      payload: user
    })
  
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({
      type: types.logout,
    })
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}
