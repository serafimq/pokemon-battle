import { useState, useEffect } from 'react';
import StatsTable from "../../components/StatsTable/StatsTable.jsx";
import { getBattles, clearBattles } from "../../services/battleStorage.js";
import Loader from "../../components/Loader/Loader.jsx";

export const StatsPage = () => {
    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadBattles();
    }, []);

    const loadBattles = async () => {
        try {
            setLoading(true);
            setError(null);
            const savedBattles = await getBattles();
            setBattles(savedBattles);
        } catch (error) {
            console.error('Error loading battles:', error);
            setError('Ошибка загрузки битв. Убедитесь, что API сервер запущен (npm run server)');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        if (window.confirm('Вы уверены, что хотите очистить все битвы?')) {
            try {
                await clearBattles();
                await loadBattles();
                alert('Все битвы успешно удалены!');
            } catch (error) {
                console.error('Error clearing battles:', error);
                alert('Ошибка при удалении битв');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Loader />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
                ⚔️ Battle History ⚔️
            </h1>

            {error && (
                <div style={{
                    background: 'rgba(244, 67, 54, 0.2)',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    ⚠️ {error}
                </div>
            )}

            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={loadBattles}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >
                    🔄 Обновить
                </button>
                <button
                    onClick={handleClear}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >
                    🗑️ Очистить все
                </button>
            </div>
            <StatsTable battles={battles} />
        </div>
    );
}
