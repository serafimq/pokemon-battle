import './PokemonCard.css'

function PokemonCard({ pokemon, isWinner, battleStarted, position }) {
  if (!pokemon) return null

  const cardClasses = `pokemon-card ${position} ${isWinner ? 'winner' : ''} ${battleStarted ? 'battle-active' : ''}`

  return (
    <div className={cardClasses}>
      <div className="pokemon-image-container">
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="pokemon-image"
        />
        {isWinner && <div className="winner-glow"></div>}
      </div>
      
      <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        
        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span key={type} className={`type-badge type-${type}`}>
              {type}
            </span>
          ))}
        </div>
        
        <div className="pokemon-stats">
          <div className="stat-item">
            <span className="stat-label">HP</span>
            <span className="stat-value">{pokemon.hp}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ATK</span>
            <span className="stat-value">{pokemon.attack}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">DEF</span>
            <span className="stat-value">{pokemon.defense}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">SPD</span>
            <span className="stat-value">{pokemon.speed}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard

