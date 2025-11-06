const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Получить все битвы из API
 */
export const getBattles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/battles`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch battles')
    }
    
    const data = await response.json()
    return data.battles || []
  } catch (error) {
    console.error('Error loading battles from API:', error)
    throw error
  }
}

/**
 * Сохранить битву через API
 */
export const saveBattle = async (battle) => {
  try {
    const newBattle = {
      pokemon1: battle.pokemon1.name,
      pokemon1Id: battle.pokemon1.id,
      pokemon1Image: battle.pokemon1.image,
      pokemon1Stats: {
        hp: battle.pokemon1.hp,
        attack: battle.pokemon1.attack,
        defense: battle.pokemon1.defense,
        speed: battle.pokemon1.speed,
        types: battle.pokemon1.types
      },
      pokemon2: battle.pokemon2.name,
      pokemon2Id: battle.pokemon2.id,
      pokemon2Image: battle.pokemon2.image,
      pokemon2Stats: {
        hp: battle.pokemon2.hp,
        attack: battle.pokemon2.attack,
        defense: battle.pokemon2.defense,
        speed: battle.pokemon2.speed,
        types: battle.pokemon2.types
      },
      winner: battle.winner.name,
      winnerId: battle.winner.id,
      date: new Date().toISOString(),
      pokemon1Power: battle.pokemon1Power,
      pokemon2Power: battle.pokemon2Power
    }
    
    const response = await fetch(`${API_BASE_URL}/api/battles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBattle),
    })
    
    if (!response.ok) {
      throw new Error('Failed to save battle')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error saving battle:', error)
    throw error
  }
}

/**
 * Очистить все битвы через API
 */
export const clearBattles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/battles/clear`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to clear battles')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error clearing battles:', error)
    throw error
  }
}

/**
 * Получить статистику битв
 */
export const getBattleStats = async () => {
  try {
    const battles = await getBattles()
    
    const stats = {
      battles: battles.length,
      winners: {}
    }
    
    battles.forEach(battle => {
      const winner = battle.winner
      stats.winners[winner] = (stats.winners[winner] || 0) + 1
    })
    
    return stats
  } catch (error) {
    console.error('Error getting battle stats:', error)
    return { battles: 0, winners: {} }
  }
}
