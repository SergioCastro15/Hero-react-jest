import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
// libreria para obtener de manera mas sencilla los query parameters
import queryString from 'query-string'
import { getHeroesByName } from "../helpers/getHeroesByName"
import { HeroCard } from "../components/HeroCard"

 export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  
  const { q = '' } = queryString.parse(location.search)
  const heroes = getHeroesByName(q)

  const showSearch = (q.length === 0);
  const showError  = (q.length > 0) && heroes.length === 0;

  const { formState, onInputChange } = useForm({
    searchText: ''
  })

  const onSearchSubmit = (ev) => {
    ev.preventDefault()
    if(formState.searchText.trim().length < 1) return
    navigate(`?q=${formState.searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit} data-testid="form">
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              onChange={ onInputChange }
              value={formState.searchText}
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div 
            className="alert alert-primary" 
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div 
            className="alert alert-danger" 
            aria-label="alert-danger"
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{ q }</b>
          </div>

          {
            heroes.map( hero => (
              <HeroCard key={ hero.id } {...hero} />
            ))
          }
        </div>
      </div>

    </>
  )
}
