import { useState, useEffect } from 'react'
import BattleArena from './components/BattleArena'
import Loader from './components/Loader'
import Stats from './components/Stats'
import { fetchRandomPokemon, getPokemonStats } from './services/pokemonAPI'
import './App.css'

function App() {
  const [pokemon1, setPokemon1] = useState(null)
  const [pokemon2, setPokemon2] = useState(null)
  const [loading, setLoading] = useState(true)
  const [battleStarted, setBattleStarted] = useState(false)
  const [winner, setWinner] = useState(null)
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('pokemonBattleStats')
    return saved ? JSON.parse(saved) : { battles: 0, winners: {} }
  })

  const loadPokemon = async () => {
    setLoading(true)
    setBattleStarted(false)
    setWinner(null)

    try {
      const [p1, p2] = await Promise.all([
        fetchRandomPokemon(),
        fetchRandomPokemon()
      ])
      
      setPokemon1(p1)
      setPokemon2(p2)
    } catch (error) {
      console.error('Error loading Pokémon:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPokemon()
  }, [])

  const startBattle = () => {
    if (!pokemon1 || !pokemon2) return

    setBattleStarted(true)
    
    // Calculate battle power based on stats
    const p1Power = getPokemonStats(pokemon1)
    const p2Power = getPokemonStats(pokemon2)
    
    // Add some randomness
    const p1Total = p1Power + Math.random() * 100
    const p2Total = p2Power + Math.random() * 100
    
    // Determine winner
    const battleWinner = p1Total > p2Total ? pokemon1 : pokemon2
    
    setTimeout(() => {
      setWinner(battleWinner)
      
      // Update stats
      const newStats = {
        battles: stats.battles + 1,
        winners: {
          ...stats.winners,
          [battleWinner.name]: (stats.winners[battleWinner.name] || 0) + 1
        }
      }
      setStats(newStats)
      localStorage.setItem('pokemonBattleStats', JSON.stringify(newStats))
    }, 1500)
  }

  const handleTryAgain = () => {
    loadPokemon()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">⚔️ Pokémon Battle ⚔️</h1>
        
        <Stats stats={stats} />
        
        <BattleArena
          pokemon1={pokemon1}
          pokemon2={pokemon2}
          battleStarted={battleStarted}
          winner={winner}
          onStartBattle={startBattle}
          onTryAgain={handleTryAgain}
        />
      </div>
    </div>
  )
}

export default App

