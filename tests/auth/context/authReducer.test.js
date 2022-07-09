import { authReducer } from "../../../src/auth/context/AuthReducer"
import { types } from '../../../src/auth/types/types'

describe('Pruebas en authReducer', () => {
  test('debe retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {})
    expect(state).toEqual({ logged: false })
  })

  test('debe de (login) llamar el login autenticar y establecer el user', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Sergio',
        id: '123'
      }
    }

    const state = authReducer({ logged: false}, action)
    expect(state).toEqual({
      logged: true,
      user: action.payload
    })
  })

  test('debe de (logout) borrar el name del usuario y logged en false', () => {
    const action = {
      type: types.logout
    }

    const state = authReducer({ logged: false}, action)
    expect(state).toEqual({
      logged: false,
      user: null
    })
  })
  
})