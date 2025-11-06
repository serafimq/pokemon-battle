import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
    const location = useLocation()

    return (
        <nav className="navigation">
            <div className="navigation-container">
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    ⚔️ Битва
                </Link>
                <Link 
                    to="/stats" 
                    className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
                >
                    📊 Статистика
                </Link>
            </div>
        </nav>
    )
}

export default Navigation

