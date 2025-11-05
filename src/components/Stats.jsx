import './Stats.css'

function Stats({ stats }) {
  if (!stats || stats.battles === 0) return null

  const topWinner = Object.entries(stats.winners)
    .sort(([, a], [, b]) => b - a)[0]

  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-label">Battles:</span>
        <span className="stat-value">{stats.battles}</span>
      </div>
      {topWinner && (
        <div className="stat-item">
          <span className="stat-label">Top Winner:</span>
          <span className="stat-value">{topWinner[0]} ({topWinner[1]} wins)</span>
        </div>
      )}
    </div>
  )
}

export default Stats

