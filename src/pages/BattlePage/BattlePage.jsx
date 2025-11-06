import { useState, useEffect } from 'react'
import './BattlePage.css'
import BattleArena from "../../components/BattleArena/BattleArena.jsx";
import Stats from "../../components/Stats/Stats.jsx";
import {fetchRandomPokemon, getPokemonStats} from "../../services/pokemonAPI.js";
import {saveBattle, getBattleStats} from "../../services/battleStorage.js";
import Loader from "../../components/Loader/Loader.jsx";

function BattlePage() {
    const [pokemon1, setPokemon1] = useState(null)
    const [pokemon2, setPokemon2] = useState(null)
    const [loading, setLoading] = useState(true)
    const [battleStarted, setBattleStarted] = useState(false)
    const [winner, setWinner] = useState(null)
    const [stats, setStats] = useState({ battles: 0, winners: {} })
    const [apiError, setApiError] = useState(false)

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
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const battleStats = await getBattleStats()
            setStats(battleStats)
            setApiError(false)
        } catch (error) {
            console.error('Error loading stats:', error)
            setApiError(true)
        }
    }

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

        setTimeout(async () => {
            setWinner(battleWinner)

            // Save full battle data to API/JSON
            try {
                await saveBattle({
                    pokemon1,
                    pokemon2,
                    winner: battleWinner,
                    pokemon1Power: p1Total,
                    pokemon2Power: p2Total
                })

                // Reload stats after saving
                await loadStats()
                setApiError(false)
            } catch (error) {
                console.error('Error saving battle:', error)
                setApiError(true)
            }
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

                {apiError && (
                    <div style={{
                        background: 'rgba(244, 67, 54, 0.2)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        ⚠️ Ошибка подключения к серверу. Убедитесь, что API сервер запущен (npm run server)
                    </div>
                )}

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

export default BattlePage;

