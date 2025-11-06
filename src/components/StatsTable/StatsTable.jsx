import './StatsTable.css'

function StatsTable({ battles }) {
  if (!battles || battles.length === 0) {
    return (
      <div className="battles-container">
        <p className="no-battles">No battles recorded yet.</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Sort battles by date (newest first)
  const sortedBattles = [...battles].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="battles-container">
      <div className="battles-header">
        <h2>Total Battles: {battles.length}</h2>
      </div>
      <div className="battles-list">
        {sortedBattles.map((battle) => {
          const pokemon1Name = battle.pokemon1 || battle.pokemon1Name || 'Unknown'
          const pokemon2Name = battle.pokemon2 || battle.pokemon2Name || 'Unknown'
          const winnerName = battle.winner || battle.winnerName || 'Unknown'
          const isPokemon1Winner = winnerName === pokemon1Name
          
          return (
            <div key={battle.id} className="battle-item">
              <div className="battle-number">#{battle.id}</div>
              <div className="battle-participants">
                {battle.pokemon1Image && (
                  <img 
                    src={battle.pokemon1Image} 
                    alt={pokemon1Name}
                    className="pokemon-mini-image"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                )}
                <span className={`participant ${isPokemon1Winner ? 'winner' : 'loser'}`}>
                  {capitalize(pokemon1Name)}
                </span>
                <span className="vs">VS</span>
                <span className={`participant ${!isPokemon1Winner ? 'winner' : 'loser'}`}>
                  {capitalize(pokemon2Name)}
                </span>
                {battle.pokemon2Image && (
                  <img 
                    src={battle.pokemon2Image} 
                    alt={pokemon2Name}
                    className="pokemon-mini-image"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                )}
              </div>
              <div className="battle-winner">
                <span className="winner-label">Winner:</span>
                <span className="winner-name">{capitalize(winnerName)}</span>
              </div>
              {battle.pokemon1Power && battle.pokemon2Power && (
                <div className="battle-powers" style={{ 
                  display: 'flex', 
                  gap: '15px', 
                  justifyContent: 'center',
                  marginTop: '8px',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <span>Power: {Math.round(battle.pokemon1Power)} vs {Math.round(battle.pokemon2Power)}</span>
                </div>
              )}
              <div className="battle-date">{formatDate(battle.date)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsTable

