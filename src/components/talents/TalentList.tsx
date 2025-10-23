import { useState, useEffect } from 'react';
import type { Talent } from '../../types/talent';
import { talentService } from '../../services/talentService';

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
        if (!confirm('Excluir?')) return;
        try {
            await talentService.delete(id);
            console.log("Fffff", id);

            loadTalents();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao excluir');
        }
    };

    useEffect(() => {
        loadTalents();
    }, []);

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <h2>Lista de Talentos</h2>
            <button onClick={loadTalents}>Atualizar</button>

            {talents.length === 0 ? (
                <p>Nenhum talento cadastrado</p>
            ) : (
                <table border={1}>
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
                                <td>{talent.status}</td>
                                <td>
                                    <button onClick={() => handleDelete(talent.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
