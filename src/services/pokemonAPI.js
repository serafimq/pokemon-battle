const POKEMON_API_BASE = 'https://pokeapi.co/api/v2'

// Fetch a random Pokémon (there are ~1000+ Pokémon)
const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 1000) + 1
}

export const fetchRandomPokemon = async () => {
  try {
    const id = getRandomPokemonId()
    const response = await fetch(`${POKEMON_API_BASE}/pokemon/${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon')
    }
    
    const data = await response.json()
    
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
      attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
      defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
      speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
      types: data.types.map(t => t.type.name)
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    throw error
  }
}

export const getPokemonStats = (pokemon) => {
  if (!pokemon) return 0
  return pokemon.hp + pokemon.attack + pokemon.defense + pokemon.speed
}

