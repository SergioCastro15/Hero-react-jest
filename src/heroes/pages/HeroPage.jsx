import { useMemo } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers/getHeroById"

export const HeroPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const currentHero = useMemo(() => getHeroById(id), [id])

  const onNavigateBack = () => {
    navigate(-1)
  }

  if(!currentHero) {
    return <Navigate to="/marvel"/>
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={currentHero.superhero}
          className="img-thumbnail"
        />
      </div>

      <div className="col-8">
          <h3>{currentHero.superhero}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Alter ego:</b>{currentHero.alter_ego}</li>
            <li className="list-group-item"><b>Alter ego:</b>{currentHero.publisher}</li>
            <li className="list-group-item"><b>Alter ego:</b>{currentHero.first_appearance}</li>
          </ul>
          <h5 className="mt-3"> Characters</h5>
          <p>{currentHero.characters}</p>

          <button
            className="btn btn-outline-primary"
            onClick={onNavigateBack}
          >
            Regresar
          </button>
        </div>
    </div>
  )
}
