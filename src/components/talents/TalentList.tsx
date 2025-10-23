import { useState, useEffect } from 'react';
import type { Talent } from '../../types/talent';
import { talentService } from '../../services/talentService';
import styles from './TalentList.module.css';

export default function TalentList() {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTalents = async () => {
        try {
            setLoading(true);
            const data = await talentService.getAll();
            setTalents(data);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao carregar');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este talento?')) return;
        try {
            await talentService.delete(id);
            loadTalents();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao excluir');
        }
    };

    useEffect(() => {
        loadTalents();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Carregando...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Lista de Talentos</h2>
                <button className={styles.refreshBtn} onClick={loadTalents}>
                    🔄 Atualizar
                </button>
            </div>

            {talents.length === 0 ? (
                <p className={styles.empty}>Nenhum talento cadastrado</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talents.map((talent) => (
                            <tr key={talent.id}>
                                <td>{talent.name}</td>
                                <td>{talent.cnpj}</td>
                                <td>
                                    <span className={`${styles.status} ${talent.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive}`}>
                                        {talent.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(talent.id)}
                                    >
                                        🗑️ Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
