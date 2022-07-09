import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRouter } from '../../src/router/PrivateRouter';

describe('Pruebas en el <PrivateRoute />', () => {
  test('debe de mostrar el children si esta autenticado', () => {

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'sergio'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRouter>
            <h1>Ruta publica</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect( screen.getByText('Ruta publica') ).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalled()
    // toHaveBeenCalledWith recibe los argumentos enviados , en este caso el set que se le da como nombre y los query params
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
  })
})