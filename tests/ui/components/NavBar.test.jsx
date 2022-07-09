import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { Navbar } from '../../../src/ui/components/Navbar';
import { AuthContext } from '../../../src/auth/context/AuthContext';


const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  // le hace spread a todo el react-router-dom y solo modificamos el useNavigate
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en el <NavBar />', () => {

  const contextValue = {
    logged: true,
    user: {
      id: "ABC",
      name: "Juan Carlos",
    },
    logout: jest.fn()
  };
  beforeEach(() => jest.clearAllMocks());

  test('debe mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    
    expect(screen.getByText('Juan Carlos')).toBeTruthy()
  })

  test('debe de llamar al logut', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalled()
  })
})