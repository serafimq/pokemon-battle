import PokemonCard from './PokemonCard'
import './BattleArena.css'

function BattleArena({ pokemon1, pokemon2, battleStarted, winner, onStartBattle, onTryAgain }) {
  return (
    <div className="battle-arena">
      <div className="pokemon-container">
        <PokemonCard
          pokemon={pokemon1}
          isWinner={winner?.id === pokemon1?.id}
          battleStarted={battleStarted}
          position="left"
        />
        
        <div className="vs-divider">
          <div className="vs-text">VS</div>
        </div>
        
        <PokemonCard
          pokemon={pokemon2}
          isWinner={winner?.id === pokemon2?.id}
          battleStarted={battleStarted}
          position="right"
        />
      </div>
      
      <div className="battle-controls">
        {!battleStarted && !winner && (
          <button className="battle-button start" onClick={onStartBattle}>
            🎮 Start Battle
          </button>
        )}
        
        {winner && (
          <>
            <div className="winner-announcement">
              <div className="winner-text">🏆 Winner!</div>
              <div className="winner-name">{winner.name.toUpperCase()}</div>
            </div>
            <button className="battle-button try-again" onClick={onTryAgain}>
              🔄 Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default BattleArena

