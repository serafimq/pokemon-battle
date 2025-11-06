import './Loader.css'

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="pokeball"></div>
        <p className="loader-text">Loading Pokémon...</p>
      </div>
    </div>
  )
}

export default Loader

