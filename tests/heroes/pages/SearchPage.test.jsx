import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes'


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <SearchPage />', () => {
  test('debe de mostrarse correctamente los valores por defecto', () => {
    const {container} = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar a batman y el input con el valor del querystring', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'batman'}})

    expect(input.value).toBe('batman')

    const alert = screen.getByLabelText('alert-danger');
    expect(alert.style.display).toBe('none');
  })

  test('debe reconocer el query parameter y llamar a la funcion del form', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { name: 'searchText', value: 'superman'}})

    const form = screen.getByTestId('form')
    fireEvent.submit(form)

    expect(mockedUseNavigate).toHaveBeenCalled()
    expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=superman')
  })
})